import {Inject, Injectable} from '@angular/core';
import {LOCALSTORAGE} from '../global-objects.injector';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(@Inject(LOCALSTORAGE) private _localStorage: Storage) {
  }

  setLocalStorage(key: string, value: string): void {
    // Set item in local storage
    this._localStorage.setItem(key, value);
  }

  getLocalStorage(key: string, value?: string, create: boolean = false): string | null {
    // create: true -> if not exits then create one.
    const item = this._localStorage.getItem(key);
    if (!item && value && create) {
      this.setLocalStorage(key, value);
      return value;
    }
    return item;
  }

  removeLocalStorage(key: string): void {
    // Remove item from local storage.
    this._localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    this._localStorage.clear();
  }
}
