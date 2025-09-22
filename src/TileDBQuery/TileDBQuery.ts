import dataToQuery from '../utils/dataToQuery';
import capnpQueryDeSerializer from '../utils/deserialization/capnpQueryDeSerializer';
import {
  Configuration,
  ConfigurationParameters,
  Query,
  QueryApi,
  QueryStatus,
  QueryType,
  ModelArray
} from '../v3';
import { ArrayApi } from '../v2';
import getWriterBody from '../utils/getWriterBody';
import convertToArrayBufferIfNodeBuffer from '../utils/convertToArrayBufferIfNodeBuffer';
import getSizeInBytesOfAllAttributes from '../utils/getSizeInBytesOfAllAttributes';
import getResultsFromArrayBuffer, {
  Options
} from '../utils/getResultsFromArrayBuffer';
import globalAxios, { AxiosInstance } from 'axios';
import arrayFetchFromConfig from '../utils/arrayFetchFromConfig';
import capnpQuerySerializer from '../utils/serialization/capnpQuerySerializer';
import {
  getQueryAttributeHeaders,
  getQueryStatus
} from '../utils/deserialization/capnpDeSerializer';

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
  private config: Configuration;

  constructor(
    params: ConfigurationParameters,
    axios: AxiosInstance = globalAxios
  ) {
    this.configurationParams = params;
    this.axios = axios;

    const config = new Configuration(this.configurationParams);
    const baseV2 = config.basePath?.replace('v2', 'v2');
    const baseV3 = config.basePath?.replace('v2', 'v3');
    // Add versioning if basePath exists
    const configV2 = new Configuration({
      ...this.configurationParams,
      // Override basePath v2 for v1 to make calls to get ArraySchema (from v1 API)
      ...(baseV2 ? { basePath: baseV2 } : {})
    });
    const configV3 = new Configuration({
      ...this.configurationParams,
      // Override basePath v2 for v1 to make calls to get ArraySchema (from v1 API)
      ...(baseV3 ? { basePath: baseV3 } : {})
    });
    this.queryAPI = new QueryApi(configV3, undefined, this.axios);
    this.arrayAPI = new ArrayApi(configV2, undefined, this.axios);
    this.config = configV2;
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
        QueryType.Write,
        body,
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

  async *ReadQuery(
    workspace: string,
    teamspace: string,
    arrayName: string,
    body: QueryData,
    array?: ModelArray
  ) {
    array ??= await this.ArrayOpen(
      workspace,
      teamspace,
      arrayName,
      QueryType.Read
    );

    const options = {
      ignoreNullables: body.ignoreNullables,
      ignoreOffsets: body.ignoreOffsets,
      attributes: body.attributes,
      returnOffsets: body.returnOffsets,
      returnRawBuffers: body.returnRawBuffers,
      cancelToken: body.cancelToken
    };

    let query = capnpQuerySerializer(dataToQuery(body, array, options));
    let status = getQueryStatus(new DataView(query));

    while (
      (
        [
          QueryStatus.Uninitialized,
          QueryStatus.Incomplete
        ] as Array<QueryStatus>
      ).includes(status)
    ) {
      yield await this.queryAPI
        // @ts-expect-error: query already serialized as capnp
        .submitQuery(workspace, teamspace, arrayName, QueryType.Read, query, {
          cancelToken: body.cancelToken,
          headers: {
            'Content-Type': 'application/capnp'
          },
          responseType: 'arraybuffer'
        })
        .then(
          response =>
            // @ts-expect-error: Data is reported as File but it is either Buffer or ArrayBuffer
            new DataView(convertToArrayBufferIfNodeBuffer(response.data), 8)
        )
        .then(bufferView => {
          status = getQueryStatus(bufferView);

          const attributeHeaders = getQueryAttributeHeaders(bufferView);
          const resultSize = getSizeInBytesOfAllAttributes(
            getQueryAttributeHeaders(bufferView)
          );

          if (status === QueryStatus.Incomplete) {
            const resultSize = getSizeInBytesOfAllAttributes(
              getQueryAttributeHeaders(bufferView)
            );
            query = bufferView.buffer.slice(
              8,
              bufferView.byteOffset + bufferView.byteLength - resultSize
            );
          }

          // Calculate results
          return getResultsFromArrayBuffer(
            new DataView(
              bufferView.buffer,
              bufferView.byteOffset + bufferView.byteLength - resultSize
            ),
            attributeHeaders,
            [
              ...array.arraySchemaLatest.domain.dimensions,
              ...array.arraySchemaLatest.attributes
            ],
            options
          );
        })
        .catch(e => {
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
        });
    }

    return;
  }

  async ArrayOpen(
    workspace: string,
    teamspace: string,
    array: string,
    queryType: QueryType
  ): Promise<ModelArray> {
    const arrayFetch = arrayFetchFromConfig(this.config, queryType);

    return this.arrayAPI
      .getArray(workspace, teamspace, array, 'application/json', arrayFetch, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      })
      .then(x => x.data as unknown as ModelArray);
  }
}

export default TileDBQuery;
