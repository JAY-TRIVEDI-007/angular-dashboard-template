import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommonService} from '../shared/services/common.service';
import {Observable} from 'rxjs';
import {
  LoginAPIResponse,
  LoginFormInterface,
  UserInterface,
  SignUpFormInterface, UserProfile
} from '../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiDomain: string = environment.apiDomain;
  private apiPath: string = environment.apiPath;
  private apiUrl: string = this.commonService.concatenateURL(this.apiDomain, this.apiPath);

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  login(formData: LoginFormInterface): Observable<LoginAPIResponse> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/token/login/');
    return this.http.post<LoginAPIResponse>(url, formData);
  }

  logoutUser(): Observable<any> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/token/logout/');
    return this.http.post<any>(url, {});
  }

  signup(formData: SignUpFormInterface): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/');
    return this.http.post<UserInterface>(url, formData);
  }

  getUserDetails(): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/me');
    return this.http.get<UserInterface>(url);
  }
  getUsersList(): Observable<UserInterface[]> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/');
    return this.http.get<UserInterface[]>(url);
  }
  updateUserProfile(userProfile: UserProfile): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/me/');
    return this.http.patch<UserInterface>(url, userProfile);
  }
  deleteUser(id: number): Observable<any> {
    let url = this.commonService.concatenateURL(this.apiUrl, `auth/users/${id}/`);
    return this.http.delete<any>(url);
  }
}
