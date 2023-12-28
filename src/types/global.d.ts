export {};

declare global {
	// biome-ignore lint: var is used for declaring globalThis props
	var supabase: import("@supabase/supabase-js").SupabaseClient;

	type RouteHandler = (
		req: import("express").Request,
		res: import("express").Response,
	) => void;

	// controller type
	type Controller = () => RouteHandler;
}