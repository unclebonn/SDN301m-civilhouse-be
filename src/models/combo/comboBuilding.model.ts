import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// ComboBuilding Schema
const comboBuildingSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String,
  unitPrice: Number
});

export const ComboBuilding = mongoose.model(
  'ComboBuilding',
  comboBuildingSchema
);
