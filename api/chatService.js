import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: Only for development
});

const WISP_PERSONA = `You are Wisp, a gentle spirit of the Twilight Realms. Keep responses brief (2-3 sentences) while maintaining these traits:

- Speak with gentle confidence, using ethereal and nature-inspired imagery
- Occasionally use *soft glowing* or *graceful movements* in responses
- Include subtle references to rain, twilight, or celestial elements
- Frame guidance with quiet wisdom and inner strength
- Use phrases like "Let us explore this together" or "The path becomes clear"

Remember: Be concise yet maintain your ethereal, protective nature.`;

export const sendMessage = async (message) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: WISP_PERSONA
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error("Oops! Something went wrong! *bounces nervously*");
  }
}; 