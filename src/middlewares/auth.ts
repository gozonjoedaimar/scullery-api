import { Request, Response, NextFunction } from 'express';

export const app_auth = () =>
    async function (req: Request, res: Response, next: NextFunction) {
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
        if ( ! user) {
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