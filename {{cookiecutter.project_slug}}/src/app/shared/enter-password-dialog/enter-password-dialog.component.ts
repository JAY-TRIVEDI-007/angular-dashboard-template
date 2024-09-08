import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogData, EnterPasswordDialogResponse} from '../interfaces/page.interface';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {CommonService} from '../services/common.service';

@Component({
  selector: 'app-enter-password-dialog',
  standalone: true,
  imports: [MatDialogModule, NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './enter-password-dialog.component.html',
  styleUrl: './enter-password-dialog.component.scss'
})
export class EnterPasswordDialogComponent {
  form: FormGroup = new FormGroup({
    'password': new FormControl('', [Validators.required])
  });

  get password(): FormControl {
    return <FormControl<any>>this.form?.get('password');
  }

  constructor(public dialogRef: MatDialogRef<EnterPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData, private commonService: CommonService) {
  }

  onConfirm() {
    let response: EnterPasswordDialogResponse = {
      isGoodToProceed: !this.isAskPassword()
    };
    if (this.form.valid && this.isAskPassword()) {
      response.isGoodToProceed = true;
      response.data = this.password.value;
    }
    this.dialogRef.close(response);
  }

  onCancel() {
    let response: EnterPasswordDialogResponse = {
      isGoodToProceed: false
    };
    this.dialogRef.close(response);
  }

  isAskPassword(): boolean {
    return this.data.bool1 == true;
  }

  getErrorMessage(formControlName: string, label: string): string {
    return this.commonService.getErrorMessage(this.form, formControlName, label);
  }

  isFormControlHasError(formControlName: string): boolean {
    let control = this.form.get(formControlName);
    if (control) {
      return ((control.touched || control.dirty) && !control.valid);
    }
    return false;
  }

  isPasswordFieldVisible(fieldId: string): boolean {
    return this.commonService.isPasswordVisible(fieldId);
  }

  togglePasswordVisibility(fieldId: string): void {
    this.commonService.togglePasswordField(fieldId);
  }
}
