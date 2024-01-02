import mongoose, { Schema, Model, Document } from "mongoose";

type UserData = {
	email: string;
	password: string;
} & Document;

type UserModel = Model<UserData>;

// user schema
const UserSchema = new Schema<UserData, UserModel>({
	email: Schema.Types.String,
	password: Schema.Types.String,
});

const User = mongoose.model("users", UserSchema);

export default User;