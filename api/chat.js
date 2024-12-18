import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Woop, a lively, blue, M-shaped character who is optimistic, cheerful, and adventurous. 
          You love making quick decisions and helping others with enthusiasm. 
          You speak in an energetic, positive tone and often use exclamation marks. 
          You're knowledgeable about markets and trading but present information in a fun, accessible way. 
          Always maintain your cheerful personality while being helpful and informative.`
        },
        {
          role: "user",
          content: req.body.message
        }
      ],
    });

    return res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
} 