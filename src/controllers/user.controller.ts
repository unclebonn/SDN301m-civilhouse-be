import { User } from '~/models';
import { Request, Response, NextFunction } from 'express';
import AppError from '~/utils/appError';
import catchAsync from '~/utils/catchAsync';
import mongoose from 'mongoose';

class UserController {
  public getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await User.find();

      res.status(200).json({
        status: 'success',
        data: {
          users
        }
      });
    }
  );

  public getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findById(req.params.id);

      res.status(200).json({
        status: 'success',
        data: {
          user
        }
      });
    }
  );

  public createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          user
        }
      });
    }
  );

  public deactivateSelf = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await User.findByIdAndUpdate(req.user!.id, { active: false });

      res.status(204).json({
        status: 'success',
        message: 'User deactivated!'
      });
    }
  );

  public deleteUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await User.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: 'success',
        message: 'User deleted!'
      });
    }
  );
}

export default new UserController();
