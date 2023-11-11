import express, {Express} from 'express';
import 'dotenv/config';
import { init } from './routes/autoload';
import { createClient } from '@supabase/supabase-js';

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Init supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
globalThis.supabase = createClient(supabaseUrl, supabaseKey)

// load api modules
init('/api', app);

// load auth modules
init('/auth', app);

// Handle 404
app.use(function(req, res) {
  res.json({"404":"not found"});
})

app.listen(port, function() {
  console.log(`Server listening to port ${port}`);
});
