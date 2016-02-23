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
    template: `
    <div>
      <filters-form
        [promotedVisible]="promotedVisible"
        [phraseValue]="phraseValue"
        [sortByPriceOrder]="sortByPriceOrder"
        [sortByNameOrder]="sortByNameOrder"
        (promotedVisibilityChange)="togglePromotedVisibility($event)"
        (phraseChange)="filterByPhrase($event)"
        (sortByNameChange)="sortByName($event)"
        (sortByPriceChange)="sortByPrice($event)">
      </filters-form>
      <div class="list-group">
        <product
            *ngFor="#product of products | filter:'promoted':!promotedVisible | phrase:'name':phraseValue | sort:'name':sortByNameOrder | sort:'price':sortByPriceOrder:sortByNameOrder === 0"
            [ngClass]="{ 'list-group-item': true, 'list-group-item-success': product.promoted }"
            [name]="product.name"
            [price]="product.price"
            [promoted]="product.promoted">
        </product>
      </div>
    </div>
  `
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
