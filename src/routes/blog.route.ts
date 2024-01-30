import { Router } from 'express';
import blogController from '../controllers/blog.controller';

const router = Router();

router.route('/').post(blogController.createBlog);

router.route('/all').get(blogController.getAllBlog);

export default router;
