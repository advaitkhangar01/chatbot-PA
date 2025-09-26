"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import type { FormEvent } from "react";
import React from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        handleSubmit(e as unknown as FormEvent);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center gap-2"
    >
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask your assistant anything..."
        className="min-h-12 max-h-36 flex-1 resize-none pr-12 text-base"
        disabled={isLoading}
        aria-label="Chat input"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:bg-accent/10 hover:text-accent"
        disabled={isLoading || !input.trim()}
        aria-label="Send message"
      >
        <SendHorizonal />
      </Button>
    </form>
  );
}
