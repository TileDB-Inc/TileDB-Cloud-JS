// import { AttributeBufferHeader } from './../v2/api';
import capnpQueryDeSerializer from "../utils/capnpQueryDeSerializer";
import { ArrayApi, Attribute } from "../v1";
import {
  AttributeBufferHeader,
  Configuration,
  ConfigurationParameters,
  QueryApi,
  Querytype,
} from "../v2";

class TileDBQuery {
  configurationParams: ConfigurationParameters;

  constructor(params: ConfigurationParameters) {
    this.configurationParams = params;
  }
  // TODO: Get Query javascript object instead of the array buffer and serialize it through the serializer
  async SubmitQuery(namespace: string, arrayName: string, body: ArrayBuffer) {
    const config = new Configuration(this.configurationParams);
    // Add versioning if basePath exists
    const configV1 = new Configuration({
      ...this.configurationParams,
      basePath: "https://api.dev.tiledb.io/v1",
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
        ),
      ]);

      const arraySchema = arraySchemaResponse.data;
      const queryData: any = queryResponse.data;
      const queryObject = capnpQueryDeSerializer(queryData.slice(8));

      const attributeHeaders = queryObject.attributeBufferHeaders;
      const numberOfBytesOfResults =
        getSizeInBytesOfAllAttributes(attributeHeaders);
      const resultsBuffer = queryData.slice(-1 * numberOfBytesOfResults);

      const results = getResults(
        resultsBuffer,
        attributeHeaders,
        arraySchema.attributes
      );

      return results;
    } catch (e) {
      throw e;
    }
  }
}

export default TileDBQuery;

const getAttributeSizeInBytes = (attr: AttributeBufferHeader) => {
  return (
    attr.fixedLenBufferSizeInBytes +
    attr.varLenBufferSizeInBytes +
    attr.validityLenBufferSizeInBytes
  );
};

const getSizeInBytesOfAllAttributes = (attributes: AttributeBufferHeader[]) =>
  attributes.reduce((accum, attr) => accum + getAttributeSizeInBytes(attr), 0);

const getResults = (
  arrayBuffer: ArrayBuffer,
  attributes: AttributeBufferHeader[],
  attributesSchema: Attribute[]
) => {
  // Let's reverse attributes to start from the end
  const attrs = attributes.reverse();
  const data = {};
  

  attrs.reduce((offset, attribute) => {
    const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);
    const isNullable = !!attribute.validityLenBufferSizeInBytes;
    const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
    const attributeType = getAttributeSchema(attribute.name, attributesSchema);
    const negativeOffset = -1 * offset;
    const start =
    negativeOffset -
    totalNumberOfBytesOfAttribute +
    (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
    const ending =
    negativeOffset -
    (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
    const end = ending ? ending : undefined;
    const retult = getAttributeResult(arrayBuffer.slice(start, end), attributeType);

    data[attribute.name] = retult;

    return offset + totalNumberOfBytesOfAttribute;
  }, 0);

  return data;
};

const getAttributeSchema = (name: string, attributesSchema: Attribute[]) => {
  return attributesSchema.find((attr) => (attr.name = name)).type;
};


const getAttributeResult = (arrayBuffer: ArrayBuffer, type: any) => {
    if (type === 'INT32') {
        return bufferToInt32(arrayBuffer);
    } else if (type === 'UINT64') {
        return bufferToUint64(arrayBuffer);
    }
}

const bufferToInt32 = (arrayBuffer: ArrayBuffer) => new Int32Array(arrayBuffer);
const bufferToUint64 = (arrayBuffer: ArrayBuffer) => new BigInt64Array(arrayBuffer);