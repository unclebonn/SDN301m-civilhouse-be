import { Product } from './product.model';

export class Cart {
    cartItem?: {
        product: Product;
        quantity: number;
    }[] = undefined;

    static instance?: Cart = undefined;

    private constructor() {
        this.cartItem = [];
    }

    public static getInstance() {
        if (Cart.instance) {
            Cart.instance = new Cart();
        }
        return Cart.instance;
    }
}
