import dataToQuery, { QueryData } from '../utils/dataToQuery';
import getAttributeResult, { bufferToInt8 } from '../utils/bufferToData';
import capnpQueryDeSerializer from "../utils/capnpQueryDeSerializer";
import { ArrayApi, Attribute, Dimension } from "../v1";
import {
  AttributeBufferHeader,
  Configuration,
  ConfigurationParameters,
  QueryApi,
  Querytype,
} from "../v2";

export class TileDBQuery {
  configurationParams: ConfigurationParameters;

  constructor(params: ConfigurationParameters) {
    this.configurationParams = params;
  }

  async SubmitQuery(
    namespace: string,
    arrayName: string,
    body: QueryData
  ) {
    const config = new Configuration(this.configurationParams);
    const baseV1 = config.basePath?.replace("v2", "v1");
    // Add versioning if basePath exists
    const configV1 = new Configuration({
      ...this.configurationParams,
      // Override basePath v2 for v1 to make calls to get ArraySchema (from v1 API)
      ...(baseV1 ? { basePath: baseV1} : {}),
    });
    const queryAPI = new QueryApi(config);
    const arrayAPI = new ArrayApi(configV1);
    try {
      const arraySchemaResponse = await  arrayAPI.getArray(namespace, arrayName, "application/json");
      const arraySchema = arraySchemaResponse.data;
      arraySchema.domain
      const queryResponse = await queryAPI.submitQuery(
        namespace,
        arrayName,
        Querytype.Read,
        "application/capnp",
        dataToQuery(body, arraySchema.attributes, arraySchema.domain.dimensions),
        undefined,
        undefined,
        undefined,
        {
          headers: {
            "Content-Type": "application/capnp",
          },
          responseType: "arraybuffer",
        }
      )
      
      const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);
      const bufferWithoutFirstEightBytes = queryData.slice(8);

      const queryObject = capnpQueryDeSerializer(bufferWithoutFirstEightBytes);
      const attributeHeaders = queryObject.attributeBufferHeaders;
      const numberOfBytesOfResults =
        getSizeInBytesOfAllAttributes(attributeHeaders);
      const resultsBuffer = bufferWithoutFirstEightBytes.slice(
        -1 * numberOfBytesOfResults
      );
      const mergeAttributesAndDimensions = [
        ...arraySchema.domain.dimensions,
        ...arraySchema.attributes,
      ];

      const results = getResults(
        resultsBuffer,
        attributeHeaders,
        mergeAttributesAndDimensions
      );

      return results;
    } catch (e) {
      throw e;
    }
  }
}

export default TileDBQuery;

function convertToArrayBufferIfNodeBuffer(buffer: any): ArrayBuffer {
  if (buffer.buffer) {
    return new Uint8Array(buffer).buffer;
  }

  return buffer;
}

const getAttributeSizeInBytes = (attr: AttributeBufferHeader) => {
  return (
    attr.fixedLenBufferSizeInBytes +
    attr.varLenBufferSizeInBytes +
    attr.validityLenBufferSizeInBytes
  );
};

const getSizeInBytesOfAllAttributes = (attributes: AttributeBufferHeader[]) =>
  attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);

export const getResults = (
  arrayBuffer: ArrayBuffer,
  attributes: AttributeBufferHeader[],
  attributesSchema: Array<Dimension | Attribute>
) => {
  const data = {};

  attributes.reverse().reduce((offset, attribute) => {
    const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);
    const isNullable = !!attribute.validityLenBufferSizeInBytes;
    const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
    const selectedAttributeSchema = getAttributeSchema(
      attribute.name,
      attributesSchema
    );

    const negativeOffset = -1 * offset;
    const start =
      negativeOffset -
      totalNumberOfBytesOfAttribute +
      (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
    const ending =
      negativeOffset -
      (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
    const end = ending ? ending : undefined;

    let result = getAttributeResult(
      arrayBuffer.slice(start, end),
      selectedAttributeSchema.type
    );

    if (isNullable) {
      const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
      const nullableArrayBuffer = arrayBuffer.slice(
        ending,
        nullableArrayEnd ? nullableArrayEnd : undefined
      );
      const nullablesTypedArray = bufferToInt8(nullableArrayBuffer);
      const nullablesArray = Array.from(nullablesTypedArray);

      result = setNullables(
        Array.from(result as Int32Array),
        nullablesArray
      ) as any;
    }

    data[attribute.name] = result;

    return offset + totalNumberOfBytesOfAttribute;
  }, 0);

  return data;
};

const setNullables = <T>(vals: T[], nullables: number[]) => {
  return vals.map((val, i) => (nullables[i] ? val : null));
};

const getAttributeSchema = (
  attrName: string,
  attributesSchema: Array<Dimension | Attribute>
) => {
  return attributesSchema.find((attr) => attr.name === attrName);
};
