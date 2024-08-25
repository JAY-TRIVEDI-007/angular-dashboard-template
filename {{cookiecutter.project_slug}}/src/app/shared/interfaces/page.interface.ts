import {FormFieldType, GridActionType} from '../shared-enums';

export interface SideMenuItem {
  name: string;
  link: string;
  svgPath: string;
}

export interface ConfirmDialogData {
  title: string;
}

export interface DialogFormField {
  name: string;
  type: FormFieldType;
  label: string;
  required?: boolean;
  defaultValue?: string | boolean;
}

export interface GridActionDialogData {
  title: string;
  gridAction: GridActionType;
  formFields: DialogFormField[];
  formValidators?: object[];
  formData?: object;
}

export interface GridActionDialogResponse {
  isGoodToProceed: boolean;
  data?: object;
}