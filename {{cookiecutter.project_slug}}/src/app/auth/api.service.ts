import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommonService} from '../shared/services/common.service';
import {Observable} from 'rxjs';
import {
  LoginAPIResponse,
  LoginFormInterface,
  CurrentUserInterface,
  SignUpFormInterface, UserProfile, UserInterface, CreateUserInterface, SetPassword
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

  signup(formData: SignUpFormInterface): Observable<CurrentUserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/');
    return this.http.post<CurrentUserInterface>(url, formData);
  }

  getUserDetails(): Observable<CurrentUserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/me');
    return this.http.get<CurrentUserInterface>(url);
  }

  updateUserProfile(userProfile: UserProfile): Observable<CurrentUserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/me/');
    return this.http.patch<CurrentUserInterface>(url, userProfile);
  }

  getUsersList(): Observable<UserInterface[]> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/');
    return this.http.get<UserInterface[]>(url);
  }
  createUser(userDetails: CreateUserInterface): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/');
    return this.http.post<UserInterface>(url, userDetails);
  }
  editUser(id: number, data: UserInterface): Observable<UserInterface> {
    let url = this.commonService.concatenateURL(this.apiUrl, `auth/users/${id}/`);
    return this.http.put<UserInterface>(url, data);
  }
  deleteUser(password: string, id: number): Observable<any> {
    let url = this.commonService.concatenateURL(this.apiUrl, `auth/users/${id}/`);
    let data = {
      'current_password': password
    };
    return this.http.delete<any>(url, {body: data});
  }
  setUserPassword(data: SetPassword): Observable<any> {
    let url = this.commonService.concatenateURL(this.apiUrl, 'auth/users/set_password/');
    return this.http.post<any>(url, data);
  }
}
