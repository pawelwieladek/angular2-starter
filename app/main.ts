import { bootstrap } from 'angular2/bootstrap';
import { FORM_PROVIDERS } from 'angular2/common';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';

import { AppComponent } from './components/app';
import { CUSTOM_SERVICES } from './services/custom-services';

bootstrap(<any>AppComponent, [FORM_PROVIDERS, HTTP_PROVIDERS, ROUTER_PROVIDERS, CUSTOM_SERVICES]);
