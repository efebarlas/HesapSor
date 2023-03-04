import { corsHeaders } from "../_shared/cors.ts";

export function respond(responseBody: BodyInit): Response {
    try {
        return new Response(responseBody, {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
}