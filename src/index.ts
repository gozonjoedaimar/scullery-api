import express, {Express, Request, Response, Errback, NextFunction} from 'express';
import * as dotenv from 'dotenv';
import * as autoload from './autoload';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// load api modules
autoload.init('/api', app);

// Handle 404
app.use(function(req: Request, res: Response) {
  res.json({"404":"not found"});
})

app.listen(port, function() {
  console.log(`Server listening to port ${port}`);
});
