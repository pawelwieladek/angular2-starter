import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

import { Product } from '../models/product';
import { ProductsService } from '../services/products-service';
import { PRODUCT_PIPES } from '../pipes/product-pipes';

import { ProductComponent } from './product';
import { FiltersFormComponent } from './filters-form';

@Component({
    selector: 'products-list',
    directives: [COMMON_DIRECTIVES, ProductComponent, FiltersFormComponent],
    pipes: [PRODUCT_PIPES],
    templateUrl: 'app/templates/products-list.html'
})
export class ProductsListComponent {
    public products: Product[] = [];
    public promotedVisible: boolean = true;
    public phraseValue: string = '';
    public sortByNameOrder: number = 0;
    public sortByPriceOrder: number = 0;

    constructor(products: ProductsService) {
        products.getProducts().subscribe(
            products => this.products = products,
            error => { console.log('error', error) },
            () => { console.log('end') }
        );
    }

    togglePromotedVisibility(promotedVisible: boolean) {
        this.promotedVisible = promotedVisible;
    }

    filterByPhrase(name: string) {
        this.phraseValue = name;
    }

    sortByPrice(sortByPriceOrder: number) {
        this.sortByPriceOrder = sortByPriceOrder;
    }

    sortByName(sortByNameOrder: number) {
        this.sortByNameOrder = sortByNameOrder;
    }
}
