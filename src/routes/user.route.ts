import express from 'express';
import userController from '../controllers/user.controller';
import AuthController from '~/controllers/auth.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(protectRoute, restrictTo('admin'), userController.createUser)
  .patch(protectRoute, restrictTo('admin'), userController.deactivateSelf);

router
  .route('/:id')
  .get(protectRoute, userController.getUserById)
  .delete(protectRoute, restrictTo('admin'), userController.deleteUserById);

export default router;
