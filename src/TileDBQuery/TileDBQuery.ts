import dataToQuery from "../utils/dataToQuery";
import capnpQueryDeSerializer from "../utils/capnpQueryDeSerializer";
import { ArrayApi, ArraySchema } from "../v1";
import {
  AttributeBufferHeader,
  Configuration,
  ConfigurationParameters,
  Query,
  QueryApi,
  Querystatus,
  Querytype,
} from "../v2";
import getWriterBody from "../utils/getWriterBody";
import convertToArrayBufferIfNodeBuffer from "../utils/convertToArrayBufferIfNodeBuffer";
import getSizeInBytesOfAllAttributes from "../utils/getSizeInBytesOfAllAttributes";
import getResultsFromArrayBuffer from "../utils/getResultsFromArrayBuffer";

type Range = number[] | string[];
export interface QueryData extends Pick<Query, "layout"> {
  ranges: Array<Range | Array<Range>>;
  bufferSize: number;
}
interface AttributeValue {
  validity?: number[];
  offsets?: number[];
  values: any[];
}

export type AttributeValues = Record<string, AttributeValue>;
export interface QueryWrite extends Pick<Query, "layout"> {
  values: AttributeValues;
  subarray?: Array<number[] | string[]>;
}

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
      const bufferWithoutFirstEightBytes = queryData.slice(8);

      return capnpQueryDeSerializer(bufferWithoutFirstEightBytes);
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

  async ReadIncompleteQuery(
    arraySchema: ArraySchema,
    queryAsArrayBuffer: ArrayBuffer,
    namespace: string,
    arrayName: string
  ): Promise<{
    query: Query;
    results: Record<string, any>;
    queryAsArrayBuffer: ArrayBuffer;
  }> {
    const config = new Configuration(this.configurationParams);
    const queryAPI = new QueryApi(config);
    const queryResponse = await queryAPI.submitQuery(
      namespace,
      arrayName,
      Querytype.Read,
      "application/capnp",
      queryAsArrayBuffer as any,
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

    const results = this.getResultsFromArrayBuffer(
      arraySchema,
      bufferWithoutFirstEightBytes,
      attributeHeaders
    );

    return {
      results,
      query: queryObject as any,
      queryAsArrayBuffer: bufferWithoutFirstEightBytes,
    };
  }

  async *ReadQuery(namespace: string, arrayName: string, body: QueryData) {
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
      let bufferWithoutFirstEightBytes = queryData.slice(8);

      /**
       * Deserialize buffer to a Query object
       */
      const queryObject = capnpQueryDeSerializer(bufferWithoutFirstEightBytes);

      const attributeHeaders = queryObject.attributeBufferHeaders;

      // Case it's incomplete query
      if (queryObject.status === Querystatus.Incomplete) {
        try {
          yield this.getResultsFromArrayBuffer(
            arraySchema,
            bufferWithoutFirstEightBytes,
            attributeHeaders
          );

          while (true) {
            const { results, query, queryAsArrayBuffer } =
              await this.ReadIncompleteQuery(
                arraySchema,
                bufferWithoutFirstEightBytes,
                namespace,
                arrayName
              );
            // Override query object with the new one returned from `ReadIncompleteQuery`
            bufferWithoutFirstEightBytes = queryAsArrayBuffer;

            if (query.status === Querystatus.Incomplete) {
              yield results;
            } else {
              // Case query is not incomplete
              yield results;
              return;
            }
          }
        } catch (e) {
          this.throwError(e);
        }
      }

      yield this.getResultsFromArrayBuffer(
        arraySchema,
        bufferWithoutFirstEightBytes,
        attributeHeaders
      );
      return;
    } catch (e) {
      this.throwError(e);
    }
  }

  private getResultsFromArrayBuffer(
    arraySchema: ArraySchema,
    bufferResults: ArrayBuffer,
    attributeHeaders: AttributeBufferHeader[]
  ) {
    /**
     * Calculate the size of bytes of the attributes from the attributeBufferHeaders of the Query object.
     */
    const numberOfBytesOfResults =
      getSizeInBytesOfAllAttributes(attributeHeaders);
    /**
     * We get the last N bytes (N is the number of total bytes of the attributes), which contain
     * the results of all the attributes
     */
    const resultsBuffer = bufferResults.slice(-1 * numberOfBytesOfResults);
    const mergeAttributesAndDimensions = [
      ...arraySchema.domain.dimensions,
      ...arraySchema.attributes,
    ];
    // Calculate results
    const results = getResultsFromArrayBuffer(
      resultsBuffer,
      attributeHeaders,
      mergeAttributesAndDimensions
    );

    return results;
  }

  private throwError(e: any) {
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

export default TileDBQuery;
