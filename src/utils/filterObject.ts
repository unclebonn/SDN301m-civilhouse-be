type FilteredObject<T> = {
  [K in keyof T]: T[K];
};

const filterObject = <T>(
  obj: T,
  ...filterFields: Array<keyof T>
): FilteredObject<T> => {
  const newObj: Partial<FilteredObject<T>> = {};
  Object.keys(obj as object).forEach((el) => {
    const key = el as keyof T;
    if (filterFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj as FilteredObject<T>;
};

export default filterObject;
