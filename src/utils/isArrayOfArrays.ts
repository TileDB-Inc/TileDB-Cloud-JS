const isArrayOfArrays = (data: any) => {
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return true;
  }
  return false;
};

export default isArrayOfArrays;
