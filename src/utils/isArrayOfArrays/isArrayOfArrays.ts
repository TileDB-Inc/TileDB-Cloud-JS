const isArrayOfArrays = (data: unknown): data is Array<Array<unknown>> => {
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return true;
  }
  return false;
};

export default isArrayOfArrays;
