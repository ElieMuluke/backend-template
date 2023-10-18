import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import JSZip from "jszip";

const statusCheck = (req: Request, res: Response) => {
	res.status(200).send(`🟢 OK, Server is up and running`);
	return;
};

const downloadLogs = (req: Request, res: Response) => {
	// get both access and error logs
	// zip them
	// send them to the client
	// delete them from the server

	const accessLogPath = path.join(__dirname, "../../logs/access.log");
	const errorLogPath = path.join(__dirname, "../../logs/error.log");

	// console.log(accessLogPath, errorLogPath);

	const zip = new JSZip();
	zip.file("access.log", fs.readFileSync(accessLogPath));
	zip.file("error.log", fs.readFileSync(errorLogPath));

	zip.generateAsync({ type: "nodebuffer" }).then((content) => {
		res.setHeader("Content-Type", "application/zip");
		res.setHeader("Content-Disposition", "attachment; filename=logs.zip");
		res.status(200).send(content);
	});
};

export { statusCheck, downloadLogs };
