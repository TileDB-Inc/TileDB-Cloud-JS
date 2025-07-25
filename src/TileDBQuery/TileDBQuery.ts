import dataToQuery from '../utils/dataToQuery';
import capnpQueryDeSerializer from '../utils/deserialization/capnpQueryDeSerializer';
import { ArrayApi } from '../v1';
import {
  ArraySchema,
  AttributeBufferHeader,
  Configuration,
  ConfigurationParameters,
  Query,
  QueryApi,
  ArrayApi as ArrayApiV2,
  Querystatus,
  Querytype,
  ModelArray
} from '../v2';
import getWriterBody from '../utils/getWriterBody';
import convertToArrayBufferIfNodeBuffer from '../utils/convertToArrayBufferIfNodeBuffer';
import getSizeInBytesOfAllAttributes from '../utils/getSizeInBytesOfAllAttributes';
import getResultsFromArrayBuffer, {
  Options
} from '../utils/getResultsFromArrayBuffer';
import globalAxios, { AxiosInstance } from 'axios';
import capnpArrayDeserializer from '../utils/deserialization/capnpArrayDeserializer';
import arrayFetchFromConfig from '../utils/arrayFetchFromConfig';
import capnpArrayFetchSerializer from '../utils/serialization/capnpArrayFetchSerializer';
import responseTypes from '../constants/responseTypes';

export type Range = number[] | string[];
export interface QueryData extends Pick<Query, 'layout'>, Options {
  ranges: Array<Range | Array<Range>>;
  /**
   * Number of bytes allocated to the server for the query.
   */
  bufferSize: number;
}
interface AttributeValue {
  validity?: number[];
  offsets?: number[];
  values: any[];
}

export type AttributeValues = Record<string, AttributeValue>;
export interface QueryWrite extends Pick<Query, 'layout'> {
  values: AttributeValues;
  subarray?: Array<number[] | string[]>;
}

export class TileDBQuery {
  configurationParams: ConfigurationParameters;
  private axios: AxiosInstance;
  private queryAPI: QueryApi;
  private arrayAPI: ArrayApi;
  private arrayAPIV2: ArrayApiV2;
  private config: Configuration;

  constructor(
    params: ConfigurationParameters,
    axios: AxiosInstance = globalAxios
  ) {
    this.configurationParams = params;

    const config = new Configuration(this.configurationParams);
    const baseV1 = config.basePath?.replace('v2', 'v1');
    // Add versioning if basePath exists
    const configV1 = new Configuration({
      ...this.configurationParams,
      // Override basePath v2 for v1 to make calls to get ArraySchema (from v1 API)
      ...(baseV1 ? { basePath: baseV1 } : {})
    });
    this.config = configV1;
    this.queryAPI = new QueryApi(config, undefined, this.axios);
    this.arrayAPI = new ArrayApi(configV1, undefined, this.axios);
    this.arrayAPIV2 = new ArrayApiV2(config, undefined, this.axios);
  }

