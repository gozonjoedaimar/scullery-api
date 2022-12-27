import express, {Express, Request, Response} from 'express';
import * as dotenv from 'dotenv';
import * as autoload from './autoload';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

autoload.init('/api', app);

app.use(function(req: Request, res: Response) {
  res.json({"404":"not found"});
})

app.listen(port, function() {
  console.log(`Server listening to port ${port}`);
});