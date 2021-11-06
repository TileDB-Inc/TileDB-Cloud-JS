const convertToArray = (arrayLike: ArrayLike<any>): Array<any> => {
  if (Array.isArray(arrayLike)) {
    return arrayLike;
  }

  return Array.from(arrayLike);
};

export default convertToArray;
