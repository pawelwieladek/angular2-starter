import { Component, View } from 'angular2/core';

import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products-service';

import { ProductsListComponent } from './products-list';
import { OrderFormComponent } from './order-form';

@Component({
    selector: 'my-app',
    directives: [ProductsListComponent, OrderFormComponent],
    template: `
        <order-form></order-form>
        <products-list [products]="products"></products-list>
    `
})
export class AppComponent {
    public products: Product[];

    constructor(products: ProductsService) {
        this.products = products.getProducts();
    }
}
