import express from 'express';
import userController from '../controllers/user.controller';
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default router;
