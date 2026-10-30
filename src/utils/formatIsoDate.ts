export const formatIsoDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    [
      date.getUTCFullYear(),
      pad(date.getUTCMonth() + 1),
      pad(date.getUTCDate()),
    ].join('-') +
    ` ${pad(date.getUTCHours())}:${pad(
      date.getUTCMinutes(),
    )}:${pad(date.getUTCSeconds())}`
  );
};
