'use server';

/**
 * @fileOverview Implements a fallback small-talk mode for the chatbot.
 *
 * - smallTalk - A function that handles casual, non-serious questions.
 * - SmallTalkInput - The input type for the smallTalk function.
 * - SmallTalkOutput - The return type for the smallTalk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmallTalkInputSchema = z.object({
  query: z.string().describe('The user query for casual conversation.'),
});
export type SmallTalkInput = z.infer<typeof SmallTalkInputSchema>;

const SmallTalkOutputSchema = z.object({
  response: z.string().describe('The chatbot response in small-talk mode.'),
});
export type SmallTalkOutput = z.infer<typeof SmallTalkOutputSchema>;

export async function smallTalk(input: SmallTalkInput): Promise<SmallTalkOutput> {
  return smallTalkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smallTalkPrompt',
  input: {schema: SmallTalkInputSchema},
  output: {schema: SmallTalkOutputSchema},
  prompt: `You are a friendly chatbot engaging in a casual conversation.

  User Query: {{{query}}}

  Respond with a lighthearted and conversational answer. If the question is serious or outside the scope of casual conversation, indicate that you are switching back to assistant mode.`,
});

const smallTalkFlow = ai.defineFlow(
  {
    name: 'smallTalkFlow',
    inputSchema: SmallTalkInputSchema,
    outputSchema: SmallTalkOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
