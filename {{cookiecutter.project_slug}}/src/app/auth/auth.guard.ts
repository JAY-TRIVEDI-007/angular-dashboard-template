import {CanActivateFn, Router} from '@angular/router';
import {BrowserService} from '../shared/services/browser.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const browser = inject(BrowserService);
  const router = inject(Router);
  const token = browser.getLocalStorageItem('tkn');
  const routeData = route.data;

  if (token) {
    let userDetails = browser.getUserDetails();
    if (routeData['isOnlyAdmin'] == true && userDetails != null) {
      return userDetails['is_superuser'];
    }
    return true;
  }
  else {
    browser.clearLocalStorage();
    router.navigate(['/login']);
    return false;
  }
};
