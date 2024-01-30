import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Blog Schema
const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Blog name is required!']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required!']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  image: String,
  userID: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'User ID is required!']
  }
});

export const Blog = mongoose.model('Blog', blogSchema);
