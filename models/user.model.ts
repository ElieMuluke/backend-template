import mongoose from "mongoose";
import { UserSchema } from "./schema";

const User = mongoose.model("User", UserSchema);

const createUser = async (user: any) => {
	const newUser = new User(user);
	return await newUser.save();
};

const findUser = async (id: String) => {
	return await User.findById(id);
};

const findUserByEmail = async (email: String) => {
	return await User.findOne({ email });
};
const findUserByEmailAndResetPasswordToken = async (
	email: String,
	resetToken: String
) => {
	return await User.findOne({ email, resetPasswordToken: resetToken });
};
const findUserByEmailAndOTP = async (email: String, otp: String) => {
	return await User.findOne({ email, otp });
};

const findAllUsers = async () => {
	return await User.find({});
};

const getUserRole = async (id: String) => {
	const user = await findUser(id);

	if (!user) {
		return null;
	}

	return user.profile?.role || null;
};

const updateUser = async (id: String, user: any) => {
	return await User.findByIdAndUpdate(id, user);
};

const deleteUser = async (id: String) => {
	return await User.findByIdAndDelete(id);
};

export {
	createUser,
	findUser,
	findUserByEmail,
	findUserByEmailAndResetPasswordToken,
	findUserByEmailAndOTP,
	findAllUsers,
	getUserRole,
	updateUser,
	deleteUser,
};
