import { ob_null } from '@/helpers/object';

/**
 * Login
 */
export const login: RouteHandler = async (req, res) => {
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
export const logout: RouteHandler = async (req, res) => {
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
export const getUser: RouteHandler = async (req, res) => {
    const { data: { user } } = await supabase.auth.getUser();

    res.json({
        api: {
            name: 'getUser',
            version: '1.0.0'
        },
        user
    });
}