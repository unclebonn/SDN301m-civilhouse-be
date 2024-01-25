import { RequestHandler } from 'express';
import { Product } from '~/models/product.model';

class AdminController {
    private static instance?: AdminController = undefined;

    private constructor() {}

    public static getInstance() {
        if (AdminController.instance === undefined) {
            AdminController.instance = new AdminController();
        }
        return AdminController.instance;
    }

    getAddProduct: RequestHandler = (_req, res, _next) => {
        res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
    };

    postAddProduct: RequestHandler = (req, res, _next) => {
        let title = req.body.title as string;
        let imageUrl = req.body.imageUrl as string;
        let price = req.body.price as number;
        let description = req.body.description as string;
        const product = new Product(title, imageUrl, description, price);
        product.save();
        res.redirect('/');
    };

    deleteProduct: RequestHandler = (req, res, _next) => {
        const id = req.params['prodId'];
        Product.delProd(id, () => {
            res.redirect('/admin/products');
        });
    };

    getProducts: RequestHandler = (req, res, _next) => {
        Product.fetchAll((prodList) => {
            res.render('admin/products', { prodList, pageTitle: 'Admin Products', path: '/admin/products' });
        });
    };

    editProduct: RequestHandler = (req, res, _next) => {};
}

export default AdminController.getInstance();
