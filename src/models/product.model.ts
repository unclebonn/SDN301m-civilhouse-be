import fs from 'fs';
import path from 'path';
import utils from '~/utils/core';

const p = path.join(utils.mainDir, 'data', 'products.json');

const getProductFromFile = (cb: (proList: Product[]) => void) => {
    fs.readFile(p, { encoding: 'utf8' }, (err, data) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(data));
        }
    });
};

export class Product {
    id?: string;
    constructor(public title: string, public imageUrl: string, public description: string, public price: number) {}

    save() {
        this.id = Math.random().toString();
        getProductFromFile((products) => {
            let checkDuplicatedId = products.some((prod) => prod.id === this.id);
            while (checkDuplicatedId) {
                this.id = Math.random().toString();
                checkDuplicatedId = products.some((prod) => prod.id === this.id);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (_err) => {});
        });
    }

    static fetchAll(cb: (proList: Product[]) => void) {
        getProductFromFile(cb);
    }

    static findById(id: string, cb: (prod: Product | undefined, ...args: []) => void) {
        getProductFromFile((products) => {
            let product = products.find((p) => p.id === id);
            cb(product);
        });
    }

    static delProd(id: string, cb: () => void) {
        getProductFromFile((products) => {
            products = products.filter((product) => product.id !== id);
            fs.writeFile(p, JSON.stringify(products), (_err) => {
                cb();
            });
        });
    }
}
