import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonService} from '../shared/services/common.service';
import {ApiService} from '../auth/api.service';
import {SignUpFormInterface} from '../shared/interfaces/auth.interface';
import {NgClass, NgIf} from '@angular/common';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToasterType} from '../shared/shared-enums';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private commonService: CommonService = inject(CommonService);
  private authService: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  isShowLoader = false;

  get firstName(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('firstName');
  }

  get lastName(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('lastName');
  }

  get email(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('email');
  }

  get password(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('password');
  }

  get confirmPassword(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('confirmPassword');
  }

  userSignUpForm: FormGroup = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'lastName': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
    'confirmPassword': new FormControl('', [Validators.required])
  });

  registerUser(): void {
    if (this.userSignUpForm.valid) {
      let userDetails: SignUpFormInterface = {
        'first_name': this.firstName.value,
        'last_name': this.lastName.value,
        'email': this.email.value,
        'password': this.password.value
      }

      this.authService.signup(userDetails)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.isShowLoader = false;
            return throwError(err.error);
          })
        )
        .subscribe(res => {
          this.commonService.showSnackbar('You are registered successfully. Please login', ToasterType.SUCCESS);
          this.isShowLoader = false;
          this.router.navigateByUrl('/login');
        });
    }
  }

  getErrorMessage(formControlName: string, label: string): string {
    return this.commonService.getErrorMessage(this.userSignUpForm, formControlName, label);
  }

  isPasswordFieldVisible(fieldId: string): boolean {
    return this.commonService.isPasswordVisible(fieldId);
  }

  togglePasswordVisibility(fieldId: string): void {
    this.commonService.togglePasswordField(fieldId);
  }
}
