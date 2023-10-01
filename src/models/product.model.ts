import fs from 'fs';
import path from 'path';
import rootDir from '~/utils/path';

const p = path.join(rootDir, 'data', 'products.json');

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
    constructor(public title: string, public imageUrl: string, public description: string, public price: number) {}

    save() {
        getProductFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (_err) => {});
        });
    }

    static fetchAll(cb: (proList: Product[]) => void) {
        getProductFromFile(cb);
    }
}
