import { Attribute, Dimension } from "../v2";
/**
 * Get attribute data from attribute name, attribute data contains the type of the attribute (e.g. INT32, StringUTF8 etc)
 */
declare const getAttributeSchema: (attrName: string, attributesSchema: Array<Dimension | Attribute>) => Attribute | Dimension;
export default getAttributeSchema;
