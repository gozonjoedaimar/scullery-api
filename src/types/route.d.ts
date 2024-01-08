export {};

type ExpressRequest = import('express').Request;
type ExpressResponse = import('express').Response;

declare global {
	type RouteHandler = (
		req: ExpressRequest,
		res: ExpressResponse,
	) => Promise<ExpressResponse>|Promise<void>|ExpressResponse|void;

	// controller type
	type Controller = () => RouteHandler;
}