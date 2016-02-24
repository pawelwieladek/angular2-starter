import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { Product } from "../models/product";

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
    transform(products: Array<Product>, args: [string, number, boolean]) {
        let [ propertyKey, sortOrder, enabled ] = args;
        enabled = enabled || true;
        return enabled || sortOrder === 0 ? Array.from(products).sort(this.compare(propertyKey, sortOrder)) : products;
    }

    compare(propertyKey: string, sortOrder: number) {
        return function(p1, p2) {
            if (typeof p1[propertyKey] === 'string' && typeof p2[propertyKey] === 'string') {
                return sortOrder * p1[propertyKey].localeCompare(p2[propertyKey]);
            } else {
                if (p1[propertyKey] > p2[propertyKey]) return sortOrder;
                if (p1[propertyKey] < p2[propertyKey]) return -1 * sortOrder;
                return 0;
            }
        }
    }
}