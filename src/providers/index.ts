// auth providers
import { init as supabaseInit } from 'app/providers/auth/supabase';
// db providers
import { init as mongodbInit } from 'app/providers/db/mongo';

// env provider
const DEFAULT_PROVIDER = process.env.AUTH_PROVIDER || 'local';

// Init providers
export const init = () => {
    // auth providers
    supabaseInit();

    // db providers
    mongodbInit();
}

type AuthProvider = {
    login: (email: string, password: string) => Promise<{
        session?: {
            access_token: string,
            expires_in: number,
            expires_at: string,
            refresh_token: string,
            token_type: string,
            user: { [key: string]: string | number }
        },
        error?: Error
    }>,
    logout: (bearer?: string) => Promise<{
        error?: Error
    }>,
    user: (bearer?: string) => Promise<{
        user?: {
            [key: string]: string,
            email: string
        }
    }>
    register: ({
        email, password
    }: {
        email: string;
        password: string;
    }) => Promise<{
        error?: Error
    }>,
}

export const Auth = (): Promise<AuthProvider> => import(`app/providers/auth/${DEFAULT_PROVIDER}`);
