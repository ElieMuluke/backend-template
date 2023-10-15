import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateAccessAndRefreshToken = async (id: String) => {
	const accessToken = jwt.sign({ id }, JWT_SECRET as Secret, {
		expiresIn: JWT_EXPIRES_IN,
	});
	const refreshToken = jwt.sign({ id }, JWT_SECRET as Secret, {
		expiresIn: JWT_EXPIRES_IN,
	});

	return { accessToken, refreshToken };
};

const generateOtpAndToken = async () => {
	const code = Math.floor(100000 + Math.random() * 900000).toString();

	return code;
};

export { generateAccessAndRefreshToken, generateOtpAndToken };
