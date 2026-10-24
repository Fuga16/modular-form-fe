export interface SelectOption {
  value: string;
  label: string;
}

export const mapToOptions = (arr: string[]): SelectOption[] => {
  return arr.map((value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));
};
