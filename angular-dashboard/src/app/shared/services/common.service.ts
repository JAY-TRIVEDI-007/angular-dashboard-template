import {Inject, Injectable, signal} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  authorizedViews: string[] = [];
  headerTitle = signal<string>('App');

  constructor(@Inject(DOCUMENT) private document: Document) {
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

  public togglePasswordField(fieldId: string): void {
    const field = this.document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      if (field.type == 'text')
        field.type = 'password';
      else
        field.type = 'text';
    }
  }

  public isPasswordVisible(fieldId: string): boolean {
    const field = this.document.getElementById(fieldId) as HTMLInputElement;
    if (field) {
      return field.type == 'text';
    }
    return false;
  }
}
