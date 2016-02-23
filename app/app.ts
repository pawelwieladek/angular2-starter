///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from 'angular2/bootstrap';

import { AppComponent } from './components/app';
import { ProductsService } from './services/products-service';

bootstrap(AppComponent, [ProductsService]);
