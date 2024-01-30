import { NextFunction, Request, Response } from 'express';
import { Blog, User } from '~/models';
import { validationResult, check } from 'express-validator';
import catchAsync from '~/utils/catchAsync';

const blogValidationRules = [
  check('name').isString().notEmpty(),
  check('content').isString().notEmpty(),
  check('date').optional().isISO8601().toDate(),
  check('image').optional().isString(),
  check('userID')
    .isMongoId()
    .custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error('User not found');
      }
      return true;
    })
];

class BlogController {
  // public validateBlog = catchAsync(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     await Promise.all(
  //       blogValidationRules.map((rule) => rule(req, res, next))
  //     );
  //     const errors = validationResult(req);
  //     console.log(errors);
  //     if (!errors.isEmpty()) {
  //       return res.status(400).json({ errors: errors.array() });
  //     }
  //     console.log('check pass', req.baseUrl);
  //     next();
  //   }
  // );

  public createBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      for (const rule of blogValidationRules) {
        rule(req, res, next);
      }
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        const blog = await Blog.create({ ...req.body });
        console.log('response', req.baseUrl);
        res.status(201).json({
          status: 'success',
          data: {
            blog
          }
        });
      }
    }
  );

  public getAllBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {}
  );
}

export default new BlogController();
