import {CanActivateFn, Router} from '@angular/router';
import {BrowserService} from '../shared/services/browser.service';
import {inject} from '@angular/core';
import {CommonService} from '../shared/services/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  const browser = inject(BrowserService);
  const router = inject(Router);
  const commonService = inject(CommonService);
  const token = browser.getLocalStorageItem('tkn');
  const routeData = route.data;

  // set page title
  commonService.updatePageTitle(routeData['title']);

  if (token) {
    let userDetails = browser.getUserDetails();
    if (routeData['isOnlyAdmin'] == true && userDetails != null) {
      return userDetails['is_staff'];
    }
    return true;
  }
  else {
    browser.clearLocalStorage();
    router.navigate(['/login']);
    return false;
  }
};
