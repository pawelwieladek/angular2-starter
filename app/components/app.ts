import { Component, View } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { ProductsListComponent } from './products-list';
import { OrderFormComponent } from './order-form';

@Component({
    selector: 'workshop-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/templates/app.html'
})
@RouteConfig([
    { path: '/products', as: 'Products', component: ProductsListComponent, useAsDefault: true },
    { path: '/order', as: 'Order', component: OrderFormComponent }
])
export class AppComponent {}
