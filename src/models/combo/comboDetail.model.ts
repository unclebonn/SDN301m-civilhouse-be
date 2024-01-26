import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const comboDetailSchema = new mongoose.Schema({
  _id: ObjectId,
  materialID: { type: ObjectId, ref: 'Material' },
  comboBuildingID: { type: ObjectId, ref: 'ComboBuilding' }
});

export const ComboDetail = mongoose.model('ComboDetail', comboDetailSchema);
