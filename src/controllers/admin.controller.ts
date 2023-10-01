import { RequestHandler } from 'express';
import { Product } from '~/models/product.model';

namespace adminController {
    export const getAddProduct: RequestHandler = (_req, res, _next) => {
        res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
    };
    export const postAddProduct: RequestHandler = (req, res, _next) => {
        let title = req.body.title as string;
        let imageUrl = req.body.imageUrl as string;
        let price = req.body.price as number;
        let description = req.body.description as string;
        const product = new Product(title, imageUrl, description, price);
        product.save();
        res.redirect('/');
    };
    export const getProducts: RequestHandler = (req, res, next) => {
        Product.fetchAll((prodList) => {
            res.render('admin/products', { prodList, pageTitle: 'Admin Products', path: '/admin/products' });
        });
    };
}

export default adminController;
