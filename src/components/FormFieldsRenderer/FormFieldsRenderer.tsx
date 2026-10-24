import { componentMap } from './componentMap'
import type { FormFieldsRendererProps } from './FormFieldsRenderer.types'

export function FormFieldsRenderer({ config }: FormFieldsRendererProps) {
  return (
    <>
      {config.map((field) => {
        const Adapter = componentMap[field.type]

        return <Adapter key={field.name} field={field as never} />
      })}
    </>
  )
}
