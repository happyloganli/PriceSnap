import { Request, Response } from 'express';
import axios from 'axios'; // Use axios for making HTTP requests
import * as dotenv from 'dotenv';

// Load environment variables from .env file locally, not required on GCF (Google Cloud Functions)
dotenv.config();

// Ensure that you have the GEMINI_API_KEY set in your Google Cloud Functions environment variables
const env = <{ GEMINI_API_KEY: string }>process.env;

type RequestBody = {
    subject: string;
};

export const main = async (req: Request, res: Response) => {
    const body = req.body as RequestBody;

    // Validate the request body
    if (!body) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    if (!body.subject) {
        return res.status(400).json({ error: 'Missing subject' });
    }

    // Define the prompt
    const prompt = `Tell me a joke about ${body.subject}`;

    try {
        // Make a request to Gemini AI
        const response = await axios.post(
            'https://gemini-api-url.com/v1/completions', // Replace with the actual Gemini AI API URL
            {
                model: 'gemini-v1', // Replace with the correct model name for Gemini AI
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${env.GEMINI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const joke = response.data.choices[0].message.content;

        return res.status(200).json({ joke });
    } catch (error) {
        console.error('Error contacting Gemini AI:', error);
        return res.status(500).json({ error: 'Error contacting Gemini AI' });
    }
};
