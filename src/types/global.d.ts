import { SupabaseClient } from "@supabase/supabase-js";

export {};

/* declare global variables */
declare global {
  var supabase: SupabaseClient;
}