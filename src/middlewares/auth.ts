import { type Request, type Response, type NextFunction } from 'express';

type FunctionMiddleware = () => (req: Request, res: Response, next: NextFunction) => Promise<Response|undefined>;

export const app_auth: FunctionMiddleware = () =>
    async (req, res, next) => {
        // skip auth routes
        if (req.path.includes("/auth/")) {
            next();
            return;
        }
        // get session user
        const {
            data: {
                user
            },
        } = await supabase.auth.getUser();

        // require auth
        if ( !user && req.path.includes("/api/")) {
            return res.json({
                api: {
                    name: "sculleryflow",
                    version: "1.0.0",
                },
                error: "unauthorized",
            });
        }

        // allow access
        next();
    };

export const useAuth: FunctionMiddleware = () =>
    async (req, res, next ) => {
        // get session user
        const {
            data: {
                user
            },
        } = await supabase.auth.getUser();

        // require auth
        if ( !user ) {
            return res.json({
                api: {
                    name: "sculleryflow",
                    version: "1.0.0",
                },
                error: "unauthorized",
            });
        }

        // allow access
        next();
    }