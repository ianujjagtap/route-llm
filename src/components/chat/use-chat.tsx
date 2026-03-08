"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChevronUp, Command, Plus, StopCircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/primitives/button";
import { Card, CardContent } from "@/primitives/card";
import { PROMPT_SUGGESTIONS } from "@/providers/data";
import { AutoHighlightMessage } from "../highighter";
import { HoverBorderGradient } from "../ui/border-gradient";

export default function Chat() {
  const [input, setInput] = React.useState("");
  const { messages, setMessages, sendMessage, stop, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const handlePromptClick = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  const showPromptCards = messages.length === 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-end">
      <div className="mb-24 flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={cn(
                `max-w-[100%] rounded-2xl px-4 py-3 ${message.role === "user" && "max-w-[60%]"} `
              )}
            >
              <div className="mb-1 flex font-semibold text-xs opacity-60">
                {message.role === "user" ? (
                  <Command className="h-4 w-4" />
                ) : (
                  <Image
                    src={"/logo-white.png"}
                    alt="AI"
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                )}
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

        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="max-w-[100%] rounded-2xl px-4 py-3">
              <div className="mb-1 flex font-semibold text-xs opacity-60">
                <Image
                  src={"/logo-white.png"}
                  alt="AI"
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
              </div>
              <div className="flex h-6 items-center gap-1.5 opacity-80">
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Prompt suggestion cards - only show when no messages */}
        {showPromptCards && (
          <div className="space-y-4">
            <div className="mb-6 text-center">
              <h2 className="mb-2 font-bold text-xl">
                How can I help you today?
              </h2>
            </div>
            <div className="hidden grid-cols-1 gap-3 sm:grid-cols-2 lg:grid">
              {PROMPT_SUGGESTIONS.map((suggestion) => {
                const IconComponent = suggestion.icon;
                return (
                  <Card
                    key={suggestion.id}
                    className="cursor-pointer border-border/50 bg-transparent transition-all duration-200 hover:scale-[1.02] hover:border-border hover:shadow-md"
                    onClick={() => handlePromptClick(suggestion.prompt)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 font-medium text-sm">
                            {suggestion.title}
                          </h3>
                          <p className="line-clamp-2 text-xs opacity-70">
                            {suggestion.prompt}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="-translate-x-1/2 fixed bottom-0 left-1/2 w-full max-w-3xl px-4 py-2"
      >
        <div className="flex w-full justify-center gap-2">
          {messages.length > 0 && (
            <Button
              type="button"
              variant={"outline"}
              size={"icon"}
              className="mt-1 h-10 w-10 shrink-0 cursor-pointer rounded-full border-border/50 bg-transparent transition-all duration-200 hover:border-border hover:bg-primary/10 hover:shadow-md"
              onClick={() => {
                setMessages([]);
                stop();
              }}
              title="New Chat"
            >
              <Plus className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">New Chat</span>
            </Button>
          )}
          <HoverBorderGradient
            className="relative flex flex-1 items-center"
            as={"div"}
          >
            <input
              type="text"
              className="w-[80vw] flex-1 rounded-md bg-transparent p-2 shadow-xl outline-none backdrop-blur-lg sm:w-[30rem]"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.target.value)}
            />
            {status === "streaming" ? (
              <Button
                variant={"default"}
                onClick={stop}
                className="ml-2 h-8 w-8 cursor-pointer"
              >
                <StopCircleIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant={"default"}
                className="ml-2 h-8 w-8 cursor-pointer"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
          </HoverBorderGradient>
        </div>
      </form>
    </div>
  );
}
