import { RequestHandler } from 'express';
import { Product } from '~/models/product.model';

class ShopController {
    private static instance?: ShopController = undefined;

    private constructor() {}

    public static getInstance() {
        if (ShopController.instance === undefined) {
            ShopController.instance = new ShopController();
        }
        return ShopController.instance;
    }

    getProducts: RequestHandler = (_req, res, _next) => {
        Product.fetchAll((prodList) => {
            res.render('shop/product-list', { prodList, pageTitle: 'All Products', path: '/products' });
        });
    };

    getProduct: RequestHandler = (req, res, next) => {
        const prodId = req.params.productId;
        Product.findById(prodId, (product) => {
            if (product) {
                res.render('shop/product-detail', { product, pageTitle: product.title, path: '/products' });
            } else {
                res.render('page-not-found');
            }
        });
    };

    getIndex: RequestHandler = (req, res, next) => {
        Product.fetchAll((prodList) => {
            res.render('shop/index', { prodList, pageTitle: 'Shop', path: '/' });
        });
    };

    getCart: RequestHandler = (req, res, next) => {
        res.render('shop/cart', { path: '/cart', pageTitle: 'Your Cart' });
    };

    postCart: RequestHandler = (req, res, next) => {
        const prodId = req.body.productId;
        console.log(prodId);
        res.redirect('/cart');
    };

    getOrders: RequestHandler = (req, res, next) => {
        res.render('shop/orders', { path: '/orders', pageTitle: 'Your Orders' });
    };

    getCheckout: RequestHandler = (req, res, next) => {
        res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
    };
}

export default ShopController.getInstance();
