import mongoose from "mongoose";
import dotenv from "dotenv";
import { ConnectionOptions } from "tls";

// configure dotenv
dotenv.config();

const dbConnection = mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
} as ConnectionOptions)
.then(() => {
	console.log("⚡️[server]: Connected to database");
})
.catch((err) => {
	console.log("⚡️[server]: Error connecting to database", err);
});

export default dbConnection;