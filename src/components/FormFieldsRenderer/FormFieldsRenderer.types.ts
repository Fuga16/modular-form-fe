import type { ComponentType } from 'react';

export type BaseField = {
  name: string;
  label: string;
  required?: boolean;
};

export type InputField = BaseField & {
  type: 'input' | 'textarea';
  sanitize?: (value: string) => string;
  tooltip?: string;
  rules?: {
    pattern: RegExp;
    message: string;
  };
};

export type SelectField = BaseField & {
  type: 'select';
  options: {
    value: string;
    label: string;
  }[];
};

export type MultiSelectField = BaseField & {
  type: 'multiselect';
  tooltip?: string;
  options: {
    value: string;
    label: string;
  }[];
};

export type FieldConfig = InputField | SelectField | MultiSelectField;

export interface AdapterProps<T> {
  field: T;
  error?: string;
}

export type FieldAdapter<T extends FieldConfig = FieldConfig> = ComponentType<
  AdapterProps<T>
>;

export interface FormFieldsRendererProps {
  config: FieldConfig[];
}
