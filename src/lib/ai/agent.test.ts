import test from 'node:test';
import assert from 'node:assert/strict';

import { buildAgentSystemPrompt } from './agent';

test('buildAgentSystemPrompt includes safe agent directives', () => {
  const prompt = buildAgentSystemPrompt({
    profile: { full_name: 'Alex', email: 'alex@example.com' },
    taskSummary: '- Write launch brief',
    goalSummary: '- Grow revenue',
    focusSummary: '- 25 min focus',
    calendarSummary: '- Team sync',
  });

  assert.match(prompt, /You are ZENVYX/i);
  assert.match(prompt, /safe/i);
  assert.match(prompt, /phone/i);
  assert.match(prompt, /approval/i);
  assert.match(prompt, /launch brief/i);
});
