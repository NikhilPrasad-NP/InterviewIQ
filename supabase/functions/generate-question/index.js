// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";
import OpenAI from "npm:openai";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
});

console.log("Hello from Functions!");

// This endpoint uses 'publishable' | 'secret' access, apiKey is required.
// Use publishable for Client-facing, key-validated endpoints
// Use secret for Server-to-server, internal calls
export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req, ctx) => {
    // Called by another service with a secret key
    // ctx.supabaseAdmin bypasses RLS — use for privileged operations
    /*
    if (ctx.authMode === "secret") {
      const { user_id } = await req.json();
      const { data } = await ctx.supabaseAdmin.auth.admin.getUserById(user_id);

      return Response.json({
        email: data?.user?.email,
      });
    }
    */

    const {
      interviewId,
      jobRole,
      interviewType,
      difficulty,
      duration,
      questionNumber,
    } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
    You are a professional interviewer conducting a realistic mock interview.

    The candidate is interviewing for the role of ${jobRole}.
    Interview type: ${interviewType}.
    Difficulty: ${difficulty}.
    Interview duration: ${duration} minutes.
    This is question number ${questionNumber}.

    Ask one realistic interview question appropriate for this role,
    interview type, and difficulty.

    Do not provide the answer.
    Do not explain the question.
    Return only the interview question.
  `,
      input: "Begin the interview.",
    });

    const question = response.output_text;

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
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-question' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"name":"Functions"}'

*/
