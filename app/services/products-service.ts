import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import "rxjs/add/operator/map";

import { Observable } from "rxjs/Observable";
import { Product } from "../models/product";

@Injectable()
export class ProductsService {
    constructor(private http: Http) {}

    public getProducts(): Observable<Product[]> {
        return this.http.get('data/products.json')
            .map(res => res.json())
            .map(data => data.map(Product.fromObject));
    }
}
