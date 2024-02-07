import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '~/models';

export const validateBlog = [
  body('name')
    .notEmpty()
    .withMessage('Blog name must be a non-empty string')
    .bail()
    .isString()
    .withMessage('Blog name must be a string'),
  body('content')
    .notEmpty()
    .withMessage('Blog content must be a non-empty string')
    .bail()
    .isString()
    .withMessage('Blog content must be a string'),
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format'),
  body('image')
    .optional()
    .custom((value, { req }) => {
      if (!value) {
        return true;
      }
      // check if file is actually an image
      if (!req.file.mimetype.startsWith('image')) {
        throw new Error('File must be an image');
      }

      return true;
    }),
  body('userID')
    .notEmpty()
    .withMessage('User ID must be a non-empty string')
    .bail()
    .isMongoId()
    .withMessage('Invalid User ID')
    .bail()
    .custom(async (_value, { req }) => {
      const userExists = await User.exists({
        _id: req.body.userID
      });
      if (!userExists) {
        throw new Error('User does not exist');
      }
      return true;
    })
];

export const verifyBlog = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
