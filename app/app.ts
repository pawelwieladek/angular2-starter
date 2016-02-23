///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from 'angular2/bootstrap';
import { FORM_PROVIDERS } from 'angular2/common';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppComponent } from './components/app';
import { ProductsService } from './services/products-service';

bootstrap(<any>AppComponent, [ProductsService, FORM_PROVIDERS, HTTP_PROVIDERS]);
