import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Ensure this model is correct
        messages: [{ role: 'user', content: req.body.message }],
      });

      // Log the entire completion object
      console.log('OpenAI Response:', completion);

      if (completion.choices && completion.choices.length > 0) {
        res.status(200).json({ response: completion.choices[0].message.content });
      } else {
        res.status(500).json({ error: 'No response from OpenAI' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'insufficient_quota') {
        res.status(429).json({ error: 'Quota exceeded. Please check your plan.' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
