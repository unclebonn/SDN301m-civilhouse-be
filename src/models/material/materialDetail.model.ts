import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// MaterialType Schema
const materialTypeSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String
});

export const MaterialType = mongoose.model("MaterialType", materialTypeSchema);
