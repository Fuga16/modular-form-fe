import { useSearchParams } from 'react-router-dom';

import { useFormContext } from 'react-hook-form';

import { FormFieldsRenderer } from '../FormFieldsRenderer/FormFieldsRenderer';

import {
  CLEAR_BUTTON_LABEL,
  SEARCH_BUTTON_LABEL,
} from './FiltersBlock.constants';
import { ActionsBlock, Container } from './FiltersBlock.styles';
import type { FiltersBlockProps } from './FiltersBlock.types';
import { Button } from '@/design-system';
import { createSearchParamsFromForm } from '@/utils/createSearchParamsFromForm';

export function FiltersBlock({ config }: FiltersBlockProps) {
  const { handleSubmit, reset } = useFormContext<Record<string, string>>();

  const [, setSearchParams] = useSearchParams();

  const handleApplyFilters = handleSubmit((data) => {
    setSearchParams(createSearchParamsFromForm(data));
  });

  const handleClearFilters = () => {
    reset();
    setSearchParams({}, { replace: true });
  };

  return (
    <Container
      onSubmit={handleApplyFilters}
      noValidate
    >
      <FormFieldsRenderer config={config} />

      <ActionsBlock>
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
      </ActionsBlock>
    </Container>
  );
}
