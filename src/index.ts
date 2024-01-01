import 'dotenv/config';
import 'module-alias/register';

import express, {Express} from 'express';
import apiRoute from 'app/routes/api';
import authRoute from 'app/routes/auth';
import webRoute from 'app/routes/web';
import * as providers from 'app/providers';

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

// Init providers
providers.init();

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
