import { randomUUID } from "crypto";
import { Schema } from "mongoose";

const UserSchema = new Schema({
	email: String,
	username: {
		type: randomUUID,
		unique: true,
		required: true,
		default: randomUUID
	},
	password: String,
	otp: String,
	otpExpiresAt: Date,
	resetPasswordToken: String,
	resetPasswordExpiresAt: Date,
	profile:{
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
			location: {
				type: String,
				coordinates: {
					lat: Number,
					lng: Number
				}
			}
		},
		isEmailVerified: Boolean, // isEmailVerified to be used for email verification
		isUserVerified: Boolean, // isUserVerified to be used for user verification through admin and/or KYC such as passport, driving license, etc.
		emailVerifiedAt: Date,
		userVerifiedAt: Date,
		createdAt: Date,
		updatedAt: Date,
	},

},{timestamps: true});

export { UserSchema };