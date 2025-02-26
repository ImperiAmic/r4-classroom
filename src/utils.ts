export const generateId = <Type extends { id: number }>(
  values: Type[]
): number => {
  if (values.length === 0) {
    return 1;
  }

  const newId =
    values.reduce((maxId, value) => (value.id > maxId ? value.id : maxId), 0) +
    1;

  return newId;
};
