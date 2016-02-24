import { Component, View } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

@Component({
    selector: 'product',
    inputs: ['name', 'price', 'promoted'],
    directives: [COMMON_DIRECTIVES],
    templateUrl: 'app/templates/product.html'
})
export class ProductComponent {
    public name: string;
    public price: number;
    public promoted: boolean;
}
