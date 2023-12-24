import 'dotenv/config';
import 'module-alias/register';

import express, {Express} from 'express';
import { createClient } from '@supabase/supabase-js';
import { app_auth } from './middlewares/auth';
import apiRoute from '@/routes/api';
import authRoute from '@/routes/auth';
import webRoute from '@/routes/web';

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Init supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
globalThis.supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

// auth middleware
app.use(app_auth());

// load api modules
app.use('/api', apiRoute);

// load auth modules
app.use('/auth', authRoute);

// Frontend
app.use(webRoute);

// Handle 404
app.use((req, res) => {
  res.json({"404":"not found"});
})

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
