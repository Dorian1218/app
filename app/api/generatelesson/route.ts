"use server"

import { google } from '@ai-sdk/google';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, streamText } from 'ai';

export async function POST(req: Request) {
    try {
        const { transactions } = await req.json();
        const streamingResponse = streamText({
            model: google('gemini-1.5-pro-latest'),
            messages: [
                {
                    role: "system",
                    content: `You are an education ai who's main goal is to come up with lesson plans for any given topic`
                },
            ],
            system: "Your job is to analyze the financial summary provided by the user and provide helpful, actionable tips for improving their financial habits."
        });
        return streamingResponse.toDataStreamResponse()
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}