import { Router } from 'express';
import productController from '~/controllers/product';

const router = Router();

router.get('/', productController.getProducts);

export default router;
