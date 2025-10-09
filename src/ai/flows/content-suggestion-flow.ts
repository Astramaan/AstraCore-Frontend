
'use server';
/**
 * @fileOverview An AI agent for suggesting marketing content.
 *
 * - getContentSuggestions - A function that suggests marketing content based on a company description.
 * - ContentSuggestionInput - The input type for the content suggestion function.
 * - ContentSuggestionOutput - The return type for the content suggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ContentSuggestionInputSchema = z.object({
  companyDescription: z.string().describe('A brief description of the company and its services.'),
});
export type ContentSuggestionInput = z.infer<typeof ContentSuggestionInputSchema>;

const FaqSchema = z.object({
    question: z.string().describe('The frequently asked question.'),
    answer: z.string().describe('The answer to the question.'),
});

const ContentSuggestionOutputSchema = z.object({
  bulletPoints: z.array(z.string()).length(8).describe('An array of 8 short (1-2 word) marketing bullet points highlighting company strengths.'),
  faqs: z.array(FaqSchema).length(3).describe('An array of 3 frequently asked questions with answers.'),
});
export type ContentSuggestionOutput = z.infer<typeof ContentSuggestionOutputSchema>;


export async function getContentSuggestions(input: ContentSuggestionInput): Promise<ContentSuggestionOutput> {
  return contentSuggestionFlow(input);
}


const contentSuggestionFlow = ai.defineFlow(
  {
    name: 'contentSuggestionFlow',
    inputSchema: ContentSuggestionInputSchema,
    outputSchema: ContentSuggestionOutputSchema,
  },
  async (input) => {
    const prompt = `You are a professional marketing copywriter. Your task is to generate marketing content for a web application based on a brief company description.

Generate 8 marketing bullet points. Each bullet point must be very concise, ideally 1 or 2 words, highlighting a key feature or strength.
Generate 3 relevant frequently asked questions (FAQs) with clear and helpful answers.

Company Description:
{{{companyDescription}}}

Return the response in the specified JSON format.`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      output: { schema: ContentSuggestionOutputSchema },
    });

    return llmResponse.output!;
  }
);
