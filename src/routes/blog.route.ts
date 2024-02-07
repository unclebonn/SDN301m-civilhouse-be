import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getOneBlog,
  updateBlog
} from '~/controllers';
import {
  validateBlog,
  verifyBlog
} from '~/middlewares/blogVerifying.middleware';
import {
  checkImgUpload,
  sendImgtoFirebase
} from '~/middlewares/uploadedImg.middleware';

const router = Router();

router
  .route('/')
  .post(
    checkImgUpload(false).single('image'),
    sendImgtoFirebase,
    validateBlog,
    verifyBlog,
    createBlog
  );

router.route('/all').get(getAllBlog);

router
  .route('/:id')
  .get(getOneBlog)
  .put(checkImgUpload(false).single('image'), sendImgtoFirebase, updateBlog)
  .delete(deleteBlog);

export default router;
