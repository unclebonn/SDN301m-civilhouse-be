import { Router } from 'express';
import { getAddProduct, postAddProduct } from '~/controllers/admin.controller';

const router = Router();

router.get('/add-product', getAddProduct);

router.get('/product');

router.post('/add-product', postAddProduct);

export default router;
