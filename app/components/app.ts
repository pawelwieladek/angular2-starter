import { Component, View } from 'angular2/core';

import { Product } from '../models/product';
import { ProductsService } from '../services/products-service';

import { ProductsListComponent } from './products-list';
import { OrderFormComponent } from './order-form';

@Component({
    selector: 'my-app',
    directives: [ProductsListComponent, OrderFormComponent],
    templateUrl: 'built/app/templates/app.html'
})
export class AppComponent {
    public products: Product[] = [];

    constructor(products: ProductsService) {
        products.getProducts().subscribe(
            products => this.products = products,
            error => { console.log('error', error) },
            () => { console.log('end') }
        );
    }
}
