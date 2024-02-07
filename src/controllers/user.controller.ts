import { User } from '~/models';
import { Request, Response, NextFunction } from 'express';
import AppError from '~/utils/appError';
import catchAsync from '~/utils/catchAsync';
import mongoose from 'mongoose';
import { filterObject } from '~/utils/filterObject';

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

  public updateUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          user: updatedUser
        }
      });
    }
  );

  public updateSelf = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const allowField = [
        'firstName',
        'lastName',
        'address',
        'photo',
        'birthDate',
        'gender'
      ];
      const notAllowField = ['email', 'phone'];

      if (Object.keys(req.body).length === 0) {
        return next(new AppError('Cannot update empty object.', 400));
      }

      const errorFieldMessage: string[] = [];

      Object.keys(req.body).forEach((el) => {
        if (notAllowField.includes(el)) {
          errorFieldMessage.push(el.toUpperCase());
        }
      });

      if (req.body.password || req.body.passwordConfirm) {
        return next(
          new AppError(
            'This route is not for password updates. Please use /updateMyPassword.',
            400
          )
        );
      }

      if (errorFieldMessage.length > 0) {
        return next(
          new AppError(`Cannot change ${errorFieldMessage.join(', ')}.`, 400)
        );
      }

      const filteredBody = filterObject(req.body, allowField);

      const updatedUser = await User.findByIdAndUpdate(
        req.user!.id,
        filteredBody,
        {
          new: true,
          runValidators: true
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          user: updatedUser
        }
      });
    }
  );

  // public searchUser = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const users = await User.find({
  //       $text: { $search: req.query.q as string }
  //     });

  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         users
  //       }
  //     });
  //   }
  // );
}

export default new UserController();
