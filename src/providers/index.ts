// import providers
import { init as supabaseInit } from 'app/providers/auth/supabase';

// env provider
const DEFAULT_PROVIDER = process.env.AUTH_PROVIDER || 'supabase';

// Init providers
export const init = () => {
    // register provider config here
    supabaseInit();
}

type AuthProvider = {
    login: (email: string, password: string) => Promise<{
        session?: {
            access_token: string,
            expires_in: number,
            expires_at: string,
            refresh_token: string,
            token_type: string,
            user: { [key:string]: string|number }
        },
        error?: Error
    }>,
    logout: () => Promise<{
        error?: Error
    }>,
    user: () => Promise<{
        user?: { [key:string]: string }
    }>
}

export const Auth = (): Promise<AuthProvider> => import(`app/providers/auth/${DEFAULT_PROVIDER}`);