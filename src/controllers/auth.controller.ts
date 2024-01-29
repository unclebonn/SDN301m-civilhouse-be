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
import filterObject from '~/utils/filterObject';

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

  // export const protectRoute = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     // Check if token exists
  //     const authorizationHeader = req.headers.authorization;
  //     let token;
  //     if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
  //       token = authorizationHeader.split(' ')[1];
  //     }

  //     // Response if token is invalid
  //     if (!token) {
  //       return next(
  //         new AppError('You are not logged in! Please log in to get access.', 401)
  //       );
  //     }

  //     // Verify token
  //     const decodedJWT = (await promisify(jwt.verify)(
  //       token,
  //       process.env.JWT_SECRET
  //     )) as { id: string };

  //     const currentUser = await User.findById(decodedJWT.id);
  //     if (!currentUser) {
  //       return next(
  //         new AppError('The user belonging to this token no longer exists!', 401)
  //       );
  //     }

  //     // Check if the user changed the password after the token was issued
  //     if (currentUser.changedPasswordAfter(decodedJWT.iat)) {
  //       return next(
  //         new AppError(
  //           'User recently changed the password! Please log in again.',
  //           401
  //         )
  //       );
  //     }

  //     // Grant access to the protected route
  //     req.user = currentUser;
  //     next();
  //   }
  // );

  // export const restrictTo =
  //   (...roles: string[]) =>
  //   (req: Request, res: Response, next: NextFunction) => {
  //     // Roles is an array ['admin', 'lead-guide']
  //     // req.user.role is 'user' passed from protectRoute middleware
  //     // Since protectRoute middleware is called before this middleware
  //     if (!roles.includes(req.user.role)) {
  //       return next(
  //         new AppError('You do not have permission to perform this action!', 403)
  //       );
  //     }
  //     next();
  //   };
}

export default new AuthController();
