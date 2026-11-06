import type { ComponentType } from 'react';

import type { FieldValues, Path } from 'react-hook-form';

import type { DateRange } from '@/design-system/components/Calendar';

/** Fields shared by every field type. */
export type BaseField = {
  /** Label shown above the field. */
  label: string;
  /** Marks the field as required. Empty values fail validation. */
  required?: boolean;
};

type NamedField<TValues extends FieldValues> = BaseField & {
  name: Path<TValues>;
};

/** Single-line or multiline text field. */
export type InputField<TValues extends FieldValues = FieldValues> =
  NamedField<TValues> & {
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
> = NamedField<TValues> & {
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
  NamedField<TValues> & {
    type: 'multiselect';
    /** Tooltip text shown from the label icon. */
    tooltip?: string;
    /** Options to choose from. */
    options: {
      value: string;
      label: string;
    }[];
  };

/**
 * Date range field. Each bound is a separate form and URL key.
 * The picker receives `{ from, to }` built from the two keys.
 */
export type DateRangeField<TValues extends FieldValues = FieldValues> =
  BaseField & {
    type: 'daterange';
    /** Form and URL key of the start date. */
    from: Path<TValues>;
    /** Form and URL key of the end date. */
    to: Path<TValues>;
    tooltip?: string;
    min?: string;
    max?: string;
    placeholder?: string;
  };

/** Any field definition the renderer understands. */
export type FieldConfig<TValues extends FieldValues = FieldValues> =
  | InputField<TValues>
  | SelectField<TValues>
  | MultiSelectField<TValues>
  | DateRangeField<TValues>;

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

/** Re-exported so field configs can type the range value without another import. */
export type { DateRange };
