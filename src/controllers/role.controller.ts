import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from '~/models';
import AppError from '~/utils/appError';
import catchAsync from '~/utils/catchAsync';

class RoleController {
  public getUserRole = catchAsync(
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
}

export default new RoleController();
