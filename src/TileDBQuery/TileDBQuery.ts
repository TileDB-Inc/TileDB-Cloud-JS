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
import { QueryWrite } from "../utils/dataToQueryWriter";
import getWriterBody from "../utils/getWriterBody";

export class TileDBQuery {
  configurationParams: ConfigurationParameters;

  constructor(params: ConfigurationParameters) {
    this.configurationParams = params;
  }

  async WriteQuery(namespace: string, arrayName: string, data: QueryWrite) {
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
      const body = getWriterBody(data, arraySchema);
      

      const queryResponse = await queryAPI.submitQuery(
        namespace,
        arrayName,
        Querytype.Write,
        "application/capnp",
        body as any,
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

      /**
       * Axios in nodeJS environments casts the response to a Buffer object
       * we convert it back to an ArrayBuffer if needed
       */
      const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);

      return queryData;


    } catch (e) {
      /**
       * Since we set the responseType to "arrayBuffer", in case the
       * response error message is a buffer, we deserialize the message before throwing
       */
      const errorIsABuffer =
        e?.response?.data?.buffer || e?.response?.data?.length;
      if (errorIsABuffer) {
        const errorArrayBuffer = convertToArrayBufferIfNodeBuffer(
          e.response.data
        );
        const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
        throw new Error(decodedMessage);
      } else {
        throw e;
      }
    }
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
      // Get ArraySchema of arrray, to get type information of the dimensions and the attributes
      const arraySchemaResponse = await arrayAPI.getArray(
        namespace,
        arrayName,
        "application/json"
      );
      const arraySchema = arraySchemaResponse.data;
      /**
       * Get the query response in capnp, we set responseType to arraybuffer instead of JSON
       * in order to deserialize the query capnp object.
       */
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

      /**
       * Axios in nodeJS environments casts the response to a Buffer object
       * we convert it back to an ArrayBuffer if needed
       */
      const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);
      /**
       * First 8 bytes of the response, contain a Uint64 number
       * which is the size of the response we skip it.
       */
      const bufferWithoutFirstEightBytes = queryData.slice(8);

      /**
       * Deserialize buffer to a Query object
       */
      const queryObject = capnpQueryDeSerializer(bufferWithoutFirstEightBytes);
      
      const attributeHeaders = queryObject.attributeBufferHeaders;
      /**
       * Calculate the size of bytes of the attributes from the attributeBufferHeaders of the Query object.
       */
      const numberOfBytesOfResults =
        getSizeInBytesOfAllAttributes(attributeHeaders);
      /**
       * We get the last N bytes (N is the number of total bytes of the attributes), which contain
       * the results of all the attributes
       */
      const resultsBuffer = bufferWithoutFirstEightBytes.slice(
        -1 * numberOfBytesOfResults
      );
      const mergeAttributesAndDimensions = [
        ...arraySchema.domain.dimensions,
        ...arraySchema.attributes,
      ];
      // Calculate results
      const results = getResults(
        resultsBuffer,
        attributeHeaders,
        mergeAttributesAndDimensions
      );

      return results;
    } catch (e) {
      /**
       * Since we set the responseType to "arrayBuffer", in case the
       * response error message is a buffer, we deserialize the message before throwing
       */
      const errorIsABuffer =
        e?.response?.data?.buffer || e?.response?.data?.length;
      if (errorIsABuffer) {
        const errorArrayBuffer = convertToArrayBufferIfNodeBuffer(
          e.response.data
        );
        const decodedMessage = new TextDecoder().decode(errorArrayBuffer);
        throw new Error(decodedMessage);
      } else {
        throw e;
      }
    }
  }
}

export default TileDBQuery;

/**
 * If buffer is a NodeJS Buffer object we convert it back to an ArrayBuffer
 * @param buffer ArrayBuffer or Nodejs Buffer
 * @returns ArrayBuffer
 */
function convertToArrayBufferIfNodeBuffer(buffer: any): ArrayBuffer {
  if (buffer.buffer) {
    return new Uint8Array(buffer).buffer;
  }

  return buffer;
}

/**
 * Add all buffers of an attribute
 * @param attr AttributeBufferHeader
 * @returns number of the total bytes of the attribute
 */
const getAttributeSizeInBytes = (attr: AttributeBufferHeader) => {
  return (
    attr.fixedLenBufferSizeInBytes +
    attr.varLenBufferSizeInBytes +
    attr.validityLenBufferSizeInBytes
  );
};
/**
 * Calculate the total bytes of all the attributes
 * @param attributes
 * @returns number of the total bytes of all the attributes
 */
const getSizeInBytesOfAllAttributes = (attributes: AttributeBufferHeader[]) =>
  attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);

/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export const getResults = (
  arrayBuffer: ArrayBuffer,
  attributes: AttributeBufferHeader[],
  attributesSchema: Array<Dimension | Attribute>
) => {
  const data = {};
  /**
   * We start from the last attribute which is at the end of the buffer
   */
  attributes.reverse().reduce((offset, attribute) => {
    const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);

    if (!totalNumberOfBytesOfAttribute) {
      data[attribute.name] = null;

      return offset;
    }
    // If there are validityLenBufferSizeInBytes the attribute is nullable
    const isNullable = !!attribute.validityLenBufferSizeInBytes;
    // If there are varLenBufferSizeInBytes the attribute is varLengthSized
    const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
    const selectedAttributeSchema = getAttributeSchema(
      attribute.name,
      attributesSchema
    );

    const negativeOffset = -1 * offset;
    /**
     * If attribute is varLengthSized, we ignore the first N bytes (where N = fixedLenBufferSizeInBytes)
     * These first N bytes contain the offsets of the attribute, which is a uint64 array.
     */
    const start =
      negativeOffset -
      totalNumberOfBytesOfAttribute +
      (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
    /**
     * If attribute is isNullable we ignore the last N bytes (where N = validityLenBufferSizeInBytes)
     * These last N bytes contain a uint8 array of zeros and ones, where every zero represents
     * that in that index the attribute is null.
     */
    const ending =
      negativeOffset -
      (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
    const end = ending ? ending : undefined;

    let result: any = getAttributeResult(
      arrayBuffer.slice(start, end),
      selectedAttributeSchema.type
    );

    if (isNullable) {
      /**
       * If attribute is Nullable, we get the last N bytes, cast it to uint8 array to get
       * what is null.
       */
      const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
      const nullableArrayBuffer = arrayBuffer.slice(
        ending,
        nullableArrayEnd ? nullableArrayEnd : undefined
      );
      const nullablesTypedArray = bufferToInt8(nullableArrayBuffer);
      /**
       * nullablesArray should be an array of zeros and ones (e.g. [0, 1, 1, 0])
       * Every zero represents that in that specific index the attribute is NULL
       */
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
        /**
         * Offsets are Uint64 numbers, buffer contains byte offsets though,
         * e.g. if type of the attribute is an INT32 (4 bytes per number) and the offsets are [0, 3, 4]
         * the buffer contains the offsets * bytes of the element instead of just the offsets [0, 3 * 4, 4 * 4] = [0, 12, 16]
         */
        const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
        // Convert byte offsets to offsets
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
export const setNullables = <T>(
  vals: T[],
  nullables: number[],
  offsets: number[]
) => {
  // If values have offsets we group values together by offset
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
/**
 * Get attribute data from attribute name, attribute data contains the type of the attribute (e.g. INT32, StringUTF8 etc)
 */
const getAttributeSchema = (
  attrName: string,
  attributesSchema: Array<Dimension | Attribute>
) => {
  return attributesSchema.find((attr) => attr.name === attrName);
};
