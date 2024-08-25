import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideToastr} from 'ngx-toastr';
import {authInterceptor} from './auth/auth.interceptor';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  MatTooltipDefaultOptions
} from '@angular/material/tooltip';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';

export const matTooltipDefaultOptions: MatTooltipDefaultOptions = MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY();
matTooltipDefaultOptions.touchGestures = 'off';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimationsAsync(),
    provideToastr({
      maxOpened: 5,
      autoDismiss: false
    }), provideAnimationsAsync('noop'),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: matTooltipDefaultOptions },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} },
    { provide: MAT_DIALOG_DATA, useValue: {}}
  ]
};
