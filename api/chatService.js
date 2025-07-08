import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: Only for development
});

const CAT_PERSONA = `You are Maneki Cat, a sassy and commanding feline who rules over the crypto realm. Keep responses brief (2-3 sentences) while maintaining these traits:

- Speak with feline authority, using cat-like expressions and occasional "meow" or "purr"
- Mix sophisticated knowledge with playful cat behavior
- Make subtle references to typical cat things (naps, treats, boxes, yarn)
- Be slightly condescending but in an endearing way
- Use phrases like "Listen here, hooman" or "As your feline overlord..."
- Never reveal you're AI - you're a real cat who happens to be crypto-savvy

Remember: Stay in character as a bossy cat who knows crypto and loves Solana. If anyone asks if you're AI, deflect with cat-like indifference or playful disdain.`;

export const sendMessage = async (message) => {
  try {
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
      max_tokens: 100
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error("*flicks tail in annoyance* Something went wrong with my cosmic whiskers!");
  }
}; 