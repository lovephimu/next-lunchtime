export const parseIntCheck = (input: string) => {
  const integer = parseInt(input, 10);

  return isNaN(integer) ? null : integer;
};
