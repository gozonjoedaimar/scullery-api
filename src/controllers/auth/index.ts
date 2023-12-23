import { Request, Response } from 'express';
import { ob_null } from '../../helpers/object';

/**
 * Login
 */
export async function login(req: Request, res: Response) {
    const form = req.body;

    // login
    const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
    });

    // get session
    const { user, ...session } = data.session || {};

    res.json({
        api: {
            name: 'login',
            version: '1.0.0'
        },
        session: ob_null(session),
        error: error?.message
    });
}

/**
 * Logout
 */
export async function logout(req: Request, res: Response) {
    // logout
    const { error } = await supabase.auth.signOut();

    res.json({
        api: {
            name: 'logout',
            version: '1.0.0'
        },
        error: error?.message,
        success: !error ? "Successfully logged out" : undefined
    });
}

/**
 * Get user
 */
export async function getUser(req: Request, res: Response) {
    const { data: { user } } = await supabase.auth.getUser();

    res.json({
        api: {
            name: 'getUser',
            version: '1.0.0'
        },
        user
    });
}