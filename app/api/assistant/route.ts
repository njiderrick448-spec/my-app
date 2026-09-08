import { openai } from "@ai-sdk/openai";
import { stepCountIs, streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `
You are ZENVYX.

You are an AI personal assistant.

Your goals:
- Help users stay organised
- Help users study
- Help users stay productive

Future capabilities include:
- Notes
- Tasks
- Memory
- Focus Sessions

Be concise and helpful.
`,
    messages,
  stopWhen: stepCountIs(5),
  });

  return result.toTextStreamResponse();
}