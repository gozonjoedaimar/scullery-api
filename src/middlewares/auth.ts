import { type Request, type Response, type NextFunction } from 'express';

export const app_auth = () =>
    async (req: Request, res: Response, next: NextFunction) => {
        // skip auth routes
        if (req.path.includes("/auth/")) {
            return next();
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

export const useAuth = () =>
    async (req: Request, res: Response, next: NextFunction ) => {
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