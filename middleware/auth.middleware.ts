import { Request, Response, NextFunction } from "express";
import { getUserRole } from "../models/user.model";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) {
			res.status(401).json({ message: "Unauthorized, token not provided" });
			return;
		}

		const [scheme, token] = authorization.split(" ");

		// handle token malformatted
		if (!/^Bearer$/i.test(scheme)) {
			res.status(401).json({ message: "Unauthorized, token malformatted" });
			return;
		}

		// handle token not found
		if (!token) {
			res.status(401).json({ message: "Unauthorized, token not provided" });
			return;
		}
		jwt.verify(
			token,
			process.env.JWT_SECRET as Secret,
			async (err, decoded) => {
				if (err) {
					if (err.name === "TokenExpiredError") {
						res.status(401).json({ message: "Unauthorized, token expired" });
						return;
					}

					if (err.name === "JsonWebTokenError") {
						if (err.message === "jwt malformed") {
							res
								.status(401)
								.json({ message: "Unauthorized, token malformatted" });
							return;
						} else {
							res.status(401).json({ message: "Unauthorized, token invalid" });
							return;
						}
					}

					if (err.name === "NotBeforeError") {
						res.status(401).json({ message: "Unauthorized, token not active" });
						return;
					}
				}

				if (!decoded) {
					res.status(401).json({ message: "Nothing decoded" });
					return;
				}

				const { id } = decoded as JwtPayload;
				const role = await getUserRole(id);
				req.body.currentlyLoggedInUser = {
					userId: id,
					role: role,
				};

				next();
			}
		);
	} catch (err) {
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

export default AuthMiddleware;
