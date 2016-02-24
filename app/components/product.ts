import { Component, Input } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { Product } from '../models/product';
import { CartService } from '../services/cart-service';

@Component({
    selector: 'product',
    directives: [COMMON_DIRECTIVES],
    templateUrl: 'app/templates/product.html'
})
export class ProductComponent {
    @Input() public product: Product;
    @Input() public promotedEnabled: boolean = true;
    @Input() public addToCartEnabled: boolean = true;
    @Input() public removeFromCartEnabled: boolean = true;

    constructor(private cartService: CartService) {}

    get promotedVisible() {
        return this.promotedEnabled && this.product.promoted;
    }

    addToCart() {
        this.cartService.add(this.product);
    }

    removeFromCart() {
        this.cartService.remove(this.product);
    }
}
