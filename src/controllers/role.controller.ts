import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '~/models';
import AppError from '~/utils/appError';
import catchAsync from '~/utils/catchAsync';

export const getUserRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return next(new AppError('Invalid user id', 400));
    }
    let result = await User.findOne({ _id: id }, { _id: false, role: true });
    let role = result?.role;
    res.status(200).json({
      status: role ? 'success' : 'no-data',
      data: {
        role
      }
    });
  }
);

export const changeUserRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let id = req.params.id;
    let role = req.body.role;
    if (role !== 'admin' && role !== 'staff' && role !== 'customer') {
      return next(new AppError('Invalid role', 400));
    }
    if (!ObjectId.isValid(id)) {
      return next(new AppError('Invalid user id', 400));
    }
    if (!role) {
      return next(new AppError('Invalid role', 400));
    }
    let result = await User.findOneAndUpdate(
      { _id: id },
      { role },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        result
      }
    });
  }
);
