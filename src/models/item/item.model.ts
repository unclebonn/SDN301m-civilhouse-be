import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Item Schema
const itemSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String,
  typeID: { type: ObjectId, ref: 'ItemType', required: true },
  price: { type: Number, required: true }
});

export const Item = mongoose.model('Item', itemSchema);
