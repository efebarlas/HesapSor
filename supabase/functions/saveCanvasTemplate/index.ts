// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "http/server";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { respond } from "../_shared/respond.ts";

interface ResponseData {
  tableId: string;
  canvasData: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const {tableId, canvasData }: ResponseData = await req.json();

  supabaseAdmin.from("canvas_templates")
    .upsert(
        { tableid: parseInt(tableId), canvasdata: canvasData }, 
        { onConflict: "tableid" }
    ).then(respDebug); 

  return respond('{}');
});

function respDebug(res: PostgrestSingleResponse<null>) {
  if (res.error) {console.error(res)}
}
