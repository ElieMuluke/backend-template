import express, { Application, Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
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

// configure access and error logs to ./logs/[logType].log
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(__dirname, '../logs/error.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream, skip: (req, res) => res.statusCode >= 400 }));
app.use(morgan('combined', { stream: errorLogStream, skip: (req, res) => res.statusCode < 400 }));

// configure routes
app.use('/api/v1', router);

// start express server
app.listen(port, () => {
	console.info(`⚡️[server]: Server is running at ${process.env.BASE_URL}:${port}`);
});
export default app;