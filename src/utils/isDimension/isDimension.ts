import { Attribute, Dimension, Enumeration } from '../../v3';

const isDimension = (
  data: Attribute | Dimension | Enumeration
): data is Dimension => {
  return 'nullTileExtent' in data;
};

export default isDimension;
