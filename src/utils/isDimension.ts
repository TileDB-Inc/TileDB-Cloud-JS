import { Attribute, Dimension } from '../v1';

const isDimension = (data: Attribute | Dimension): data is Dimension => {
  return Object.prototype.hasOwnProperty.call(data, 'nullTileExtent');
};

export default isDimension;
