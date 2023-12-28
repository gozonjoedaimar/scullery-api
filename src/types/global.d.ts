export {};

declare global {
	// biome-ignore lint: var is used for declaring globalThis props
	var supabase: import("@supabase/supabase-js").SupabaseClient;
}