import { Injectable, EventEmitter } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable()
export class CartService {
    private cart: Cart = new Cart();
    private cartEmitter: EventEmitter<Cart> = new EventEmitter();

    public getCurrentCart(): Cart {
        return this.cart;
    }

    public getCart(): Observable<Cart> {
        return this.cartEmitter;
    }

    public add(product: Product): void {
        this.cart = this.cart.add(product);
        this.cartEmitter.emit(this.cart);
    }

    public remove(product: Product): void {
        this.cart = this.cart.remove(product);
        this.cartEmitter.emit(this.cart);
    }
}
