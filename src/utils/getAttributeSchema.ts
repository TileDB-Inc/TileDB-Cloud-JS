import { V1API } from "../v1";

/**
 * Get attribute data from attribute name, attribute data contains the type of the attribute (e.g. INT32, StringUTF8 etc)
 */
 const getAttributeSchema = (
    attrName: string,
    attributesSchema: Array<V1API.Dimension | V1API.Attribute>
  ) => {
    return attributesSchema.find((attr) => attr.name === attrName);
  };

  export default getAttributeSchema;