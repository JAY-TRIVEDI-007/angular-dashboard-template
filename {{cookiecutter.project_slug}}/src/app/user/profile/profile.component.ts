import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {ApiService} from '../../auth/api.service';
import {BrowserService} from '../../shared/services/browser.service';
import {SetPassword, UserProfile} from '../../shared/interfaces/auth.interface';
import {CommonService} from '../../shared/services/common.service';
import {ToasterType} from '../../shared/shared-enums';
import {confirmPasswordValidator} from '../../shared/confirmPasswordValidator';
import {catchError, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);
  private browser: BrowserService = inject(BrowserService);
  private commonService: CommonService = inject(CommonService);
  private _router: Router = inject(Router);

  isShowProfileLoader = false;
  isShowPasswordLoader = false;
  profileForm: FormGroup = new FormGroup({
    'username': new FormControl(),
    'first_name': new FormControl(),
    'last_name': new FormControl(),
    'email': new FormControl()
  });

  passwordChangeForm: FormGroup = new FormGroup({
    'current_password': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
    'confirmPassword': new FormControl('', [Validators.required]),
  }, {validators: [confirmPasswordValidator]});

  get current_password(): FormControl {
    return <FormControl<any>>this.passwordChangeForm?.get('current_password');
  }

  get password(): FormControl {
    return <FormControl<any>>this.passwordChangeForm?.get('password');
  }

  get confirmPassword(): FormControl {
    return <FormControl<any>>this.passwordChangeForm?.get('confirmPassword');
  }

  userDetails = this.browser.getLocalStorageItem('user');
  profileData: UserProfile = {};

  ngOnInit() {
    if (this.userDetails) {
      this.profileData = JSON.parse(this.userDetails);
      this.profileForm.patchValue(this.profileData);
    }

    // Password change form
    this.passwordChangeForm.valueChanges.subscribe((changes) => {
      // set password not match error.
      if (this.password.dirty && this.confirmPassword.dirty && this.passwordChangeForm.errors) {
        if (Object.keys(this.passwordChangeForm.errors).indexOf('confirmPassword') != -1)
          this.confirmPassword.setErrors({'confirmPassword': true}, {emitEvent: false});
      }
    });
  }

  onProfileUpdate(): void {
    this.isShowProfileLoader = true;

    if (this.profileForm.valid) {
      let formData = this.profileForm.value;
      let profileDetails: UserProfile = {};

      if (this.profileData.username != formData['username'])
        profileDetails['username'] = formData['username'];
      if (this.profileData.last_name != formData['last_name'])
        profileDetails['last_name'] = formData['last_name'];
      if (this.profileData.first_name != formData['first_name'])
        profileDetails['first_name'] = formData['first_name'];
      if (this.profileData.email != formData['email'])
        profileDetails['email'] = formData['email'];

      if (Object.keys(profileDetails).length > 0) {
        this.apiService.updateUserProfile(profileDetails).subscribe(record => {
          this.commonService.showSnackbar('Your profile successfully updated!', ToasterType.SUCCESS);
          this.browser.setLocalStorageItem('user', JSON.stringify(record));
          this.isShowProfileLoader = false;
        });
      } else {
        this.isShowProfileLoader = false;
        this.commonService.showSnackbar('Your profile is up to date.', ToasterType.WARNING);
      }
    } else {
      this.isShowProfileLoader = false;
    }
  }

  onPasswordChangeSubmit(): void {
    this.isShowPasswordLoader = true;

    if (this.passwordChangeForm.valid) {
      let formData = this.passwordChangeForm.value;
      let passwordResetData: SetPassword = {
        current_password: formData['current_password'],
        new_password: formData['password']
      };

      this.apiService.setUserPassword(passwordResetData)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.isShowPasswordLoader = false;
            return throwError(err.error);
          })
        )
        .subscribe(record => {
          this.commonService.showSnackbar("Your password changed successfully!", ToasterType.SUCCESS);
          this.isShowPasswordLoader = false;
          this.browser.clearLocalStorage();
          this._router.navigate(['/login']);
        });
    } else {
      this.isShowPasswordLoader = false;
    }
  }

  isPasswordFieldVisible(fieldId: string): boolean {
    return this.commonService.isPasswordVisible(fieldId);
  }

  togglePasswordVisibility(fieldId: string): void {
    this.commonService.togglePasswordField(fieldId);
  }

  isFormControlHasError(formControl: FormControl): boolean {
    return this.commonService.isFormControlHasError(formControl);
  }

  getFormErrorMessage(formControlName: string, label: string): string {
    return this.commonService.getErrorMessage(this.passwordChangeForm, formControlName, label);
  }
}
