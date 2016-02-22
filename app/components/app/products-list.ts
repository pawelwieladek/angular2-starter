import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';

import { ProductComponent } from './product';

@Pipe({ name: 'disablePromoted' })
class DisablePromotedPipe implements PipeTransform {
  transform(products: Array<{promoted: Boolean}>, args: [Boolean]) {
    let [ promotedDisabled ] = args;
    if (promotedDisabled) {
      return products.filter(product => !product.promoted);
    } else {
      return products;
    }
  }
}

@Component({
  selector: 'products-list',
  directives: [ProductComponent, COMMON_DIRECTIVES],
  inputs: ['products'],
  pipes: [DisablePromotedPipe],
  template: `
    <div>
      <div class="well">
        <button class="btn btn-primary" (click)="togglePromoted(!promotedDisabled)">Toggle promoted</button>
      </div>
      <div class="list-group">
        <product
            *ngFor="#product of (products | disablePromoted:promotedDisabled)"
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
  public products: Array<Object>;

  private promotedDisabled: Boolean = false;

  togglePromoted(promotedDisabled) {
    this.promotedDisabled = promotedDisabled;
  }
}
