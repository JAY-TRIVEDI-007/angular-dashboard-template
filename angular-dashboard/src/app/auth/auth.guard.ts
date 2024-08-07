import {CanActivateFn, Router} from '@angular/router';
import {BrowserService} from '../shared/services/browser.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const browser = inject(BrowserService);
  const router = inject(Router);
  const token = browser.getLocalStorage('tkn');
  const routeData = route.data;

  if (token) {
    let users = browser.getLocalStorage('user');
    if (routeData['isOnlyAdmin'] == true && users != null) {
      let userDetail = JSON.parse(users);
      return userDetail['is_superuser'];
    }
    return true;
  }
  else {
    browser.clearLocalStorage();
    router.navigate(['/login']);
    return false;
  }
};
