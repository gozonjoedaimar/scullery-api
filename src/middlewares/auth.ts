import { Auth } from 'app/providers';
import { type Request, type Response, type NextFunction } from 'express';

type FunctionMiddleware = () => (req: Request, res: Response, next: NextFunction) => Promise<Response|undefined>;

export const app_auth: FunctionMiddleware = () =>
    async (req, res, next) => {
        const auth = await Auth();

        // get auth bearer
        const bearer = req.headers.authorization?.split(" ")[1];

        // skip auth routes
        if (req.path.includes("/auth/")) {
            next();
            return;
        }
        // get session user
        const {
            user
        } = await auth.user(bearer);

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

        console.log("BEARER::::::", req.headers.authorization);

        // get auth bearer
        const bearer = req.headers.authorization?.split(" ")[1];

        // get session user
        const {
            user
        } = await auth.user(bearer);

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