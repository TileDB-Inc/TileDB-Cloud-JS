import { QueryData } from '../../TileDBQuery';
import { Dimension } from '../../v2';

const emptyRangesToDomain = (
  ranges: QueryData['ranges'],
  dimensions: Dimension[]
) => {
  return ranges.map((range, i) => {
    const isEmpty = !range.length;
    const domain = dimensions[i].domain;
    if (!isEmpty) {
      return range;
    }

    // If there is a Domain for the dimension we return the dimension's domain as range
    if (domain) {
      const [firstValue] = Object.values(domain);
      return firstValue;
    }

    return range;
  });
};

export default emptyRangesToDomain;
