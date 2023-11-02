import { Range } from '../../TileDBQuery';

const checkRangeOutOfBounds = (
  range: Range | Range[],
  bounds: number[]
): boolean => {
  const [lowerBound, highBound] = bounds;
  const rangeNumbers = range.flat();

  return rangeNumbers.every((r: number) => r >= lowerBound && r <= highBound);
};

export default checkRangeOutOfBounds;
