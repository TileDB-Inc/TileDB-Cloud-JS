function convertToArray(arrayLike: any): any[] {
  if (Array.isArray(arrayLike)) {
    return arrayLike;
  }

  return Array.from(arrayLike);
}

export default convertToArray;
