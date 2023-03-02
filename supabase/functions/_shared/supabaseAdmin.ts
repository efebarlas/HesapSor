import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/supabase.ts';

console.log("Hello from Functions!")


const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ACCOUNT_KEY') ?? '';

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseKey);
