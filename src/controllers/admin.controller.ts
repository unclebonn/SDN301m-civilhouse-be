import { RequestHandler } from 'express';
import { Product } from '~/models/product.model';

export const getAddProduct: RequestHandler = (_req, res, _next) => {
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

export const postAddProduct: RequestHandler = (req, res, _next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};
