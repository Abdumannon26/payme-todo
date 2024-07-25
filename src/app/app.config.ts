import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideToastr} from "ngx-toastr";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./core/interceptors/token.interceptor";
import {httpErrorInterceptor} from "./core/interceptors/http-error.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(withInterceptors([tokenInterceptor, httpErrorInterceptor])),
  ]
};
