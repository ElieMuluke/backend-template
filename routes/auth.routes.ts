import express from "express";
import {
	register,
	verifyEmail,
	login,
	forgotPassword,
	verifyResetToken,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-token", verifyResetToken);

// TODO: refresh token
// router.post("/refresh-token", refreshToken);
