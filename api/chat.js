export const config = {
  runtime: 'edge'
};

import OpenAI from 'openai';
import { CAT_PERSONA } from './chatService.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: CAT_PERSONA
        },
        { 
          role: "user", 
          content: message 
        }
      ],
      temperature: 0.8,
      max_tokens: 150
    });

    return new Response(JSON.stringify({ message: completion.choices[0].message.content }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: "Oops! Something went wrong!" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}