import 'dotenv/config';
import env from './env';
if (env === 'production') require('module-alias/register');
// GlitchTip error reporting
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });

import express, {Express} from 'express';

import apiRoute from 'app/routes/api';
import authRoute from 'app/routes/auth';
import webRoute from 'app/routes/web';
import * as providers from 'app/providers';

const app: Express = express();
const port = process.env.PORT;

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());

// Init providers
providers.init();

// load api modules
app.use('/api', apiRoute);

// load auth modules
app.use('/auth', authRoute);

// Frontend
app.use(webRoute);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Handle 404
app.use((req, res) => {
  res.json({"404":"not found"});
})

app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});
