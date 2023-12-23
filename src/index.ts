import 'dotenv/config';
import 'module-alias/register';

import express, {Express} from 'express';
import { init } from './routes/autoload';
import { createClient } from '@supabase/supabase-js';
import { app_auth } from './middlewares/auth';
import apiRoute from '@/routes/api'

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
init('/auth', app);

// Handle 404
app.use(function(req, res) {
  res.json({"404":"not found"});
})

app.listen(port, function() {
  console.log(`Server listening to port ${port}`);
});
