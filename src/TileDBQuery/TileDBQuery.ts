import dataToQuery, { QueryData } from "../utils/dataToQuery";
import getAttributeResult, { bufferToInt8 } from "../utils/bufferToData";
import capnpQueryDeSerializer from "../utils/capnpQueryDeSerializer";
import { ArrayApi, Attribute, Dimension } from "../v1";
import {
  AttributeBufferHeader,
  Configuration,
  ConfigurationParameters,
  QueryApi,
  Querytype,
} from "../v2";
import getByteLengthOfDatatype from "../utils/getByteLengthOfDatatype";
import flatten from "../utils/flatten";

export class TileDBQuery {
  configurationParams: ConfigurationParameters;

  constructor(params: ConfigurationParameters) {
    this.configurationParams = params;
  }

  async SubmitQuery(namespace: string, arrayName: string, body: QueryData) {
    const config = new Configuration(this.configurationParams);
    const baseV1 = config.basePath?.replace("v2", "v1");
    // Add versioning if basePath exists
    const configV1 = new Configuration({
      ...this.configurationParams,
      // Override basePath v2 for v1 to make calls to get ArraySchema (from v1 API)
      ...(baseV1 ? { basePath: baseV1 } : {}),
    });
    const queryAPI = new QueryApi(config);
    const arrayAPI = new ArrayApi(configV1);
    try {
      const arraySchemaResponse = await arrayAPI.getArray(
        namespace,
        arrayName,
        "application/json"
      );
      const arraySchema = arraySchemaResponse.data;
      arraySchema.domain;
      const queryResponse = await queryAPI.submitQuery(
        namespace,
        arrayName,
        Querytype.Read,
        "application/capnp",
        dataToQuery(
          body,
          arraySchema.attributes,
          arraySchema.domain.dimensions
        ),
        undefined,
        undefined,
        undefined,
        {
          headers: {
            "Content-Type": "application/capnp",
          },
          responseType: "arraybuffer",
        }
      );

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

    let result: any = getAttributeResult(
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

      let offsets = [];
      if (isVarLengthSized) {
        const BYTE_PER_ELEMENT = getByteLengthOfDatatype(
          selectedAttributeSchema.type
        );
        const startOfBuffer = negativeOffset - totalNumberOfBytesOfAttribute;
        const offsetsBuffer = arrayBuffer.slice(
          startOfBuffer,
          startOfBuffer + attribute.fixedLenBufferSizeInBytes
        );
        const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));

        offsets = byteOffsets.map((o) => Number(o) / BYTE_PER_ELEMENT);
      }

      result = setNullables(
        Array.from(result as Int32Array),
        nullablesArray,
        offsets
      );
    }

    data[attribute.name] = Array.isArray(result) ? flatten(result) : result;

    return offset + totalNumberOfBytesOfAttribute;
  }, 0);

  return data;
};

/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
export const setNullables = <T>(vals: T[], nullables: number[], offsets: number[]) => {
  const valueArray = offsets.length ? setOffsets(vals, offsets) : vals;
  return valueArray.map((val, i) => (nullables[i] ? val : null));
};

/**
 * Group values together according to offsets
 * @param vals [1, 2, 3, 4]
 * @param offsets e.g. [0, 3, 4]
 * @returns [[1,2,3], 4]
 */
export const setOffsets = (vals: any[], offsets: number[]) => {
  let arrWithOffsets = [];
  const valueArray = vals;
  if (offsets.length) {
    offsets.forEach((offset, i) => {
      const offsetDiffWithNext = offsets[i + 1] - offset;
      if (offsetDiffWithNext) {
        arrWithOffsets.push(valueArray.slice(0, offsetDiffWithNext));
        valueArray.splice(0, offsetDiffWithNext);
      } else {
        arrWithOffsets.push(valueArray);
      }
    });
  }

  return arrWithOffsets;
};

const getAttributeSchema = (
  attrName: string,
  attributesSchema: Array<Dimension | Attribute>
) => {
  return attributesSchema.find((attr) => attr.name === attrName);
};
