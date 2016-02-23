import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

import { Product } from '../interfaces/product';
import { PRODUCT_PIPES } from '../pipes/product-pipes';

import { ProductComponent } from './product';

@Component({
  selector: 'products-list',
  directives: [ProductComponent, COMMON_DIRECTIVES],
  pipes: [PRODUCT_PIPES],
  inputs: ['products'],
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
