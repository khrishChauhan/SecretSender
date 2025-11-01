import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

// Initialize OpenRouter-compatible OpenAI client
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000', // your app URL
    'X-Title': 'MysteryMessage', // your site name
  },
});

export async function POST() {
  try {
    const prompt = `
    3 casual fun anonymous shortest (4 words max ) fun Qs, sep by ||, no intro
    `;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001', // ✅ free OpenRouter model
      messages: [
        {
          role: 'system',
          content: 'You are a friendly AI that creates fun, open-ended questions.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? '';

    // 🧠 👇 Console log the raw AI output
    console.log('AI Generated Text:', text);

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('Error generating AI suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
