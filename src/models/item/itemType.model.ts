import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// ItemType Schema  
const itemTypeSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String
});

export const ItemType = mongoose.model("ItemType", itemTypeSchema);