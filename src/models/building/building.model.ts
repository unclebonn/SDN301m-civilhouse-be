import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Building Schema
const buildingSchema = new mongoose.Schema({
  name: String,
  description: String,
  length: Number,
  width: Number,
  status: Number
});

export const Building = mongoose.model('Building', buildingSchema);
