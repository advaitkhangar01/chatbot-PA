'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting improved user queries.
 *
 * It takes an initial query as input and returns a list of suggested alternative queries.
 * @param {OriginalQueryInput} input - The input object containing the original query.
 * @returns {Promise<ImprovedQueryOutput>} - A promise that resolves to an object containing an array of suggested queries.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OriginalQueryInputSchema = z.object({
  originalQuery: z.string().describe('The original user query.'),
});

export type OriginalQueryInput = z.infer<typeof OriginalQueryInputSchema>;

const ImprovedQueryOutputSchema = z.object({
  suggestedQueries: z
    .array(z.string())
    .describe('An array of suggested alternative queries.'),
});

export type ImprovedQueryOutput = z.infer<typeof ImprovedQueryOutputSchema>;

export async function getImprovedQuerySuggestions(
  input: OriginalQueryInput
): Promise<ImprovedQueryOutput> {
  return improveUserQuerySuggestionsFlow(input);
}

const improveUserQuerySuggestionsPrompt = ai.definePrompt({
  name: 'improveUserQuerySuggestionsPrompt',
  input: {schema: OriginalQueryInputSchema},
  output: {schema: ImprovedQueryOutputSchema},
  prompt: `You are an AI assistant that helps users refine their search queries.

  Given the user's original query, suggest three alternative queries that are more specific, better phrased, or explore related aspects of the topic.

  Original query: {{{originalQuery}}}

  Suggested queries:`,
});

const improveUserQuerySuggestionsFlow = ai.defineFlow(
  {
    name: 'improveUserQuerySuggestionsFlow',
    inputSchema: OriginalQueryInputSchema,
    outputSchema: ImprovedQueryOutputSchema,
  },
  async input => {
    const {output} = await improveUserQuerySuggestionsPrompt(input);
    return output!;
  }
);
