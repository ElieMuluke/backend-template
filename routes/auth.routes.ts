import express, { RequestHandler } from "express";
import {
	register,
	verifyEmail,
	login,
	forgotPassword,
	verifyResetToken,
	setNewPassword,
	setAdmin,
} from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: User
 *       description: The user to create
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - role
 *         - phone
 *         - organization
 *         - street
 *         - city
 *         - country
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           role:
 *             type: string
 *           phone:
 *             type: string
 *           organization:
 *             type: string
 *           street:
 *             type: string
 *           city:
 *             type: string
 *           country:
 *             type: string
 *         example:
 *            id: 1
 *            firstName: John
 *            lastName: Doe
 *            email: john@fake.com
 *            password: password
 *            role: student
 *            phone: +1111111111
 *            organizaton: Fake Organization
 *            street: 1234 Main St
 *            city: Nairobi
 *            country: Kenya
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", register);
/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: verify a new user's email
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         - otp
 *         properties:
 *           email:
 *             type: string
 *           otp:
 *             type: string
 *         example:
 *            email: john@fake.com
 *            otp: 123456
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid email or otp
 *       401:
 *         description: OTP expired
 *       500:
 *         description: Internal server error
 */
router.post("/verify-email", verifyEmail);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login a user
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         - password
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *            email: john@fake.com
 *            password: 123456
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);
/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: forgot password for a user
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         properties:
 *           email:
 *             type: string
 *         example:
 *            email: john@fake.com
 *     responses:
 *       200:
 *         description: Reset password token sent
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
router.post("/forgot-password", forgotPassword);
/**
 * @swagger
 * /verify-reset-token:
 *   post:
 *     summary: verify reset password token
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         properties:
 *           email:
 *             type: string
 *         example:
 *            email: john@fake.com
 *     responses:
 *       200:
 *         description: Reset password token verified
 *       400:
 *         description: Invalid email or reset password token
 *       401:
 *         description: Reset password token expired
 *       500:
 *         description: Internal server error
 */
router.post("/verify-reset-token", verifyResetToken);
/**
 * @swagger
 * /set-new-password:
 *   post:
 *     summary: set new password token
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         - password
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *            email: john@fake.com
 *            password: pass
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
router.post("/set-new-password", setNewPassword);
/**
 * @swagger
 * /set-admin:
 *   post:
 *     summary: admin user to set a specific other user as admin
 *     consumes:
 *     - application/json
 *     parameters:
 *     - in: body
 *       schema:
 *         type: object
 *         required:
 *         - email
 *         properties:
 *           email:
 *             type: string
 *         example:
 *            email: john@fake.com
 *     responses:
 *       200:
 *         description: Admin Set
 *       400:
 *         description: Invalid email
 *       500:
 *         description: Internal server error
 */
router.post("/set-admin", AuthMiddleware, setAdmin);

// TODO: refresh token
// router.post("/refresh-token", refreshToken);

export default router;
