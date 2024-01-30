import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getOneBlog,
  updateBlog
} from '~/controllers';
import { validateBlog } from '~/middlewares/blogVerifying.middleware';

const router = Router();

router.route('/').post(validateBlog, createBlog);

router.route('/all').get(getAllBlog);

router.route('/:id').get(getOneBlog).put(updateBlog).delete(deleteBlog);

export default router;
