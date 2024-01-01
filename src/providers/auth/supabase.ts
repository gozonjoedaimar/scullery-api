import { createClient } from "@supabase/supabase-js";

export const init = () => {
    // Init supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    globalThis.supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
    });
}

export const login = async (email: string, password: string) => {
    // login
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    return {
        session,
        error
    }
}

export const logout = async () => {
    // logout
    const { error } = await supabase.auth.signOut();

    return {
        error
    }
}

export const user = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    return {
        user
    }
}
