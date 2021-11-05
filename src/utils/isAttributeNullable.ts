import { Attribute, Dimension } from "../v1";
import isDimension from "./isDimension";

const isAttributeNullable = (attribute: Attribute | Dimension) => {
  if (isDimension(attribute)) {
    return false;
  }
  // TODO: How do i know if attribute is nullable?
  return true;
};

export default isAttributeNullable;
