import capnpQueryDeSerializer from "../utils/capnpQueryDeSerializer";
import { ArrayApi, Attribute, Dimension } from "../v1";
import {
  AttributeBufferHeader,
  Configuration,
  ConfigurationParameters,
  Datatype,
  Query,
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
    body: Partial<Query>
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
      const [arraySchemaResponse, queryResponse] = await Promise.all([
        arrayAPI.getArray(namespace, arrayName, "application/json"),
        queryAPI.submitQuery(
          namespace,
          arrayName,
          Querytype.Read,
          "application/capnp",
          body as Query,
          undefined,
          undefined,
          undefined,
          {
            headers: {
              "Content-Type": "application/capnp",
            },
            responseType: "arraybuffer",
          }
        ),
      ]);

      const arraySchema = arraySchemaResponse.data;
      const queryData = convertToArrayBufferIfNodeBuffer(queryResponse.data);
      const bufferWithoutFirstEightBytes = queryData.slice(8);
      // return bufferWithoutFirstEightBytes;

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

const getAttributeResult = (arrayBuffer: ArrayBuffer, type: Datatype) => {
  if (type === Datatype.Int32) {
    return bufferToInt32(arrayBuffer);
  } else if (type === Datatype.Uint64) {
    return bufferToUint64(arrayBuffer);
  } else if (type === Datatype.Int64) {
    return bufferToInt64(arrayBuffer);
  } else if (type === Datatype.Float32) {
    return bufferToFloat32(arrayBuffer);
  } else if (type === Datatype.Float64) {
    return bufferToFloat64(arrayBuffer);
  } else if (type === Datatype.Char) {
    return bufferToString(arrayBuffer);
  } else if (type === Datatype.Int8) {
    return bufferToInt8(arrayBuffer);
  } else if (type === Datatype.Uint8) {
    return bufferToUint8(arrayBuffer);
  } else if (type === Datatype.Int16) {
    return bufferToInt16(arrayBuffer);
  } else if (type === Datatype.Uint16) {
    return bufferToUint16(arrayBuffer);
  } else if (type === Datatype.Uint32) {
    return bufferToUint32(arrayBuffer);
  } else if (type === Datatype.StringAscii) {
    return bufferToAscii(arrayBuffer);
  } else if (type === Datatype.StringUtf8) {
    return bufferToString(arrayBuffer);
  } else if (type === Datatype.StringUtf16) {
    return bufferToUTF16(arrayBuffer);
  } else if (type === Datatype.StringUtf32) {
    return bufferToUTF32(arrayBuffer);
  } else if (type === Datatype.StringUcs2) {
    return bufferToUTF16(arrayBuffer);
  } else if (type === Datatype.StringUcs4) {
    return bufferToUTF32(arrayBuffer);
  }

  return arrayBuffer;
};

const bufferToInt8 = (arrayBuffer: ArrayBuffer) => new Int8Array(arrayBuffer);
const bufferToUint8 = (arrayBuffer: ArrayBuffer) => new Uint8Array(arrayBuffer);
const bufferToUint16 = (arrayBuffer: ArrayBuffer) =>
  new Uint16Array(arrayBuffer);
const bufferToUint32 = (arrayBuffer: ArrayBuffer) =>
  new Uint32Array(arrayBuffer);
const bufferToInt16 = (arrayBuffer: ArrayBuffer) => new Int16Array(arrayBuffer);
const bufferToInt32 = (arrayBuffer: ArrayBuffer) => new Int32Array(arrayBuffer);
const bufferToUint64 = (arrayBuffer: ArrayBuffer) =>
  new BigUint64Array(arrayBuffer);
const bufferToInt64 = (arrayBuffer: ArrayBuffer) =>
  new BigInt64Array(arrayBuffer);
const bufferToFloat32 = (arrayBuffer: ArrayBuffer) =>
  new Float32Array(arrayBuffer);
const bufferToFloat64 = (arrayBuffer: ArrayBuffer) =>
  new Float64Array(arrayBuffer);
const bufferToString = (arrayBuffer: ArrayBuffer) => {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(arrayBuffer);
};
const bufferToAscii = (arrayBuffer: ArrayBuffer) => {
  const utf8decoder = new TextDecoder("ascii");
  return utf8decoder.decode(arrayBuffer);
};
const bufferToUTF16 = (arrayBuffer: ArrayBuffer) => {
  const utf8decoder = new TextDecoder("utf-16");
  return utf8decoder.decode(arrayBuffer);
};
const bufferToUTF32 = (arrayBuffer: ArrayBuffer) => {
  const view = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
  let result = "";

  for (let i = 0; i < arrayBuffer.byteLength; i += 4) {
    result += String.fromCodePoint(view.getInt32(i, true));
  }

  return result;
};
