import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

import { Product } from '../models/product';
import { PRODUCT_PIPES } from '../pipes/product-pipes';

import { ProductComponent } from './product';
import { FiltersFormComponent } from './filters-form';

@Component({
    selector: 'products-list',
    directives: [COMMON_DIRECTIVES, ProductComponent, FiltersFormComponent],
    pipes: [PRODUCT_PIPES],
    inputs: ['products'],
    templateUrl: 'built/app/templates/products-list.html'
})
export class ProductsListComponent {
    public products: Product[];
    public promotedVisible: Boolean = true;
    public phraseValue: String = '';
    public sortByNameOrder: Number = 0;
    public sortByPriceOrder: Number = 0;

    togglePromotedVisibility(promotedVisible) {
        this.promotedVisible = promotedVisible;
    }

    filterByPhrase(name) {
        this.phraseValue = name;
    }

    sortByPrice(sortByPriceOrder) {
        this.sortByPriceOrder = sortByPriceOrder;
    }

    sortByName(sortByNameOrder) {
        this.sortByNameOrder = sortByNameOrder;
    }
}
