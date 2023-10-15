import { Router } from "express";
import { statusCheck } from "../controllers/status.controller";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description:  check the status of the server
 */
router.get("/", statusCheck);

export default router;
