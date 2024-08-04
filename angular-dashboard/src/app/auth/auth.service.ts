import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logoutUser(): void {
    // todo: clear cookies and localstorage
  }
}
