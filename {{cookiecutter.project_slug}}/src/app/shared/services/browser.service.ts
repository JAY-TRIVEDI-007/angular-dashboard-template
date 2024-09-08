import {Inject, Injectable} from '@angular/core';
import {LOCALSTORAGE} from '../global-objects.injector';
import {CurrentUserInterface} from '../interfaces/auth.interface';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(@Inject(LOCALSTORAGE) private _localStorage: Storage, @Inject(DOCUMENT) private _document: Document) {
  }

  setLocalStorageItem(key: string, value: string): void {
    // Set item in local storage
    this._localStorage.setItem(key, value);
  }

  getLocalStorageItem(key: string, value?: string, create: boolean = false): string | null {
    // create: true -> if not exits then create one.
    const item = this._localStorage.getItem(key);
    if (!item && value && create) {
      this.setLocalStorageItem(key, value);
      return value;
    }
    return item;
  }

  removeLocalStorageItem(key: string): void {
    // Remove item from local storage.
    this._localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    this._localStorage.clear();
  }

  getUserDetails(): CurrentUserInterface | null {
    let user = this.getLocalStorageItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getUserName(): string {
    let userDetails = this.getUserDetails();
    if (userDetails?.username) {
      return userDetails.username;
    }
    else if (userDetails?.first_name) {
      return userDetails.first_name + (userDetails.last_name ? ' ' + userDetails.last_name : '');
    }
    else {
      return 'unknown';
    }
  }
}
