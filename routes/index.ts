import { Router } from "express";
import { statusCheck, downloadLogs } from "../controllers/index.controller";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description:  check the status of the server
 */
router.get("/", statusCheck);
router.get("/download-logs", downloadLogs);

export default router;
