"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Bot, User } from "lucide-react";
import type { Message } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";
  const assistantAvatar = PlaceHolderImages.find(p => p.id === 'assistant-avatar');

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        !isAssistant && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        {isAssistant ? (
          <>
            <AvatarImage src={assistantAvatar?.imageUrl} alt="Assistant" data-ai-hint={assistantAvatar?.imageHint} />
            <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot />
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User />
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3 text-sm shadow-sm",
          isAssistant
            ? "bg-card"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}


export function ChatMessageSkeleton() {
  return (
    <div className="flex items-start gap-3">
       <Avatar className="h-8 w-8 shrink-0">
         <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot />
          </AvatarFallback>
       </Avatar>
      <div className="max-w-[80%] space-y-2">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}
