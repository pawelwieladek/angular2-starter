import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

import { ProductComponent } from './product';
import { Product } from "./product-interface";

@Pipe({ name: 'filter' })
class FilterPipe implements PipeTransform {
  transform(products: Array<Product>, args: [String, Boolean]) {
    let [ propertyKey, enabled ] = args;
    return enabled ? products.filter(product => !product[propertyKey]) : products;
  }
}

@Pipe({ name: 'phrase' })
class PhrasePipe implements PipeTransform {
  transform(products: Array<Product>, args: [String, String]) {
    let [ propertyKey, filterPhrase ] = args;
    return products.filter(product => {
      return product[propertyKey].toLocaleLowerCase().indexOf(filterPhrase.toLocaleLowerCase()) > -1;
    })
  }
}

@Pipe({ name: 'sort' })
class SortPipe implements PipeTransform {
  transform(products: Array<Product>, args: [String, Number, Boolean]) {
    let [ propertyKey, sortOrder, enabled ] = args;
    enabled = enabled || true;
    return enabled || sortOrder === 0 ? Array.from(products).sort(this.compare(propertyKey, sortOrder)) : products;
  }

  compare(propertyKey, sortOrder) {
    return function(p1, p2) {
      if (typeof p1[propertyKey] === 'string' && typeof p2[propertyKey] === 'string') {
        return sortOrder * p1[propertyKey].localeCompare(p2[propertyKey]);
      } else {
        if (p1[propertyKey] > p2[propertyKey]) return 1 * sortOrder;
        if (p1[propertyKey] < p2[propertyKey]) return -1 * sortOrder;
        return 0;
      }
    }
  }
}

@Component({
  selector: 'products-list',
  directives: [ProductComponent, COMMON_DIRECTIVES],
  inputs: ['products'],
  pipes: [FilterPipe, PhrasePipe, SortPipe],
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
            <button class="btn btn-default btn-block" (click)="sortName()">
              Sort by name
              <span [ngSwitch]="nameSortValue">
                <template [ngSwitchWhen]="1"><span class="glyphicon glyphicon-arrow-down"></span></template>
                <template [ngSwitchWhen]="-1"><span class="glyphicon glyphicon-arrow-up"></span></template>
              </span>
            </button>
          </div>
          <div class="col-md-2" *ngIf="nameSortValue === 0">
            <button class="btn btn-default btn-block" (click)="sortPrice()">
              Sort by price
              <span [ngSwitch]="priceSortValue">
                <template [ngSwitchWhen]="1"><span class="glyphicon glyphicon-arrow-down"></span></template>
                <template [ngSwitchWhen]="-1"><span class="glyphicon glyphicon-arrow-up"></span></template>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="list-group">
        <product
            *ngFor="#product of products | filter:'promoted':promotedDisabled | phrase:'name':phraseValue | sort:'name':nameSortValue | sort:'price':priceSortValue:nameSortValue === 0"
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
  public nameFilterInput = new Control();
  public promotedDisabled: Boolean = false;
  public phraseValue: String = '';
  public nameSortValue: Number = 0;
  public priceSortValue: Number = 0;

  constructor() {
    this.nameFilterInput.valueChanges.subscribe(value => {
      this.phraseValue = value;
    });
  }

  togglePromoted(promotedDisabled) {
    this.promotedDisabled = promotedDisabled;
  }

  nameFilterInputChange(name) {
    this.phraseValue = name;
  }

  sortPrice() {
    if (this.priceSortValue === 0) {
      this.priceSortValue = 1;
    } else if (this.priceSortValue === 1) {
      this.priceSortValue = -1;
    } else if (this.priceSortValue === -1) {
      this.priceSortValue = 0;
    }
  }

  sortName() {
    if (this.nameSortValue === 0) {
      this.nameSortValue = 1;
    } else if (this.nameSortValue === 1) {
      this.nameSortValue = -1;
    } else if (this.nameSortValue === -1) {
      this.nameSortValue = 0;
    }
  }
}
