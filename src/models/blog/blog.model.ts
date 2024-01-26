import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// Blog Schema
const blogSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String,
  content: String,
  date: Date,
  image: String,
  userID: { type: ObjectId, ref: 'User' }
});

export const Blog = mongoose.model('Blog', blogSchema);
