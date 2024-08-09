import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommonService} from '../shared/services/common.service';
import {Observable} from 'rxjs';
import {
  LoginAPIResponse,
  LoginFormInterface,
  UserInterface,
  SignUpFormInterface
} from '../shared/interfaces/auth.interface';
import {BrowserService} from '../shared/services/browser.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiDomain: string = environment.apiDomain;
  private apiPath: string = environment.apiPath;
  private apiUrl: string = this.commonService.concatenateURL(this.apiDomain, this.apiPath);
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private commonService: CommonService, private browserService: BrowserService) { }

  login(formData: LoginFormInterface): Observable<LoginAPIResponse> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/token/login/');
    return this.http.post<LoginAPIResponse>(url, formData, {headers: this.headers});
  }

  logoutUser(): Observable<any> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/token/logout/');
    return this.http.post<any>(url, {});
  }

  signup(formData: SignUpFormInterface): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/');
    return this.http.post<UserInterface>(url, formData, {headers: this.headers});
  }

  getUserDetails(): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/me');
    return this.http.get<UserInterface>(url);
  }
}
