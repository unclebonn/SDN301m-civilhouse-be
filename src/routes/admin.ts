import { Router } from 'express';
import productController from '~/controllers/product';

const router = Router();

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

export default router;
