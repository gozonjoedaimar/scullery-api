import express, {Express, Request, Response, Errback, NextFunction} from 'express';
import 'dotenv/config';
import * as autoload from './autoload';
import { createClient } from '@supabase/supabase-js';

const app: Express = express();
const port = process.env.PORT;

// Init supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
globalThis.supabase = createClient(supabaseUrl, supabaseKey)

// load api modules
autoload.init('/api', app);

// load auth modules
autoload.init('/auth', app);

// Handle 404
app.use(function(req: Request, res: Response) {
  res.json({"404":"not found"});
})

app.listen(port, function() {
  console.log(`Server listening to port ${port}`);
});
