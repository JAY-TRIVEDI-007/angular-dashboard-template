import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonService} from '../shared/services/common.service';
import {NgClass, NgIf} from '@angular/common';
import {LoginFormInterface} from '../shared/interfaces/auth.interface';
import {AuthService} from '../auth/auth.service';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToasterType} from '../shared/shared-enums';

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
  private authService: AuthService = inject(AuthService);
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
            this.commonService.showSnackbar(this.commonService.generateAPIErrorMessage(err), ToasterType.ERROR);
            this.isShowLoader = false;
            return throwError(() => err.error);
          })
        )
        .subscribe(res => {
          console.log('res', res);
          this.isShowLoader = false;
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
