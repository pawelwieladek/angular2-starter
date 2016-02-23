import { Injectable } from 'angular2/core';

import { Product } from '../interfaces/product';

@Injectable()
export class ProductsService {
    public getProducts(): Product[] {
        return [
            { name: 'iPhone 6s', price: 3000, promoted: true },
            { name: 'Sony Xperia Z2', price: 2500, promoted: true },
            { name: 'Microsoft Lumia 950', price: 1200, promoted: false },
            { name: 'Samsung Galaxy S6', price: 1500, promoted: false }
        ]
    }
}
