import { Component, View } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { CartService } from '../services/cart-service';

import { ProductComponent } from './product';

@Component({
    selector: 'cart',
    directives: [COMMON_DIRECTIVES, ProductComponent],
    templateUrl: 'app/templates/cart.html'
})
export class CartComponent {
    public cart: Cart = new Cart();

    constructor(cartService: CartService) {
        this.cart = cartService.getCurrentCart();
        cartService.getCart().subscribe(
            cart => this.cart = cart,
            error => { console.log('error', error) }
        );
    }

    get products(): Product[] {
        return Array.from(this.cart.products.values());
    }
}
