import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getOneBlog,
  updateBlog,
  validateBlog
} from '~/controllers';

const router = Router();

router.route('/').post(validateBlog, createBlog);

router.route('/all').get(getAllBlog);

router.route('/:id').get(getOneBlog).put(updateBlog).delete(deleteBlog);

export default router;
