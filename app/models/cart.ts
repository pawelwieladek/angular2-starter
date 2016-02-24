import { Product } from './product';

export class Cart {
    constructor(public products: Map<string, Product> = new Map<string, Product>()) {}

    add(product: Product): Cart {
        this.products.set(product.name, product);
        return new Cart(new Map(Array.from(this.products.entries())));
    }

    remove(product: Product): Cart {
        this.products.delete(product.name);
        return new Cart(new Map(Array.from(this.products.entries())));
    }
}