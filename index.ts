import express, { Application, Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/routes';

// configure dotenv
dotenv.config();

// create express app
const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// configure bodyparser, cors and morgan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('common'));

// configure routes
app.use(router);

// start express server
app.listen(port, () => {
	console.info(`⚡️[server]: Server is running at ${process.env.BASE_URL}:${port}`);
});
export default app;