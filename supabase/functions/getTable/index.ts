// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "http/server";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { respond } from "../_shared/respond.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const {tableId} = await req.json();
  const resp = await supabaseAdmin
    .from("table_documents")
    .select("table_content")
    .eq("id", tableId);

  const data = resp.data ?? [];
  const tableData = {"table_content": data[0].table_content} ?? {};
  // todo: handle error
  
  return respond(JSON.stringify(tableData));
});