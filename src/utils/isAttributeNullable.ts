import { V1API } from "../v1";
import isDimension from "./isDimension";

const isAttributeNullable = (attribute: V1API.Attribute | V1API.Dimension) => {
  if (isDimension(attribute)) {
    return false;
  }
  return attribute.nullable;
};

export default isAttributeNullable;
