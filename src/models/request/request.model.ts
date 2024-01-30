import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// RequestContract Schema
const requestContractSchema = new mongoose.Schema({
  // _id: ObjectId,
  comboBuildingID: { type: ObjectId, ref: 'ComboBuilding' },
  buildingID: { type: ObjectId, ref: 'Building' },
  userID: { type: ObjectId, ref: 'User' },
  status: Boolean
});

export const RequestContract = mongoose.model(
  'RequestContract',
  requestContractSchema
);
