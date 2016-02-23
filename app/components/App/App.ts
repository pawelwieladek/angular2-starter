import { Component, View } from 'angular2/core';

import { ProductsListComponent } from './products-list';
import { Product } from './product-interface';
import { ProductRepository } from './products-repository';

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
    public products: Product[];

    constructor(products: ProductRepository) {
        this.products = products.getProducts();
    }
}
