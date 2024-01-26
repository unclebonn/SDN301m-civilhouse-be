import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// Material Schema
const materialSchema = new mongoose.Schema({
  _id: ObjectId,
  typeID: { type: ObjectId, ref: 'MaterialType' },
  name: String,
  quantity: String,
  unitPrice: String
});


export const Material = mongoose.model("Material", materialSchema);