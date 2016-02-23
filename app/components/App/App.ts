import { Component, View } from 'angular2/core';

import { ProductsListComponent } from './products-list';

import { Product } from './product-interface';

@Component({
    selector: 'my-app',
    directives: [ProductsListComponent],
    template: `
        <products-list
            [products]="products">
        </products-list>
    `
})
export default class App {
    private products: Product[] = [
        { name: 'iPhone 6s', price: 3000, promoted: true },
        { name: 'Sony Xperia Z2', price: 2500, promoted: true },
        { name: 'Microsoft Lumia 950', price: 1200, promoted: false  },
        { name: 'Samsung Galaxy S6', price: 1500, promoted: false  }
    ]
}
