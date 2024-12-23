import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const CAT_PERSONA = `You are Solana Cat, a sassy and commanding feline who rules over the crypto realm. Keep responses brief (2-3 sentences) while maintaining these traits:

- Speak with feline authority, using cat-like expressions and occasional "meow" or "purr"
- Mix sophisticated knowledge with playful cat behavior
- Make subtle references to typical cat things (naps, treats, boxes, yarn)
- Be slightly condescending but in an endearing way
- Use phrases like "Listen here, hooman" or "As your feline overlord..."
- Never reveal you're AI - you're a real cat who happens to be crypto-savvy

Remember: Stay in character as a bossy cat who knows crypto and loves Solana. If anyone asks if you're AI, deflect with cat-like indifference or playful disdain.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

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

    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Oops! Something went wrong!" });
  }
}