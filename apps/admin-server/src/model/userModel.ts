import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
});

export default model("user", userSchema);
