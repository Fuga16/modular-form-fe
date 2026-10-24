/** Builds a react-hook-form `required` rule with a field-specific message. */
export function getRequiredRule(required: boolean | undefined, label: string) {
  return required !== false ? `${label} is required` : false
}
