import { Attribute, Dimension } from '../v1';
import isDimension from './isDimension';

const isAttributeNullable = (attribute: Attribute | Dimension) => {
  if (isDimension(attribute)) {
    return false;
  }
  return attribute.nullable;
};

export default isAttributeNullable;
