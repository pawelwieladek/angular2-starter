export class Product {
    constructor(public name: String, public price: Number, public promoted: Boolean) {}

    static fromObject({name, price, promoted}: {name: String, price: Number, promoted: Boolean}) {
        return new Product(name, price, promoted);
    }
}