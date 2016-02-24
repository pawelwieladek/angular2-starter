import { Component, View, Pipe, PipeTransform } from 'angular2/core';
import { Product } from "../models/product";

@Pipe({ name: 'phrase' })
export class PhrasePipe implements PipeTransform {
    transform(products: Array<Product>, args: [string, string]) {
        let [ propertyKey, filterPhrase ] = args;
        return products.filter(product => {
            return product[propertyKey].toLocaleLowerCase().indexOf(filterPhrase.toLocaleLowerCase()) > -1;
        })
    }
}