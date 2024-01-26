import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import validator = require('validator');

const userSchema = new mongoose.Schema({
  _id: ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    validate: [validator.default.isEmail, 'Email is not valid!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  status: Boolean,
  phone: { type: String, required: true, unique: true },
  address: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  gender: Boolean,
});

export const User = mongoose.model('User', userSchema);
