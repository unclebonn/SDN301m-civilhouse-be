import express from 'express';
import userController from '../controllers/user.controller';
import AuthController from '~/controllers/auth.controller';
import { protectRoute, restrictTo } from '~/middlewares/jwt.middleware';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

router
  .route('/')
  .get(protectRoute, userController.getAllUsers)
  .post(protectRoute, restrictTo('admin'), userController.createUser);

router.patch(
  '/deactivate',
  protectRoute,
  restrictTo('staff', 'customer'),
  userController.deactivateSelf
);

router.patch(
  '/self',
  protectRoute,
  restrictTo('staff', 'customer'),
  userController.updateSelf
);

router
  .route('/:id')
  .get(protectRoute, restrictTo('admin'), userController.getUserById)
  .delete(protectRoute, restrictTo('admin'), userController.deleteUserById)
  .patch(protectRoute, restrictTo('admin'), userController.updateUserById);

export default router;
