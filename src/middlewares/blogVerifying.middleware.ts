import { body } from 'express-validator';
import { User } from '~/models';

export const validateBlog = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Blog name must be a non-empty string'),
  body('content')
    .isString()
    .notEmpty()
    .withMessage('Blog content must be a non-empty string'),
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format'),
  body('image').optional().isString().withMessage('Image must be a string'),
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
