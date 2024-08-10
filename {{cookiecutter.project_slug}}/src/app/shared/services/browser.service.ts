import {Inject, Injectable} from '@angular/core';
import {LOCALSTORAGE} from '../global-objects.injector';
import {UserInterface} from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(@Inject(LOCALSTORAGE) private _localStorage: Storage) {
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

  getUserDetails(): UserInterface | null {
    let user = this.getLocalStorageItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}
