import express, { Application, Express } from "express";
import dotenv from "dotenv";
// import bodyParser from 'body-parser';
import fs from "fs";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import router from "./routes";
import authRouter from "./routes/auth.routes";
import dbConnection from "./config/db";
import swaggerSpecs from "./config/swaggerConfig";

// configure dotenv
dotenv.config();

// create express app
const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// configure bodyparser, cors and morgan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// configure access and error logs to ./logs/[logType].log
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "../logs/access.log"),
	{ flags: "a" }
);
const errorLogStream = fs.createWriteStream(
	path.join(__dirname, "../logs/error.log"),
	{ flags: "a" }
);

app.use(
	morgan("combined", {
		stream: accessLogStream,
		skip: (req, res) => res.statusCode >= 400,
	})
);
app.use(
	morgan("combined", {
		stream: errorLogStream,
		skip: (req, res) => res.statusCode < 400,
	})
);

// app.use(morgan("dev"));

// configure swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// configure routes
app.use(router);
app.use("/api/v1", authRouter);

// start express server
app.listen(port, async () => {
	console.info(
		`⚡️[server]: Server is running at ${process.env.BASE_URL}:${port}`
	);
	await dbConnection;
});
export default app;
