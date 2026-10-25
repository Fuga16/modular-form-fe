import type { FormEvent } from 'react';

import { useSearchParams } from 'react-router-dom';

import { type FieldValues, useFormContext } from 'react-hook-form';

import { Button } from '../../design-system';
import { createSearchParamsFromForm } from '../../utils/createSearchParamsFromForm';
import { FormFieldsRenderer } from '../FormFieldsRenderer/FormFieldsRenderer';

import {
  CLEAR_BUTTON_LABEL,
  SEARCH_BUTTON_LABEL,
} from './FiltersBlock.constants';
import styles from './FiltersBlock.module.css';
import type { FiltersBlockProps } from './FiltersBlock.types';

/**
 * Filter panel rendered from a field config.
 *
 * Search validates the form and writes its values to the URL query string.
 * Clear empties the filter fields and removes only the query parameters that
 * belong to `config`, so unrelated parameters such as `page` or `sort` are kept.
 */
export function FiltersBlock<TValues extends FieldValues = FieldValues>({
  config,
}: FiltersBlockProps<TValues>) {
  const { handleSubmit, reset } = useFormContext<TValues>();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleApplyFilters = handleSubmit((data) => {
    setSearchParams(createSearchParamsFromForm(data, searchParams));
  });

  const handleClearFilters = () => {
    // Empty strings for every filter field, not the parent's defaults.
    const emptyValues = Object.fromEntries(
      config.map((field) => [field.name, '']),
    ) as TValues;
    reset(emptyValues);

    const nextParams = new URLSearchParams(searchParams);
    config.forEach((field) => nextParams.delete(field.name));
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <form
      className={styles.container}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        void handleApplyFilters(event);
      }}
      noValidate
    >
      <FormFieldsRenderer config={config} />

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={handleClearFilters}
        >
          {CLEAR_BUTTON_LABEL}
        </Button>

        <Button
          type="submit"
          variant="primary"
        >
          {SEARCH_BUTTON_LABEL}
        </Button>
      </div>
    </form>
  );
}
