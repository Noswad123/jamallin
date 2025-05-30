'use server';

/**
 * @fileOverview Generates a dynamic welcome message tailored to the selected persona.
 *
 * - generateWelcomeMessage - A function that generates the welcome message.
 * - GenerateWelcomeMessageInput - The input type for the generateWelcomeMessage function.
 * - GenerateWelcomeMessageOutput - The return type for the generateWelcomeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWelcomeMessageInputSchema = z.object({
  persona: z
    .enum(['Jamal', 'Jamallin', 'Uncle J'])
    .describe('The persona for whom the welcome message should be generated.'),
});
export type GenerateWelcomeMessageInput = z.infer<
  typeof GenerateWelcomeMessageInputSchema
>;

const GenerateWelcomeMessageOutputSchema = z.object({
  message: z.string().describe('The generated welcome message.'),
});
export type GenerateWelcomeMessageOutput = z.infer<
  typeof GenerateWelcomeMessageOutputSchema
>;

export async function generateWelcomeMessage(
  input: GenerateWelcomeMessageInput
): Promise<GenerateWelcomeMessageOutput> {
  return generateWelcomeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWelcomeMessagePrompt',
  input: {schema: GenerateWelcomeMessageInputSchema},
  output: {schema: GenerateWelcomeMessageOutputSchema},
  prompt: `You are a creative copywriter tasked with generating a welcome message for a website.

The message should be tailored to the selected persona:

- If the persona is Jamal, the message should be formal and professional.
- If the persona is Jamallin, the message should be fun and energetic.
- If the persona is Uncle J, the message should be kid-friendly and avuncular.

Persona: {{{persona}}}

Generate the welcome message:`,
});

const generateWelcomeMessageFlow = ai.defineFlow(
  {
    name: 'generateWelcomeMessageFlow',
    inputSchema: GenerateWelcomeMessageInputSchema,
    outputSchema: GenerateWelcomeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
