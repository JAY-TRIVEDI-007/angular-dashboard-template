import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonService} from '../shared/services/common.service';
import {ApiService} from '../auth/api.service';
import {SignUpFormInterface} from '../shared/interfaces/auth.interface';
import {NgClass, NgIf} from '@angular/common';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ToasterType} from '../shared/shared-enums';
import {confirmPasswordValidator} from '../shared/confirmPasswordValidator';

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
export class SignupComponent implements OnInit {
  private commonService: CommonService = inject(CommonService);
  private authService: ApiService = inject(ApiService);
  private router: Router = inject(Router);
  private preUsername: string = '';
  isShowLoader = false;

  get firstName(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('firstName');
  }

  get lastName(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('lastName');
  }

  get username(): FormControl {
    return <FormControl<any>>this.userSignUpForm?.get('username');
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
    'username': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required]),
    'confirmPassword': new FormControl('', [Validators.required])
  }, {validators: [confirmPasswordValidator]});

  ngOnInit(): void {
    this.userSignUpForm.valueChanges.subscribe(changes => {
      let firstName = changes['firstName'];
      let lastName = changes['lastName'];

      if (firstName && lastName && firstName.length > 0 && lastName.length > 0) {
        firstName = firstName.trim().toLowerCase();
        lastName = lastName.trim().toLowerCase();
        const username = `${firstName}.${lastName}`;

        if (username != this.preUsername) {
          this.preUsername = username;
          this.userSignUpForm.patchValue({'username': username}, {emitEvent: false});
        }
      }

      // set password not match error.
      if (this.password.dirty && this.confirmPassword.dirty && this.userSignUpForm.errors) {
        if (Object.keys(this.userSignUpForm.errors).indexOf('confirmPassword') != -1)
          this.confirmPassword.setErrors({'confirmPassword': true}, {emitEvent: false});
      }
    });
  }

  registerUser(): void {
    if (this.userSignUpForm.valid) {
      let userDetails: SignUpFormInterface = {
        'first_name': this.firstName.value,
        'last_name': this.lastName.value,
        'username': this.username.value,
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

  isFormControlHasError(formControl: FormControl): boolean {
    return ((formControl.touched || formControl.dirty) && !formControl.valid);
  }
}
