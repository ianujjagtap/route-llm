import { google } from "@ai-sdk/google";
import { convertToCoreMessages, smoothStream, streamText } from "ai";

// streaming responses upto 30 seeconds
export const maxDuration = 30;


export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToCoreMessages(messages),
    experimental_transform: smoothStream({ delayInMs: 100 }),
  });
  return result.toUIMessageStreamResponse();
}
