import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import { User } from '../models/user/user.model';
import catchAsync from '../utils/catchAsync';
import AppError from '~/utils/appError';
import { IUser } from '~/models/user/user.interface';
import { filterObject } from '~/utils/filterObject';

class AuthController {
  private signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

  private createSendToken = (
    user: IUser,
    statusCode: number,
    res: Response
  ) => {
    const token = this.signToken(user._id);
    const cookieOptions = {
      // convert to milliseconds
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (process.env.NODE_ENV === 'production')
      (cookieOptions as any).secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove fields that are not allowed to be sent to client
    const allowedFields = ['username', 'email', 'photo', 'phone', 'role'];
    const userResponse = filterObject(user, allowedFields);

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user: userResponse
      }
    });
  };

  public signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        phone: req.body.phone,
        role: 'user'
      });

      this.createSendToken(newUser, 201, res);
    }
  );
  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;
      // Check if username and password inputted
      if (!username || !password) {
        return next(new AppError('Please provide username and password!', 400));
      }
      // Check if user exists and password is correct
      // +password is to select password field which is set to select: false in userModel.js
      const user = await User.findOne({ username }).select('+password');

      if (!user || !(await user.verifyPassword(password, user.password!))) {
        return next(new AppError('Incorrect username or password!', 401));
      }

      this.createSendToken(user, 200, res);
    }
  );
}

export default new AuthController();
