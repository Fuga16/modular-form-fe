import type { FormFieldsRendererProps } from './FormFieldsRenderer.types';
import { componentMap } from './componentMap';

export function FormFieldsRenderer({ config }: FormFieldsRendererProps) {
  return (
    <>
      {config.map((field) => {
        const Adapter = componentMap[field.type];

        return (
          <Adapter
            key={field.name}
            field={field as never}
          />
        );
      })}
    </>
  );
}
