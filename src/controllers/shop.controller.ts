import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Product } from '~/models/product.model';

namespace shopController {
    export const getProducts: RequestHandler = (_req, res, _next) => {
        Product.fetchAll((prodList) => {
            res.render('shop/product-list', { prodList, pageTitle: 'All Products', path: '/products' });
        });
    };

    export const getIndex: RequestHandler = (req, res, next) => {
        Product.fetchAll((prodList) => {
            res.render('shop/index', { prodList, pageTitle: 'Shop', path: '/' });
        });
    };

    export const getCart: RequestHandler = (req, res, next) => {
        res.render('shop/cart', { path: '/cart', pageTitle: 'Your Cart' });
    };

    export const getOrders: RequestHandler = (req, res, next) => {
        res.render('shop/orders', { path: '/orders', pageTitle: 'Your Orders' });
    };

    export const getCheckout: RequestHandler = (req, res, next) => {
        res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
    };
}

export default shopController;
