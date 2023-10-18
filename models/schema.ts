import { Schema } from "mongoose";

const UserSchema = new Schema(
	{
		email: String,
		username: String,
		password: String,
		otp: Number,
		otpExpiresAt: Date,
		accessToken: String,
		refreshToken: String,
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		profile: {
			firstName: String,
			lastName: String,
			phone: String,
			avatar: String,
			role: String,
			organization: String,
			address: {
				street: String,
				city: String,
				country: String,
			},

			isEmailVerified: Boolean,
			emailVerifiedAt: Date,
			isUserVerified: Boolean,
			userVerifiedAt: Date,
			createdAt: Date,
			updatedAt: Date,
		},
	},
	{ timestamps: true }
);

export { UserSchema };