  async WriteQuery(
    workspace: string,
    teamspace: string,
    arrayName: string,
    data: QueryWrite
  ) {
    try {
      const arraySchemaResponse = await this.arrayAPI.getArray(
        workspace,
        teamspace,
        arrayName,
        'application/json'
      );
      const arraySchema = arraySchemaResponse.data;
      const body = getWriterBody(data, arraySchema);

      const queryResponse = await this.queryAPI.submitQuery(
        workspace,
        teamspace,
        arrayName,
        Querytype.Write,
        'application/capnp',
        body as any,
        undefined,
        undefined,
        undefined,
        {
          headers: {
            'Content-Type': 'application/capnp'
          },
          responseType: 'arraybuffer'
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
    workspace: string,
    teamspace: string,
    arrayName: string,
    options: Options
  ): Promise<{
    query: Query;
    results: Record<string, any>;
    queryAsArrayBuffer: ArrayBuffer;
  }> {
    const queryResponse = await this.queryAPI.submitQuery(
      workspace,
      teamspace,
      arrayName,
      Querytype.Read,
      'application/capnp',
      queryAsArrayBuffer as any,
      undefined,
      undefined,
      undefined,
      {
        cancelToken: options.cancelToken,
        headers: {
          'Content-Type': 'application/capnp'
        },
        responseType: 'arraybuffer'
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

    const results = await this.getResultsFromArrayBuffer(
      arraySchema,
      bufferWithoutFirstEightBytes,
      attributeHeaders,
      options
    );

    return {
      results,
      query: queryObject as any,
      queryAsArrayBuffer: bufferWithoutFirstEightBytes
    };
  }

  async *ReadQuery(
    workspace: string,
    teamspace: string,
    arrayName: string,
    body: QueryData,
    arraySchema?: ArraySchema
  ) {
    try {
      // Get ArraySchema of arrray, to get type information of the dimensions and the attributes
      if (typeof arraySchema === 'undefined') {
        const arrayFromCapnp = await this.ArrayOpen(
          workspace,
          teamspace,
          arrayName,
          Querytype.Read
        );
        arraySchema = arrayFromCapnp.arraySchemaLatest as ArraySchema;
      }

      arraySchema.arrayType;

      const options = {
        ignoreNullables: body.ignoreNullables,
        ignoreOffsets: body.ignoreOffsets,
        attributes: body.attributes,
        returnOffsets: body.returnOffsets,
        returnRawBuffers: body.returnRawBuffers,
        cancelToken: body.cancelToken
      };
      /**
       * Get the query response in capnp, we set responseType to arraybuffer instead of JSON
       * in order to deserialize the query capnp object.
       */

      const queryResponse = await this.queryAPI.submitQuery(
        workspace,
        teamspace,
        arrayName,
        Querytype.Read,
        'application/capnp',
        dataToQuery(body, arraySchema, options),
        undefined,
        undefined,
        undefined,
        {
          cancelToken: body.cancelToken,
          headers: {
            'Content-Type': 'application/capnp'
          },
          responseType: 'arraybuffer'
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
          yield await this.getResultsFromArrayBuffer(
            arraySchema,
            bufferWithoutFirstEightBytes,
            attributeHeaders,
            options
          );

          while (true) {
            const { results, query, queryAsArrayBuffer } =
              await this.ReadIncompleteQuery(
                arraySchema,
                bufferWithoutFirstEightBytes,
                workspace,
                teamspace,
                arrayName,
                options
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
        attributeHeaders,
        options
      );
      return;
    } catch (e) {
      this.throwError(e);
    }
  }

  private async getResultsFromArrayBuffer(
    arraySchema: ArraySchema,
    bufferResults: ArrayBuffer,
    attributeHeaders: AttributeBufferHeader[],
    options: Options
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
      ...arraySchema.attributes
    ];

    // Calculate results
    const results = await getResultsFromArrayBuffer(
      resultsBuffer,
      attributeHeaders,
      mergeAttributesAndDimensions,
      options
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

  async ArrayOpen(
    workspace: string,
    teamspace: string,
    array: string,
    queryType: Querytype,
    contentType: string | undefined = 'application/json'
  ): Promise<ModelArray> {
    const arrayFetch = arrayFetchFromConfig(this.config, queryType);
    const isJSONEncoded = contentType === 'application/json';
    /**
     * If conntentType is application/capnp we need to serialize
     * ArrayFetch object to capnp before sending the request.
     */
    const arrayFetchData: any = isJSONEncoded
      ? arrayFetch
      : capnpArrayFetchSerializer(arrayFetch);

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.arrayAPIV2.getArray(
          workspace,
          teamspace,
          array,
          contentType,
          arrayFetchData,
          {
            headers: {
              'Content-Type': contentType
            },
            responseType: responseTypes[contentType]
          }
        );
        /**
         * If we get back JSON encoded we resolve the promise
         * if we get back capnp buffers, we need to deserialize it before resolving
         */
        if (isJSONEncoded) {
          resolve(response.data);
          return;
        }
        const arrayStructAsArrayBuffer = convertToArrayBufferIfNodeBuffer(
          response.data
        );
        const deserializedArrayStruct = capnpArrayDeserializer(
          arrayStructAsArrayBuffer
        );

        resolve(deserializedArrayStruct);
      } catch (e) {
        if (isJSONEncoded) {
          reject(e);
          return;
        }
        /**
         * If we request application/capnp contentType, errors return as ArrayBuffer
         */
        if (e.response?.data) {
          const err = new Error(new TextDecoder().decode(e.response.data));
          reject(err);
        } else {
          reject(e);
        }
      }
    });
  }
}

export default TileDBQuery;
