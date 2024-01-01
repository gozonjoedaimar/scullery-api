import { ob_null } from 'app/helpers/object';
import { Auth } from 'app/providers';

type FormInput = {
    email: string,
    password: string,
}

/**
 * Login
 */
export const login: RouteHandler = async (req, res) => {
    const {email, password}: FormInput = req.body;
    const auth = await Auth();

    // login
    const { data, error } = await auth.login(email, password);

    // get session
    const { user, ...session } = data?.session || {};

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
    const auth = await Auth();
    // logout
    const { error } = await auth.logout();

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
    const auth = await Auth();
    const { user } = await auth.user();

    res.json({
        api: {
            name: 'getUser',
            version: '1.0.0'
        },
        user
    });
}