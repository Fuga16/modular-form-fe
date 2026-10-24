export const getNextSortOrder = (
  current: 'asc' | 'desc' | null,
  clicked: 'asc' | 'desc',
): 'asc' | 'desc' | null => {
  if (current === clicked) {
    return null;
  }

  return clicked;
};
