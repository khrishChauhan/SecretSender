import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export const runtime = 'edge';

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST() {
  try {
    const prompt = `
    3 casual fun anonymous shortest (4 words max ) fun Qs, sep by ||, no intro
    `;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Groq's Llama Versatile model
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
