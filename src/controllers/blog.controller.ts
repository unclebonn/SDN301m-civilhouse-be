import { NextFunction, Request, Response } from 'express';
import { Blog, User } from '~/models';
import { body, validationResult } from 'express-validator';
import catchAsync from '~/utils/catchAsync';
import { ObjectId } from 'mongodb';
import AppError from '~/utils/appError';

export const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const blog = await Blog.create({ ...req.body });
    console.log('response', req.originalUrl);
    res.status(201).json({
      status: 'success',
      data: {
        blog
      }
    });
  }
);

export const getAllBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await Blog.find({});
    res.status(200).json({
      status: 'success',
      blogs
    });
  }
);

export const getOneBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!ObjectId.isValid(req.params.id)) {
      return next(new AppError('Invalid blog id', 400));
    }
    const blog = await Blog.find({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      blog
    });
  }
);

export const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!ObjectId.isValid(req.params.id)) {
      return next(new AppError('Invalid blog id', 400));
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      blog
    });
  }
);

export const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!ObjectId.isValid(req.params.id)) {
      return next(new AppError('Invalid blog id', 400));
    }
    let result = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: result
    });
  }
);
