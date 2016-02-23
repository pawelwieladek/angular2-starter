import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

import { ProductComponent } from './product';
import { Product } from "./product-interface";

@Pipe({ name: 'disablePromoted' })
class DisablePromotedPipe implements PipeTransform {
  transform(products: Array<Product>, args: [Boolean]) {
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
        <div class="row">
          <div class="col-md-3">
            <button class="btn btn-primary btn-block" (click)="togglePromoted(!promotedDisabled)">Toggle promoted</button>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" [ngFormControl]="nameFilterInput" placeholder="Filter..." />
          </div>
          <div class="col-md-2">
            <button class="btn btn-default btn-block" (click)="sortPrice()">
              Sort by price
              <span [ngSwitch]="priceSortFilter">
                <template [ngSwitchWhen]="1"><span class="glyphicon glyphicon-arrow-down"></span></template>
                <template [ngSwitchWhen]="-1"><span class="glyphicon glyphicon-arrow-up"></span></template>
              </span>
            </button>
          </div>
          <div class="col-md-2">
            <button class="btn btn-default btn-block" (click)="sortName()">
              Sort by name
              <span [ngSwitch]="nameSortFilter">
                <template [ngSwitchWhen]="1"><span class="glyphicon glyphicon-arrow-down"></span></template>
                <template [ngSwitchWhen]="-1"><span class="glyphicon glyphicon-arrow-up"></span></template>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="list-group">
        <product
            *ngFor="#product of (filteredProducts | disablePromoted:promotedDisabled)"
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
  public _products: Product[];
  public filteredProducts: Product[];
  public nameFilterInput = new Control();
  public promotedDisabled: Boolean = false;
  public nameFilter: String = '';
  public nameSortFilter: Number = 0;
  public priceSortFilter: Number = 0;

  constructor() {
    this.nameFilterInput.valueChanges.subscribe(name => {
      this.nameFilter = name;
      this.filterProducts();
    });
  }

  set products(value) {
    this._products = value;
    this.filterProducts();
  }

  filterProducts() {
    let filteredProducts = this._products.filter(product => {
      return product.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1;
    });
    if (this.nameSortFilter !== 0) {
      filteredProducts = filteredProducts.sort((p1, p2) => {
        if (p1.name.toLowerCase() > p2.name.toLowerCase()) return 1;
        if (p1.name.toLowerCase() < p2.name.toLowerCase()) return -1;
        return 0;
      });
      if (this.nameSortFilter === -1) {
        filteredProducts.reverse();
      }
    } else if (this.priceSortFilter !== 0) {
      filteredProducts = filteredProducts.sort((p1, p2) => {
        if (p1.price > p2.price) return 1;
        if (p1.price < p2.price) return -1;
        return 0;
      });
      if (this.priceSortFilter === -1) {
        filteredProducts.reverse();
      }
    }
    this.filteredProducts = filteredProducts;
  }

  togglePromoted(promotedDisabled) {
    this.promotedDisabled = promotedDisabled;
  }

  nameFilterInputChange(name) {
    this.nameFilter = name;
  }

  sortPrice() {
    if (this.priceSortFilter === 0) {
      this.priceSortFilter = 1;
    } else if (this.priceSortFilter === 1) {
      this.priceSortFilter = -1;
    } else if (this.priceSortFilter === -1) {
      this.priceSortFilter = 0;
    }
    this.filterProducts();
  }

  sortName() {
    if (this.nameSortFilter === 0) {
      this.nameSortFilter = 1;
    } else if (this.nameSortFilter === 1) {
      this.nameSortFilter = -1;
    } else if (this.nameSortFilter === -1) {
      this.nameSortFilter = 0;
    }
    this.filterProducts();
  }
}
