import { serve } from "http/server";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { respond } from "../_shared/respond.ts";
import { Json } from "../_shared/types/supabase.ts";

interface ResponseData {
  templatedCanvas: string;
}

interface RequestData {
  tableId: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const { tableId }: RequestData = await req.json();

  const resp = await supabaseAdmin.from("canvas_templates")
    .select("canvasdata")
    .eq("tableid", tableId);

  const data = resp.data ?? [];
  let canvasData = data[0].canvasdata ?? {};

  if (!canvasData.includes("{{")) {
    return respond(JSON.stringify(canvasData));
  }
  // parse canvasData for template strings
  // replace templates in canvasData with data from tableId
  // parse format of template
  // only sum supported so far
  // template format: {{sum:row1:col1:row2:col2}}

  
  // fetch table if there is a template
  const tableResp = await supabaseAdmin.from("table_documents")
    .select("table_content")
    .eq("id", tableId);

  const tableData = tableResp.data ?? [];
  const tableContent = (tableData[0].table_content as Json[]) ?? null;

  if (tableContent == null) {
    return respond("Table not found");
  }

  // get template ranges
  const templateRanges = canvasData.match(/{{sum:(.+)::([0-9]+):([0-9]+)}}/g);
  if (templateRanges) {
    console.log('matched template ranges: ', templateRanges);
    templateRanges.forEach((range) => {
      const templateRange = range.match(/{{sum:(.+)::([0-9]+):([0-9]+)}}/);
      if (templateRange) {
        console.log('matched template range: ', templateRange);
        const colName = templateRange[1] as string;
        const row1 = parseInt(templateRange[2]);
        const row2 = parseInt(templateRange[3]);

        // get cell values in range
        const cellValues = [];
        for (let i = row1 - 1; i <= row2 - 1; i++) { // row numbers are 1-indexed
          const cellValue = (tableContent[i] as { [key: string]: string; })[colName];
          cellValues.push(parseInt(cellValue));
        }
        console.log(cellValues);
        // sum cell values
        const sum = cellValues.reduce((a, b) => a + b, 0);
        // replace template with sum
        canvasData = canvasData.replace(range, sum.toString());
      }
    });
  }
  return respond(JSON.stringify({'templatedCanvas':canvasData}));
});

function respDebug(res: PostgrestSingleResponse<null>) {
  if (res.error) {console.error(res)}
}
