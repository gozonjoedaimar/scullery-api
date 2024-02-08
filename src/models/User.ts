import mongoose, { Schema } from "mongoose";

type UserData = {
	email: string;
	password: string;
	name: string;
};

// user schema
const UserSchema = new Schema<UserData>({
	email: String,
	name: String,
	password: String,
});

export default mongoose.model("users", UserSchema);
