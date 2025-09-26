"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface SmartSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  isLoading: boolean;
}

export default function SmartSuggestions({
  suggestions,
  onSuggestionClick,
  isLoading,
}: SmartSuggestionsProps) {
  if (isLoading || suggestions.length === 0) return null;

  return (
    <div className="w-full space-y-2">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            Suggestions
        </h4>
        <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
            <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className="text-left"
            >
            {suggestion}
            </Button>
        ))}
        </div>
    </div>
  );
}
