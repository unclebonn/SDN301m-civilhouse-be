import { Router, Request, Response, NextFunction } from 'express';
import roleController from '~/controllers/role.controller';

const router = Router();

router.route('/:id').get(roleController.getUserRole);

export default router;
