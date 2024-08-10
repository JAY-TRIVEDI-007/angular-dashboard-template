import {HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {BrowserService} from '../shared/services/browser.service';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {ToasterType} from '../shared/shared-enums';
import {CommonService} from '../shared/services/common.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const browser = inject(BrowserService);
  const commonService = inject(CommonService);
  const router = inject(Router);
  const token = browser.getLocalStorageItem('tkn');

  if (token) {
    let modifiedReq = req.clone({
      headers: new HttpHeaders({'Authorization': `Token ${token}`})
    });

    return next(modifiedReq).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res.status === 401) {
          browser.clearLocalStorage();
          router.navigate(['login']);
          return throwError(() => res.error);
        } else {
          return throwError(() => res.error);
        }
      })
    );
  }
  else {
    return next(req).pipe(
      catchError(err => {
        commonService.showSnackbar(commonService.generateAPIErrorMessage(err), ToasterType.ERROR);
        return throwError(() => err.error);
      })
    );
  }
};
