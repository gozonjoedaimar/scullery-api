import { Auth } from 'app/providers';
import { type Request, type Response, type NextFunction } from 'express';

type FunctionMiddleware = () => (req: Request, res: Response, next: NextFunction) => Promise<Response|undefined>;

export const app_auth: FunctionMiddleware = () =>
    async (req, res, next) => {
        const auth = await Auth();
        // skip auth routes
        if (req.path.includes("/auth/")) {
            next();
            return;
        }
        // get session user
        const {
            user
        } = await auth.user();

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
        const auth = await Auth();
        // get session user
        const {
            user
        } = await auth.user();

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