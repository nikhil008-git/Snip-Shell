// import type { Request, Response } from "express";
// import { streamText, tool, stepCountIs } from 'ai';
// import { z } from 'zod';
// import 'dotenv/config';

// export const googleapi = async (req: Request, res: Response) => {
//   const { messages } = req.body;

//   if (!messages || !Array.isArray(messages)) {
//     return res.status(400).json({ error: "Messages must be an array" });
//   }

//   try {
//     const result = streamText({
//       model: 'gemini-pro', // or the specific Gemini model
//       messages,
//       tools: {
//         weather: tool({
//           description: 'Get the weather for a location',
//           inputSchema: z.object({ location: z.string().describe("Location name") }),
//           execute: async ({ location }) => {
//             // Replace with real API call if needed
//             const tempF = Math.round(Math.random() * (100 - 32) + 32);
//             return { location, temperatureF: tempF };
//           },
//         }),
//         convertFahrenheitToCelsius: tool({
//           description: 'Convert Fahrenheit to Celsius',
//           inputSchema: z.object({ temperature: z.number().describe("Temp in Fahrenheit") }),
//           execute: async ({ temperature }) => {
//             const celsius = Math.round((temperature - 32) * 5 / 9);
//             return { celsius };
//           },
//         }),
//       },
//       stopWhen: stepCountIs(5),
//     });

//     let fullResponse = '';
//     for await (const delta of result.textStream) {
//       fullResponse += delta;
//     }

//     res.json({ response: fullResponse });
//   } catch (err: any) {
//     console.error("AI SDK error:", err);
//     res.status(500).json({ error: "AI request failed", details: err.message });
//   }
// };
