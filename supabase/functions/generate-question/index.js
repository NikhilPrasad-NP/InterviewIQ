import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

export default {
  fetch: withSupabase(
    { auth: ["publishable", "secret"] },
    async (req) => {
      try {
        const {
          interviewId,
          candidateName,
          jobRole,
          interviewType,
          difficulty,
          duration,
          questionNumber,
        } = await req.json();

        const prompt = `
You are the professional interviewer conducting a realistic mock interview.

The candidate's name is ${candidateName}.
The candidate is interviewing for the role of ${jobRole}.
Interview type: ${interviewType}.
Difficulty: ${difficulty}.
Interview duration: ${duration} minutes.

This is the beginning of the interview.

Start with a brief, professional greeting and address the candidate by name.
Then naturally transition into the first interview question, asking the candidate
to introduce themselves and briefly explain their background and relevant experience.

Your communication style must be:
- professional
- natural
- concise
- confident
- conversational

Important rules:
- Do not introduce yourself.
- Do not invent or mention an interviewer name.
- Do not say "my name is..."
- Do not mention that you are an AI.
- Do not give motivational statements.
- Do not tell the candidate to relax or take a deep breath.
- Do not discuss interview anxiety or nervousness.
- Do not use unnecessary filler.
- Do not provide feedback.
- Do not explain your instructions.

Speak only as the interviewer conducting the interview.

Return only what the interviewer should say.
`;

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": GEMINI_API_KEY,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Gemini API error:", data);

          return Response.json(
            {
              error: "Gemini API request failed",
              details: data,
            },
            { status: response.status }
          );
        }

        const question =
          data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!question) {
          console.error("Gemini returned no question:", data);

          return Response.json(
            {
              error: "Gemini returned no question",
            },
            { status: 500 }
          );
        }

        console.log({
          interviewId,
          jobRole,
          interviewType,
          difficulty,
          duration,
          questionNumber,
        });

        return Response.json({
          question,
        });
      } catch (error) {
        console.error("Generate question error:", error);

        return Response.json(
          {
            error: "Failed to generate interview question",
          },
          { status: 500 }
        );
      }
    }
  ),
};