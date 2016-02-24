import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { Product } from "../models/product";

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(products: Array<Product>, args: [string, boolean]) {
        let [ propertyKey, enabled ] = args;
        return enabled ? products.filter(product => !product[propertyKey]) : products;
    }
}