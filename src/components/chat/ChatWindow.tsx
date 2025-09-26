"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { handleMessage } from "@/lib/actions";
import type { Message } from "@/lib/types";
import { Bot, CalendarPlus } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { v4 as uuidv4 } from 'uuid';
import ChatInput from "./ChatInput";
import { ChatMessage, ChatMessageSkeleton } from "./ChatMessage";
import { ReminderDialog } from "./ReminderDialog";
import SmartSuggestions from "./SmartSuggestions";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    const newMessages: Message[] = [
      ...messages,
      { id: uuidv4(), role: "user", text: userMessage },
    ];
    setMessages(newMessages);
    setInput("");
    setSuggestions([]);

    startTransition(async () => {
      const { assistantResponse, suggestions } = await handleMessage(
        newMessages,
        userMessage
      );

      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), role: "assistant", text: assistantResponse },
      ]);
      setSuggestions(suggestions);
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Card className="flex h-[85vh] flex-col overflow-hidden shadow-2xl shadow-black/10">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-card">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-accent" />
          <CardTitle className="font-headline text-xl font-bold">
            Assistant AI
          </CardTitle>
        </div>
        <ReminderDialog>
          <Button variant="ghost" size="icon">
            <CalendarPlus className="h-5 w-5 text-accent" />
            <span className="sr-only">Set a new reminder</span>
          </Button>
        </ReminderDialog>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 p-4 md:p-6">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <Bot size={48} className="mb-4" />
                  <p className="text-lg font-medium">Welcome to Assistant AI</p>
                  <p className="text-sm">How can I help you today?</p>
              </div>
            )}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isPending && <ChatMessageSkeleton />}
          </div>
        </ScrollArea>
      </CardContent>
      
      <Separator />

      <CardFooter className="flex flex-col items-start gap-4 p-4">
        {suggestions.length > 0 && !isPending && (
          <SmartSuggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            isLoading={isPending}
          />
        )}
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isPending}
        />
      </CardFooter>
    </Card>
  );
}
