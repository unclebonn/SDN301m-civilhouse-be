import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  // _id: ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirm is required!'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (val: string) {
        return val === (this as any).password;
      },
      message: 'Passwords are not the same!'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    validate: [validator.default.isEmail, 'Email is not valid!']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: Boolean,
  phone: { type: String, required: true, unique: true },
  address: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  gender: Boolean,
  active: {
    type: Boolean,
    default: true
  }
});

export const User = mongoose.model('User', userSchema);
