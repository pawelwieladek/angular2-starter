import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { Product } from "../interfaces/product";

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(products: Array<Product>, args: [String, Boolean]) {
        let [ propertyKey, enabled ] = args;
        return enabled ? products.filter(product => !product[propertyKey]) : products;
    }
}