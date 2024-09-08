import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {GridActionDialogData, GridActionDialogResponse} from '../interfaces/page.interface';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {CommonService} from '../services/common.service';
import {FormFieldType} from '../shared-enums';


@Component({
  selector: 'app-grid-action-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './grid-action-dialog.component.html',
  styleUrl: './grid-action-dialog.component.scss'
})
export class GridActionDialogComponent implements OnInit {
  actionBtnTitle: string = '';
  form: FormGroup = new FormGroup({});
  protected readonly FormFieldType = FormFieldType;

  constructor(public dialogRef: MatDialogRef<GridActionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GridActionDialogData, private commonService: CommonService) {
  }

  ngOnInit() {
    this.actionBtnTitle = this.data.gridAction;

    this.data.formFields.forEach(field => {
      let control = new FormControl(field.defaultValue);
      if (field.required)
        control.addValidators([Validators.required]);
      if (field.disabled == true)
        control.disable();
      this.form.addControl(field.name, control);
    });

    if (this.data.formValidators) {
      this.form.addValidators(this.data.formValidators as ValidatorFn[]);
      this.form.valueChanges.subscribe(changes => {
        if (this.form.errors) {
          Object.keys(this.form.errors).forEach(field => {
            const control = this.form.get(field);
            if (control) {
              let err = {[field]: true};
              control.setErrors(err, {emitEvent: false});
            }
          });
        }
      });
    }

    if (this.data.formData)
      this.form.patchValue(this.data.formData);
  }

  onSave() {
    let res: GridActionDialogResponse = {
      isGoodToProceed: false,
    };
    if (this.form.valid && this.form.dirty) {
      res.isGoodToProceed = true;
      res.data = this.form.value;
    }
    this.dialogRef.close(res);
  }

  onCancel() {
    let res: GridActionDialogResponse = {
      isGoodToProceed: false
    };
    this.dialogRef.close(res);
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
