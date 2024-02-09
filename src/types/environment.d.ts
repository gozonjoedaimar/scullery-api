export {};

/* declare process.env */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      MONGO_URL: string;
      JWT_SECRET: string;
      SENTRY_DSN: string;
    }
  }
}