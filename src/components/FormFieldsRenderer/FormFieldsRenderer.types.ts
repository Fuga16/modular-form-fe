import type { ComponentType } from 'react';

import type { FieldValues, Path } from 'react-hook-form';

/** Fields shared by every field type. */
export type BaseField<TValues extends FieldValues = FieldValues> = {
  /** Key of the form value. Must be a path of `TValues`. */
  name: Path<TValues>;
  /** Label shown above the field. */
  label: string;
  /** Marks the field as required in the UI. */
  required?: boolean;
};

/** Single-line or multiline text field. */
export type InputField<TValues extends FieldValues = FieldValues> =
  BaseField<TValues> & {
    type: 'input' | 'textarea';
    /** Transforms the value before it is stored in the form. */
    sanitize?: (value: string) => string;
    /** Tooltip text shown from the label icon. */
    tooltip?: string;
    /** Pattern the value must match, with the message shown on failure. */
    rules?: {
      pattern: RegExp;
      message: string;
    };
    /** Placeholder text shown when the field is empty. */
    placeholder?: string;
  };

/** Single-choice dropdown. `TValue` is the union of option values. */
export type SelectField<
  TValues extends FieldValues = FieldValues,
  TValue extends string = string,
> = BaseField<TValues> & {
  type: 'select';
  /** Options to choose from. */
  options: readonly {
    value: TValue;
    label: string;
  }[];
  /** Value selected initially. Must be one of `options[].value`. */
  defaultValue: NoInfer<TValue>;
};

/** Multiple-choice field. */
export type MultiSelectField<TValues extends FieldValues = FieldValues> =
  BaseField<TValues> & {
    type: 'multiselect';
    /** Tooltip text shown from the label icon. */
    tooltip?: string;
    /** Options to choose from. */
    options: {
      value: string;
      label: string;
    }[];
  };

/** Any field definition the renderer understands. */
export type FieldConfig<TValues extends FieldValues = FieldValues> =
  InputField<TValues> | SelectField<TValues> | MultiSelectField<TValues>;

/** Props passed to a field adapter. */
export interface AdapterProps<T> {
  /** Field definition to render. */
  field: T;
  /** Error message for the field, if any. */
  error?: string;
}

/** Component that renders one field type. */
export type FieldAdapter<T extends FieldConfig = FieldConfig> = ComponentType<
  AdapterProps<T>
>;

/** Props for the FormFieldsRenderer component. */
export interface FormFieldsRendererProps<
  TValues extends FieldValues = FieldValues,
> {
  /** Field definitions to render, in order. */
  config: FieldConfig<TValues>[];
}
