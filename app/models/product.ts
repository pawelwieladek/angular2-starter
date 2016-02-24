export class Product {
    constructor(public name: string, public price: number, public promoted: boolean) {}

    static fromObject({name, price, promoted}: {name: string, price: number, promoted: boolean}) {
        return new Product(name, price, promoted);
    }
}