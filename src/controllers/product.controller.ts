import { RequestHandler } from 'express';
import { Product } from '~/models/product.model';

export const getProducts: RequestHandler = (_req, res, _next) => {
    Product.fetchAll((prodList) => {
        res.render('shop/product-list', { prodList, pageTitle: 'Shop', path: '/' });
    });
};
