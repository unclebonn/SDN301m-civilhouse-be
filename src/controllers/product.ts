import { RequestHandler } from 'express';

const products: Product[] = [];

export default {
    getAddProduct: (_req, res, _next) => {
        res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
    },
    postAddProduct: (req, res, _next) => {
        products.push({ title: req.body.title });
        res.redirect('/');
    },
    getProducts: (_req, res, _next) => {
        const prodList = products;
        res.render('shop', { prodList, pageTitle: 'Shop', path: '/' });
    },
} as {
    [index: string]: RequestHandler;
};
