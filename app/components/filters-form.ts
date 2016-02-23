import { Component, View, EventEmitter, Input } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

@Component({
    selector: 'filters-form',
    directives: [COMMON_DIRECTIVES],
    outputs: ['promotedVisibilityChange', 'phraseChange', 'sortByNameChange', 'sortByPriceChange'],
    template: `
      <div class="well">
        <div class="row">
          <div class="col-md-3">
            <button class="btn btn-primary btn-block" (click)="handlePromotedVisibilityChange()">Toggle promoted</button>
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control" (keyup)="handlePhraseChange($event)" placeholder="Filter..." [value]="phraseValue" />
          </div>
          <div class="col-md-2">
            <button class="btn btn-default btn-block" (click)="handleSortByNameChange()">
              Sort by name
              <span [ngSwitch]="sortByNameOrder">
                <template [ngSwitchWhen]="1"><span class="glyphicon glyphicon-arrow-down"></span></template>
                <template [ngSwitchWhen]="-1"><span class="glyphicon glyphicon-arrow-up"></span></template>
              </span>
            </button>
          </div>
          <div class="col-md-2" *ngIf="sortByNameOrder === 0">
            <button class="btn btn-default btn-block" (click)="handleSortByPriceChange()">
              Sort by price
              <span [ngSwitch]="sortByPriceOrder">
                <template [ngSwitchWhen]="1"><span class="glyphicon glyphicon-arrow-down"></span></template>
                <template [ngSwitchWhen]="-1"><span class="glyphicon glyphicon-arrow-up"></span></template>
              </span>
            </button>
          </div>
        </div>
      </div>
    `
})
export class FiltersFormComponent {
    public promotedVisibilityChange: EventEmitter = new EventEmitter();
    public phraseChange: EventEmitter = new EventEmitter();
    public sortByNameChange: EventEmitter = new EventEmitter();
    public sortByPriceChange: EventEmitter = new EventEmitter();
    @Input() promotedVisible: Boolean;
    @Input() phraseValue: String;
    @Input() sortByNameOrder: Number;
    @Input() sortByPriceOrder: Number;

    static getNextOrderState(currentOrder) {
        if (currentOrder === 0) {
            return 1;
        } else if (currentOrder === 1) {
            return -1;
        } else if (currentOrder === -1) {
            return 0;
        }
    }

    handlePromotedVisibilityChange() {
        this.promotedVisible = !this.promotedVisible;
        this.promotedVisibilityChange.emit(this.promotedVisible);
    }

    handlePhraseChange(event) {
        this.phraseChange.emit(event.target.value);
    }

    handleSortByNameChange() {
        this.sortByNameOrder = FiltersFormComponent.getNextOrderState(this.sortByNameOrder);
        this.sortByNameChange.emit(this.sortByNameOrder);
    }

    handleSortByPriceChange() {
        this.sortByPriceOrder = FiltersFormComponent.getNextOrderState(this.sortByPriceOrder);
        this.sortByPriceChange.emit(this.sortByPriceOrder);
    }
}
