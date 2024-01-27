import express from 'express';
import userController from '../controllers/user.controller';
import AuthController from '~/controllers/auth.controller';
const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').get(userController.getUserById);

export default router;
