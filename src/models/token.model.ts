import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    _id: ObjectId,
    expiredTime: Date,
    revoked: Boolean,
    userID: { type: ObjectId, ref: 'User' },
    token: String,
    tokenType: String
});


export const Token = mongoose.model("Token", tokenSchema);