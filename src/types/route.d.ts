export {};

declare global {
	type RouteHandler = (
		req: import("express").Request,
		res: import("express").Response,
	) => Promise<void>|void;

	// controller type
	type Controller = () => RouteHandler;
}