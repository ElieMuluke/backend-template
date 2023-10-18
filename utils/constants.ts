import { Request } from "express";

const role: string[] = ["admin", "student", "restaurant", "farmer"];
type UserType = {
	email: String;
	username: String;
	password: String;
	otp: String;
	otpExpiresAt: String;
	resetPasswordToken: String;
	resetPasswordExpiresAt: String;
	accessToken: String;
	refreshToken: String;
	profile: {
		firstName: String;
		lastName: String;
		phone: String;
		avatar: String;
		role: String;
		organization: String;
		address: {
			street: String;
			city: String;
			country: String;
			location: {
				coordinates: {
					lat: String;
					lng: String;
				};
			};
		};
		isEmailVerified: Boolean;
		isUserVerified: Boolean;
		emailVerifiedAt: String;
		userVerifiedAt: String;
	};
};

export { role, UserType };
