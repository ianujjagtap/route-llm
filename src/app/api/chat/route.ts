import { google } from "@ai-sdk/google";
import { smoothStream, streamText } from "ai";

// streaming responses upto 30 seeconds
export const maxDuration = 30;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.5-flash"),
    prompt: messages.map((m: Message) => m.content).join("\n"),
    experimental_transform: smoothStream({ delayInMs: 100 }),
  });
  return result.toUIMessageStreamResponse();
}
