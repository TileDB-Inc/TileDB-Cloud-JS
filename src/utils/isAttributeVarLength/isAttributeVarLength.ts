import { Attribute, Dimension, Datatype } from '../../v2';
import isDimension from '../isDimension';

const isAttributeVarLength = (attribute: Attribute | Dimension) => {
  if (isDimension(attribute)) {
    // Only StringAscii is var-length dimension
    return attribute.type === Datatype.StringAscii;
  }
  // eslint-disable-next-line eqeqeq
  return attribute.cellValNum == 4294967295;
};

export default isAttributeVarLength;
