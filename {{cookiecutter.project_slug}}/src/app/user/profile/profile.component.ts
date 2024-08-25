import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {ApiService} from '../../auth/api.service';
import {BrowserService} from '../../shared/services/browser.service';
import {UserProfile} from '../../shared/interfaces/auth.interface';
import {CommonService} from '../../shared/services/common.service';
import {ToasterType} from '../../shared/shared-enums';

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

  isShowProfileLoader = false;
  isShowPasswordLoader = false;
  profileForm: FormGroup = new FormGroup({
    'username': new FormControl(),
    'first_name': new FormControl(),
    'last_name': new FormControl(),
    'email': new FormControl()
  });

  userDetails = this.browser.getLocalStorageItem('user');
  profileData: UserProfile = {};

  ngOnInit() {
    if (this.userDetails) {
      this.profileData = JSON.parse(this.userDetails);
      this.profileForm.patchValue(this.profileData);
    }
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

  isPasswordFieldVisible(fieldId: string): boolean {
    return this.commonService.isPasswordVisible(fieldId);
  }

  togglePasswordVisibility(fieldId: string): void {
    this.commonService.togglePasswordField(fieldId);
  }
}
