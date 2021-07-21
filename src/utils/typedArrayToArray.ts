const typedArrayToArray = <T>(typedArray: ArrayLike<T>) =>
  Array.from(typedArray);

export default typedArrayToArray;
