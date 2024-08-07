import {Inject, Injectable, signal} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ToasterType} from '../shared-enums';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  authorizedViews: string[] = [];
  headerTitle = signal<string>('App');
  STATUS_500 = 'Unexpected Server Error';
  STATUS_0 = 'Server not available';

  constructor(@Inject(DOCUMENT) private document: Document, private toastrService: ToastrService) {
  }

  getErrorMessage(formGroup: FormGroup, formControlName: string, label: string): string {
    let formControl = formGroup.get(formControlName);
    let errors = formControl?.errors;
    if (errors != null) {
      if (errors['email']) {
        return 'Email is invalid.';
      } else if (errors['required']) {
        return `${label} is required.`;
      }
    }
    return '';
  }

  concatenateURL(url1: string, url2: string): string {
    if (url1.endsWith('/'))
      url1 = url1.slice(0, url1.length - 1);
    if (url2.startsWith('/'))
      url2 = url2.slice(1);
    const separator: string = '/';
    return url1 + separator + url2;
  }

  togglePasswordField(fieldId: string): void {
    const field = this.document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      if (field.type == 'text')
        field.type = 'password';
      else
        field.type = 'text';
    }
  }

  isPasswordVisible(fieldId: string): boolean {
    const field = this.document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      return field.type == 'text';
    }
    return false;
  }

  generateAPIErrorMessage(err: HttpErrorResponse): string {
    switch (err.status) {
      case 0:
        return this.STATUS_0;
      case 500:
        return this.STATUS_500;
      case 400:
        if (!err.error.success) {
          let msg = '';
          for (let key in err.error) {
            if (key != 'success')
              msg = err.error[key];
            break;
          }
          return msg;
        }
        return err.statusText;
      case 403:
        return 'Forbidden';
      default:
        return 'Unexpected error occurred.';
    }
  }

  showSnackbar(msg: string, type: string): void {
    let option = {positionClass: 'toast-bottom-center'};
    switch (type) {
      case ToasterType.ERROR:
        this.toastrService.error(msg, '', option);
        break;
      case ToasterType.INFO:
        this.toastrService.info(msg, '', option);
        break;
      case ToasterType.WARNING:
        this.toastrService.warning(msg, '', option);
        break;
      case ToasterType.SUCCESS:
        this.toastrService.success(msg, '', option);
        break;
    }
  }

  showNotification(msg: string, type: string, title: string): void {
    let option = {positionClass: 'toast-top-right'};
    switch (type) {
      case ToasterType.ERROR:
        this.toastrService.error(msg, title, option);
        break;
      case ToasterType.INFO:
        this.toastrService.info(msg, title, option);
        break;
      case ToasterType.WARNING:
        this.toastrService.warning(msg, title, option);
        break;
      case ToasterType.SUCCESS:
        this.toastrService.success(msg, title, option);
        break;
    }
  }
}
