import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './router';
import cors from 'cors';
import api from './router/api';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

app.use('/', router);
app.use('/api', api);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});