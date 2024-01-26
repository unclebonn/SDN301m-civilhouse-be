import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// BuildingDetail Schema
export const buildingDetailSchema = new mongoose.Schema({
  _id: ObjectId,
  buildingID: { type: ObjectId, ref: 'Building' },
  itemID: { type: ObjectId, ref: 'Item' }
});

export const BuildingDetail = mongoose.model(
  'BuildingDetail',
  buildingDetailSchema
);
