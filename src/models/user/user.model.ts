import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirm is required!'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (val: string) {
        return val === (this as any).password;
      },
      message: 'Passwords are not the same!'
    },
    select: false
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
    enum: ['admin', 'customer', 'staff'],
    default: 'customer'
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required!'],
    unique: true
  },
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

userSchema.pre<IUser>(/^find/, function (next) {
  (this as any).find({ active: { $ne: false } });
  next();
});

// hash password before saving to database
userSchema.pre<IUser>('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash((this as any).password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = '';
  next();
});

// verify password
userSchema.methods.verifyPassword = async function (
  inputPassword: string,
  userPassword: string
) {
  return await bcrypt.compareSync(inputPassword, userPassword);
};

export const User = mongoose.model('User', userSchema);
