create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'pending' check (status in ('pending', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.habits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  streak integer not null default 0,
  color text default '#1664d8',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.focus_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  minutes integer not null default 25,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  target text,
  progress integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.calendar_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz,
  all_day boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.habits enable row level security;
alter table public.focus_sessions enable row level security;
alter table public.goals enable row level security;
alter table public.calendar_events enable row level security;

create policy "profiles_are_private_to_owner"
on public.profiles
for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "tasks_are_private_to_owner"
on public.tasks
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "habits_are_private_to_owner"
on public.habits
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "focus_sessions_are_private_to_owner"
on public.focus_sessions
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "goals_are_private_to_owner"
on public.goals
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "calendar_events_are_private_to_owner"
on public.calendar_events
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row execute procedure public.update_updated_at_column();

create trigger tasks_updated_at
before update on public.tasks
for each row execute procedure public.update_updated_at_column();

create trigger habits_updated_at
before update on public.habits
for each row execute procedure public.update_updated_at_column();

create trigger goals_updated_at
before update on public.goals
for each row execute procedure public.update_updated_at_column();

create trigger calendar_events_updated_at
before update on public.calendar_events
for each row execute procedure public.update_updated_at_column();
