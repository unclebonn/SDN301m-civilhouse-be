import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: String,
    status: Boolean,
    phone: { type: String, required: true, unique: true },
    address: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    gender: Boolean
});


export const User = mongoose.model("User", userSchema);