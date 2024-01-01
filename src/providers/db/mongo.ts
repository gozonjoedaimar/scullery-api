import mongoose from "mongoose";

export const connection = mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/sculleryapi");

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
	console.log("Error connecting to MongoDB", err);
});

export const init = () => connection;

export default init;