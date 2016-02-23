import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { Product } from "../interfaces/product";

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
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