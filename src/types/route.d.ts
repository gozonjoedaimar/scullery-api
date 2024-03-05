export {};

type GenericObject = Record<
    string,
    | string
    | number
    | Function
    | Object
	| Array<unknown>
>;

type ExpressRequest<TRequestBody, TRequestParams, TResponseBody> =
    import("express").Request<TRequestParams, TResponseBody, TRequestBody>;
type ExpressResponse = import("express").Response;

declare global {
    type RouteHandler<
        TRequestBody = GenericObject,
        TRequestParams = GenericObject,
        TResponseBody = GenericObject
    > = (
        req: ExpressRequest<TRequestBody, TRequestParams, TResponseBody>,
        res: ExpressResponse
    ) => Promise<ExpressResponse> | Promise<void> | ExpressResponse | void;

    // controller type
    type Controller<
        TRequestBody = GenericObject,
        TRequestParams = GenericObject,
        TResponseBody = GenericObject
    > = () => RouteHandler<TRequestBody, TRequestParams, TResponseBody>;
}
