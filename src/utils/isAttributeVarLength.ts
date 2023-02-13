import { V1API } from "../v1";
import { Datatype } from "../v2";
import isDimension from "./isDimension";

const isAttributeVarLength = (attribute: V1API.Attribute | V1API.Dimension) => {
  if (isDimension(attribute)) {
    // Only StringAscii is var-length dimension
    return attribute.type === Datatype.StringAscii;
  }
  return attribute.cellValNum == 4294967295;
};

export default isAttributeVarLength;
