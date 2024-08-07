import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonService} from '../shared/services/common.service';
import {NgClass, NgIf} from '@angular/common';
import {LoginAPIResponse, LoginFormInterface} from '../shared/interfaces/auth.interface';
import {ApiService} from '../auth/api.service';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {BrowserService} from '../shared/services/browser.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private commonService: CommonService = inject(CommonService);
  private authService: ApiService = inject(ApiService);
  private browser: BrowserService = inject(BrowserService);
  private router: Router = inject(Router);

  isShowLoader = false;

  get email(): FormControl {
    return <FormControl<any>>this.userLoginForm?.get('email');
  }

  get password(): FormControl {
    return <FormControl<any>>this.userLoginForm?.get('password');
  }

  userLoginForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  });

  loginUser(): void {
    if (this.userLoginForm.valid) {
      let userLogin: LoginFormInterface = {
        'email': this.email.value,
        'password': this.password.value,
      }
      this.isShowLoader = true;
      this.authService.login(userLogin)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.isShowLoader = false;
            return throwError(() => err.error);
          })
        )
        .subscribe((res: LoginAPIResponse) => {
          this.browser.setLocalStorage('tkn', res.auth_token);
          this.isShowLoader = false;
          this.router.navigate(['']);
        });
    }
  }

  getErrorMessage(formControlName: string, label: string): string {
    return this.commonService.getErrorMessage(this.userLoginForm, formControlName, label);
  }

  isPasswordFieldVisible(fieldId: string): boolean {
    return this.commonService.isPasswordVisible(fieldId);
  }

  togglePasswordVisibility(fieldId: string): void {
    this.commonService.togglePasswordField(fieldId);
  }
}
