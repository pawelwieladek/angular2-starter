///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from 'angular2/bootstrap';

import App from './components/app/app';
import { ProductRepository } from './components/app/products-repository';

bootstrap(App, [ProductRepository]);
