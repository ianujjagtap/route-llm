"use client";

import { useChat } from "@ai-sdk/react";
import { AutoHighlightMessage } from "../highighter";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center py-24">
      <div className="mb-24 flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.role === "user"
              } `}
            >
              <div className="mb-1 font-semibold text-xs opacity-60">
                {message.role === "user" ? "You" : "AI"}
              </div>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div key={`${message.id}-${i}`}>
                        <AutoHighlightMessage content={part.text} />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="-translate-x-1/2 fixed bottom-0 left-1/2 w-full max-w-xl px-4 py-2"
      >
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border p-3 shadow-xl backdrop-blur-lg"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}
