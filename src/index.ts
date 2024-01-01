import 'dotenv/config';
import 'module-alias/register';

import express, {Express} from 'express';
import { createClient } from '@supabase/supabase-js';
import apiRoute from 'app/routes/api';
import authRoute from 'app/routes/auth';
import webRoute from 'app/routes/web';
import mongoose from 'mongoose';

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

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

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
