"use server";

import { smallTalk } from "@/ai/flows/fallback-small-talk-mode";
import { getImprovedQuerySuggestions } from "@/ai/flows/improve-user-query-suggestions";
import type { Message } from "@/lib/types";

export async function handleMessage(
  history: Message[],
  userMessage: string
): Promise<{
  assistantResponse: string;
  suggestions: string[];
}> {
  try {
    const formattedHistory = history
      .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n');

    const prompt = `You are a helpful personal assistant named Assistant AI. Your tone is professional yet friendly. Here is the conversation history so far:

${formattedHistory}

New User Message: ${userMessage}

Please provide a helpful and conversational response.`;

    const [assistantResult, suggestionsResult] = await Promise.allSettled([
      smallTalk({ query: prompt }),
      getImprovedQuerySuggestions({ originalQuery: userMessage }),
    ]);

    if (assistantResult.status === "rejected") {
      console.error("Small talk flow failed:", assistantResult.reason);
      throw new Error("Failed to get a response from the assistant.");
    }
    
    const assistantResponse = assistantResult.value.response;
    
    const suggestions =
      suggestionsResult.status === "fulfilled"
        ? suggestionsResult.value.suggestedQueries
        : [];

    return { assistantResponse, suggestions };
  } catch (error) {
    console.error("Error in handleMessage action:", error);
    return {
      assistantResponse: "Sorry, I encountered an error. Please try again.",
      suggestions: [],
    };
  }
}
