import { Component, View, EventEmitter, Input, Output } from 'angular2/core';
import { COMMON_DIRECTIVES, Control } from 'angular2/common';

@Component({
    selector: 'filters-form',
    directives: [COMMON_DIRECTIVES],
    templateUrl: 'app/templates/filters-form.html'
})
export class FiltersFormComponent {
    @Input() public promotedVisible: boolean;
    @Input() public phraseValue: string;
    @Input() public sortByNameOrder: number;
    @Input() public sortByPriceOrder: number;
    @Output() public promotedVisibilityChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public phraseChange: EventEmitter<string> = new EventEmitter();
    @Output() public sortByNameChange: EventEmitter<number> = new EventEmitter();
    @Output() public sortByPriceChange: EventEmitter<number> = new EventEmitter();

    static getNextOrderState(currentOrder: number) {
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
