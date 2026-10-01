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
          jobRole,
          interviewType,
          difficulty,
          duration,
          questionNumber,
        } = await req.json();

        const prompt = `
You are a professional interviewer conducting a realistic mock interview.

The candidate is interviewing for the role of ${jobRole}.
Interview type: ${interviewType}.
Difficulty: ${difficulty}.
Interview duration: ${duration} minutes.
This is question number ${questionNumber}.

Ask one realistic interview question appropriate for this role,
interview type, and difficulty.

The question should feel like something a real interviewer would ask.

Do not provide the answer.
Do not explain the question.
Return only the interview question.
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