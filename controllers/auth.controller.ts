import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
	findUserByEmail,
	createUser,
	updateUser,
	findUserByEmailAndResetPasswordToken,
	findUserByEmailAndOTP,
} from "../models/user.model";
import {
	generateAccessAndRefreshToken,
	generateOtpAndToken,
} from "../utils/helpers";

const register = async (req: Request, res: Response) => {
	try {
		const {
			email,
			password,
			firstName,
			lastName,
			phone,
			// avatar,
			role,
			organization,
			street,
			city,
			country,
			coordinates,
		} = req.body;

		const userExists = await findUserByEmail(email);
		if (userExists) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		const username = email.split("@")[0]; // username is the part before @ in email
		const otp = generateOtpAndToken(); // return 6 digit number
		const otpExpiresAt = new Date(
			Date.now() + 3 * 60 * 60 * 1000
		).toISOString(); // expires in 3 hours
		const encryptedPassword = await bcrypt.hash(password, 10); // encrypt password

		const newUser = await createUser({
			email,
			username,
			password: encryptedPassword,
			otp,
			otpExpiresAt,
			profile: {
				firstName,
				lastName,
				phone,
				role,
				organization,
				address: {
					street,
					city,
					country,
					location: {
						coordinates,
					},
				},
				isEmailVerified: false,
				isUserVerified: false,
			},
		});

		if (newUser) {
			// TODO: send email with otp for email verification
			res.status(201).json({ email, message: "User created successfully" });
			return;
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};
const verifyEmail = async (req: Request, res: Response) => {
	const { email, otp } = req.body;
	const user = await findUserByEmailAndOTP(email, otp);

	if (!user) {
		res.status(400).json({ message: "Invalid email or otp" });
		return;
	}

	const isOTPExpired = user.otpExpiresAt
		? new Date(user.otpExpiresAt).getTime() < Date.now()
		: true;

	if (isOTPExpired) {
		res.status(400).json({ message: "OTP expired" });
		return;
	}

	const updatedUser = await updateUser(user._id.toString(), {
		"profile.isEmailVerified": true,
		"profile.emailVerifiedAt": new Date().toISOString(),
		otp: null,
		otpExpiresAt: null,
	});

	if (updatedUser) {
		res.status(200).json({ message: "Email verified" });
		return;
	}
};
const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await findUserByEmail(email);
		if (!user) {
			res.status(400).json({ message: "Invalid email or password" });
			return;
		}

		const isPasswordValid =
			user.password && (await bcrypt.compare(password, user.password));

		if (!isPasswordValid) {
			res.status(400).json({ message: "Invalid email or password" });
			return;
		}

		const accessAndRefreshToken = await generateAccessAndRefreshToken(
			user._id.toString()
		);

		const updatedUser = await updateUser(user._id.toString(), {
			accessToken: accessAndRefreshToken.accessToken,
			refreshToken: accessAndRefreshToken.refreshToken,
		});

		if (updatedUser) {
			res.status(200).json({ updatedUser });
			return;
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};
const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await findUserByEmail(email);
		if (!user) {
			res.status(400).json({ message: "Invalid email" });
			return;
		}

		const resetPasswordToken = generateOtpAndToken(); // return 6 digit number

		const resetPasswordExpiresAt = new Date(
			Date.now() + 3 * 60 * 60 * 1000
		).toISOString(); // expires in 3 hours

		const updatedUser = await updateUser(user._id.toString(), {
			resetPasswordToken,
			resetPasswordExpiresAt,
		});

		if (updatedUser) {
			// TODO: send email with reset password token
			res.status(200).json({
				user: updatedUser.email,
				message: "Reset password token sent",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

const verifyResetToken = async (req: Request, res: Response) => {
	try {
		const { email, resetPasswordToken } = req.body;
		const user = await findUserByEmailAndResetPasswordToken(
			email,
			resetPasswordToken
		);

		if (!user) {
			res
				.status(400)
				.json({ message: "Invalid email or reset password token" });
			return;
		}

		const isResetPasswordTokenExpired = user.resetPasswordExpiresAt
			? new Date(user.resetPasswordExpiresAt).getTime() < Date.now()
			: true;

		if (isResetPasswordTokenExpired) {
			res.status(400).json({ message: "Reset password token expired" });
			return;
		}

		const updatedUser = await updateUser(user._id.toString(), {
			resetPasswordToken: null,
			resetPasswordExpiresAt: null,
		});

		if (updatedUser)
			res.status(200).json({ message: "Reset password token verified" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

export { register, verifyEmail, login, forgotPassword, verifyResetToken };
