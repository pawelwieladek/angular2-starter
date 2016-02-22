import { Component, View } from 'angular2/core';
import {COMMON_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'product',
  inputs: ['name', 'price', 'promoted'],
  directives: [COMMON_DIRECTIVES],
  template: `
    <div class="row">
      <div class="col-md-4">
        <strong>
          {{ name }}
        </strong>
      </div>
      <div class="col-md-4">
        {{ price }} PLN
      </div>
      <div *ngIf="promoted" class="col-md-4 text-right">
        <div class="label label-success">Promoted</div>
      </div>
    </div>
  `
})
export class ProductComponent {
  public name:String;
  public price:Number;
  public promoted:Boolean;
}
