import { Attribute, Dimension, Datatype, Enumeration } from '../../v3';
import isDimension from '../isDimension';

const isAttributeVarLength = (
  attribute: Attribute | Dimension | Enumeration
) => {
  if (isDimension(attribute)) {
    // Only StringAscii is var-length dimension
    return attribute.type === Datatype.StringAscii;
  }

  // Attribute has a different name for cell_val_num
  return attribute.cellValNum === 4294967295;
};

export default isAttributeVarLength;
