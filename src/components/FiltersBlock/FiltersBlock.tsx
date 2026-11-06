import { useSearchParams } from 'react-router-dom';

import { type FieldValues, useFormContext } from 'react-hook-form';

import { FormFieldsRenderer } from '../FormFieldsRenderer/FormFieldsRenderer';

import {
  CLEAR_BUTTON_LABEL,
  SEARCH_BUTTON_LABEL,
} from './FiltersBlock.constants';
import styles from './FiltersBlock.module.css';
import type { FiltersBlockProps } from './FiltersBlock.types';
import { Button } from '@/design-system';
import { createSearchParamsFromForm } from '@/utils/createSearchParamsFromForm';
import { getFieldKeys } from '@/utils/fieldUrl';

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
    const keys = config.flatMap((field) => getFieldKeys(field));

    const emptyValues = Object.fromEntries(
      keys.map((key) => [key, '']),
    ) as TValues;
    reset(emptyValues);

    const nextParams = new URLSearchParams(searchParams);
    keys.forEach((key) => nextParams.delete(key));
    setSearchParams(nextParams, { replace: true });
  };
  return (
    <form
      className={styles.container}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
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
