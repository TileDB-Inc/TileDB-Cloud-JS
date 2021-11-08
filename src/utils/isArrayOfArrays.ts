const isArrayOfArrays = (data: any): data is Array<Array<any>> => {
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return true;
  }
  return false;
};

export default isArrayOfArrays;
