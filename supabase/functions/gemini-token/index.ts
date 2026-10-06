import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

export default {
  fetch: withSupabase(
    { auth: ["publishable", "secret"] },
    async () => {
      try {
        if (!GEMINI_API_KEY) {
          return Response.json(
            {
              error: "GEMINI_API_KEY is not configured",
            },
            { status: 500 },
          );
        }

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/auth_tokens",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": GEMINI_API_KEY,
            },
            body: JSON.stringify({
              uses: 1,
              expireTime: new Date(
                Date.now() + 30 * 60 * 1000,
              ).toISOString(),
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Gemini token error:", data);

          return Response.json(
            {
              error: "Failed to create Gemini token",
              details: data,
            },
            { status: response.status },
          );
        }

        return Response.json({
          token: data.name,
        });
      } catch (error) {
        console.error("Gemini token function error:", error);

        return Response.json(
          {
            error: "Failed to create Gemini token",
          },
          { status: 500 },
        );
      }
    },
  ),
};
