"use client";
import { useChat } from "@ai-sdk/react";
import {
  BookOpen,
  Code,
  Lightbulb,
  Sparkles,
  StopCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/primitives/button";
import { Card, CardContent } from "@/primitives/card";
import { AutoHighlightMessage } from "../highighter";
import { HoverBorderGradient } from "../ui/border-gradient";

const PROMPT_SUGGESTIONS = [
  {
    id: 1,
    title: "Creative Writing",
    prompt:
      "Help me write a creative short story about a time traveler who gets stuck in the past",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Code Review",
    prompt:
      "Can you review this React component and suggest improvements for performance and readability?",
    icon: Code,
  },
  {
    id: 3,
    title: "Explain Concept",
    prompt:
      "Explain quantum computing in simple terms that a beginner can understand",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Problem Solving",
    prompt:
      "I need help brainstorming solutions for reducing plastic waste in my community",
    icon: Lightbulb,
  },
];

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    status,
    setInput,
  } = useChat();

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(syntheticEvent);
  };

  const showPromptCards = messages.length === 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-end">
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
              <div className="mb-1 font-semibold text-xs opacity-60">
                {message.role === "user" ? (
                  "You"
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

        {/* Prompt suggestion cards - only show when no messages */}
        {showPromptCards && (
          <div className="space-y-4 ">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">
                How can I help you today?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 hidden lg:grid">
              {PROMPT_SUGGESTIONS.map((suggestion) => {
                const IconComponent = suggestion.icon;
                return (
                  <Card
                    key={suggestion.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-border/50 hover:border-border bg-transparent"
                    onClick={() => handlePromptClick(suggestion.prompt)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1">
                            {suggestion.title}
                          </h3>
                          <p className="text-xs opacity-70 line-clamp-2">
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
        className="-translate-x-1/2 fixed bottom-0 left-1/2 w-full max-w-xl px-4 py-2"
      >
        <div className="flex w-full gap-2 justify-center">
          <HoverBorderGradient
            className="relative flex flex-1 items-center"
            as={"div"}
          >
            <input
              type="text"
              className="w-[80vw] sm:w-[30rem] flex-1 rounded-md p-2 shadow-xl outline-none backdrop-blur-lg bg-transparent"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            {status === "streaming" && (
              <Button
                variant={"default"}
                onClick={stop}
                className="w-8 h-8 ml-2 cursor-pointer"
              >
                <StopCircleIcon className="h-4 w-4" />
              </Button>
            )}
          </HoverBorderGradient>
        </div>
      </form>
    </div>
  );
}
