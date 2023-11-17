import { Enumeration } from '../../v1';
import { Attribute, Dimension } from '../../v2';

const isDimension = (
  data: Attribute | Dimension | Enumeration
): data is Dimension => {
  return Object.prototype.hasOwnProperty.call(data, 'nullTileExtent');
};

export default isDimension;
