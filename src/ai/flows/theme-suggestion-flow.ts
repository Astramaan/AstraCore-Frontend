
'use server';
/**
 * @fileOverview An AI agent for suggesting theme colors.
 *
 * - getThemeSuggestions - A function that suggests theme colors based on a logo and a color preference.
 * - ThemeSuggestionInput - The input type for the theme suggestion function.
 * - ThemeSuggestionOutput - The return type for the theme suggestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ThemeSuggestionInputSchema = z.object({
  logoDataUri: z
    .string()
    .describe(
      "A logo image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  colorPreference: z.string().describe('The user\'s preferred primary color in hex format (e.g., #3391FF).'),
});
export type ThemeSuggestionInput = z.infer<typeof ThemeSuggestionInputSchema>;

const ColorSuggestionSchema = z.object({
    color: z.string().describe('The suggested hex color code (e.g., #RRGGBB).'),
    name: z.string().describe('A descriptive name for the color (e.g., "Vibrant Teal").'),
    tip: z.string().describe('A brief tip on how to best use this color, considering accessibility and light/dark modes.'),
});
export type ColorSuggestion = z.infer<typeof ColorSuggestionSchema>;

const ThemeSuggestionOutputSchema = z.object({
  suggestions: z.array(ColorSuggestionSchema).length(5).describe('An array of 5 color suggestions.'),
});
export type ThemeSuggestionOutput = z.infer<typeof ThemeSuggestionOutputSchema>;

export async function getThemeSuggestions(input: ThemeSuggestionInput): Promise<ThemeSuggestionOutput> {
  return themeSuggestionFlow(input);
}

const themeSuggestionFlow = ai.defineFlow(
  {
    name: 'themeSuggestionFlow',
    inputSchema: ThemeSuggestionInputSchema,
    outputSchema: ThemeSuggestionOutputSchema,
  },
  async (input) => {
    const prompt = `You are a professional UI/UX designer and color theorist. Your task is to suggest a theme palette of 5 colors for a web application based on the user's company logo and their preferred primary color.

Analyze the provided logo image and the user's color preference. Based on this, generate 5 color suggestions that would work well for a web application theme.

For each color, provide:
1.  A valid 6-digit hex color code.
2.  A short, descriptive name for the color.
3.  A concise tip explaining why it's a good choice, considering factors like:
    -   Harmony with the logo.
    -   Contrast and accessibility for both light and dark modes.
    -   Psychological impact of the color.

User's preferred primary color: {{{colorPreference}}}
Company Logo: {{media url=logoDataUri}}

Return the response in the specified JSON format.`;

    const llmResponse = await ai.generate({
      prompt: prompt,
      output: { schema: ThemeSuggestionOutputSchema },
    });

    return llmResponse.output!;
  }
);
