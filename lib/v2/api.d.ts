/**
 * Tiledb Storage Platform API
 * TileDB Storage Platform REST API
 *
 * The version of the OpenAPI document: 1.4.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Configuration } from './configuration';
import { AxiosPromise, AxiosInstance } from 'axios';
import { RequestArgs, BaseAPI } from './base';
/**
 * Type of activity logged
 * @export
 * @enum {string}
 */
export declare enum ActivityEventType {
    ReadSchema = "read_schema",
    MaxBufferSizes = "max_buffer_sizes",
    NonEmptyDomain = "non_empty_domain",
    QueryRead = "query_read",
    QueryWrite = "query_write",
    Create = "create",
    Delete = "delete",
    Register = "register",
    Deregister = "deregister",
    Udf = "udf",
    ArrayMetadataGet = "array_metadata_get",
    ArrayMetadataUpdate = "array_metadata_update",
    EstimatedResultSizes = "estimated_result_sizes"
}
/**
 * Actvity of an Array
 * @export
 * @interface ArrayActivityLog
 */
export interface ArrayActivityLog {
    /**
     * time event took place (RFC3339)
     * @type {string}
     * @memberof ArrayActivityLog
     */
    event_at?: string;
    /**
     *
     * @type {ActivityEventType}
     * @memberof ArrayActivityLog
     */
    action?: ActivityEventType;
    /**
     * User who performed action
     * @type {string}
     * @memberof ArrayActivityLog
     */
    username?: string;
    /**
     * Bytes sent to client
     * @type {number}
     * @memberof ArrayActivityLog
     */
    bytes_sent?: number;
    /**
     * Bytes recieved from client
     * @type {number}
     * @memberof ArrayActivityLog
     */
    bytes_received?: number;
    /**
     * uuid of associated array task
     * @type {string}
     * @memberof ArrayActivityLog
     */
    array_task_id?: string;
    /**
     * ranges for query
     * @type {string}
     * @memberof ArrayActivityLog
     */
    query_ranges?: string;
}
/**
 * Object including array tasks and metadata
 * @export
 * @interface ArrayActivityLogData
 */
export interface ArrayActivityLogData {
    /**
     * Array ArrayActivityLog
     * @type {Array<ArrayActivityLog>}
     * @memberof ArrayActivityLogData
     */
    activitylogs?: Array<ArrayActivityLog>;
    /**
     *
     * @type {PaginationMetadata}
     * @memberof ArrayActivityLogData
     */
    pagination_metadata?: PaginationMetadata;
}
/**
 * Represents an attribute buffer header information
 * @export
 * @interface AttributeBufferHeader
 */
export interface AttributeBufferHeader {
    /**
     * Attribute name
     * @type {string}
     * @memberof AttributeBufferHeader
     */
    name: string;
    /**
     * Number of bytes in the fixed-length attribute data buffer (offsets for var-len attributes)
     * @type {number}
     * @memberof AttributeBufferHeader
     */
    fixedLenBufferSizeInBytes: number;
    /**
     * Number of bytes in the var-length attribute data buffer
     * @type {number}
     * @memberof AttributeBufferHeader
     */
    varLenBufferSizeInBytes: number;
    /**
     * Number of bytes for validity in case attribute is nullable
     * @type {number}
     * @memberof AttributeBufferHeader
     */
    validityLenBufferSizeInBytes?: number;
    /**
     * Original user set number of bytes in the fixed-length attribute data buffer
     * @type {number}
     * @memberof AttributeBufferHeader
     */
    originalFixedLenBufferSizeInBytes?: number;
    /**
     * Original user set number of bytes in the var-length attribute data buffer
     * @type {number}
     * @memberof AttributeBufferHeader
     */
    originalVarLenBufferSizeInBytes?: number;
    /**
     * Original user set number of bytes in the validity data buffer
     * @type {number}
     * @memberof AttributeBufferHeader
     */
    originalValidityLenBufferSizeInBytes?: number;
}
/**
 * object representing buffer size of an attribute
 * @export
 * @interface AttributeBufferSize
 */
export interface AttributeBufferSize {
    /**
     * name of attribute
     * @type {string}
     * @memberof AttributeBufferSize
     */
    attribute: string;
    /**
     * buffer size (in bytes) of offset buffer
     * @type {number}
     * @memberof AttributeBufferSize
     */
    offsetBytes: number;
    /**
     * buffer size (in bytes) of data buffer
     * @type {number}
     * @memberof AttributeBufferSize
     */
    dataBytes: number;
}
/**
 * TileDB data type
 * @export
 * @enum {string}
 */
export declare enum Datatype {
    Int32 = "INT32",
    Int64 = "INT64",
    Float32 = "FLOAT32",
    Float64 = "FLOAT64",
    Char = "CHAR",
    Int8 = "INT8",
    Uint8 = "UINT8",
    Int16 = "INT16",
    Uint16 = "UINT16",
    Uint32 = "UINT32",
    Uint64 = "UINT64",
    StringAscii = "STRING_ASCII",
    StringUtf8 = "STRING_UTF8",
    StringUtf16 = "STRING_UTF16",
    StringUtf32 = "STRING_UTF32",
    StringUcs2 = "STRING_UCS2",
    StringUcs4 = "STRING_UCS4",
    DatetimeYear = "DATETIME_YEAR",
    DatetimeMonth = "DATETIME_MONTH",
    DatetimeWeek = "DATETIME_WEEK",
    DatetimeDay = "DATETIME_DAY",
    DatetimeHr = "DATETIME_HR",
    DatetimeMin = "DATETIME_MIN",
    DatetimeSec = "DATETIME_SEC",
    DatetimeMs = "DATETIME_MS",
    DatetimeUs = "DATETIME_US",
    DatetimeNs = "DATETIME_NS",
    DatetimePs = "DATETIME_PS",
    DatetimeFs = "DATETIME_FS",
    DatetimeAs = "DATETIME_AS",
    Any = "ANY"
}
/**
 * Domain object for an array of each type
 * @export
 * @interface DomainArray
 */
export interface DomainArray {
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    int8?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    uint8?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    int16?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    uint16?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    int32?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    uint32?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    int64?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    uint64?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    float32?: Array<number>;
    /**
     *
     * @type {Array<number>}
     * @memberof DomainArray
     */
    float64?: Array<number>;
}
/**
 * Layout of array
 * @export
 * @enum {string}
 */
export declare enum Layout {
    RowMajor = "row-major",
    ColMajor = "col-major",
    GlobalOrder = "global-order",
    Unordered = "unordered"
}
/**
 * Represents an open array
 * @export
 * @interface ModelArray
 */
export interface ModelArray {
    /**
     * timestamp (epoch milliseconds) array is opened at
     * @type {number}
     * @memberof ModelArray
     */
    timestamp: number;
    /**
     *
     * @type {Querytype}
     * @memberof ModelArray
     */
    queryType: Querytype;
    /**
     * Array uri
     * @type {string}
     * @memberof ModelArray
     */
    uri: string;
}
/**
 *
 * @export
 * @interface ModelError
 */
export interface ModelError {
    /**
     *
     * @type {number}
     * @memberof ModelError
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof ModelError
     */
    message?: string;
}
/**
 *
 * @export
 * @interface PaginationMetadata
 */
export interface PaginationMetadata {
    /**
     * pagination offset
     * @type {number}
     * @memberof PaginationMetadata
     */
    page?: number;
    /**
     * pagination limit
     * @type {number}
     * @memberof PaginationMetadata
     */
    per_page?: number;
    /**
     * number of total pages with current limit
     * @type {number}
     * @memberof PaginationMetadata
     */
    total_pages?: number;
    /**
     * number of total available items
     * @type {number}
     * @memberof PaginationMetadata
     */
    total_items?: number;
}
/**
 *
 * @export
 * @interface Query
 */
export interface Query {
    /**
     *
     * @type {Querytype}
     * @memberof Query
     */
    type: Querytype;
    /**
     *
     * @type {Layout}
     * @memberof Query
     */
    layout: Layout;
    /**
     *
     * @type {Querystatus}
     * @memberof Query
     */
    status: Querystatus;
    /**
     * List of attribute buffer headers
     * @type {Array<AttributeBufferHeader>}
     * @memberof Query
     */
    attributeBufferHeaders: Array<AttributeBufferHeader>;
    /**
     *
     * @type {Writer}
     * @memberof Query
     */
    writer?: Writer;
    /**
     *
     * @type {QueryReader}
     * @memberof Query
     */
    reader?: QueryReader;
    /**
     *
     * @type {any}
     * @memberof Query
     */
    array: any;
    /**
     * Total number of bytes in fixed size attribute buffers.
     * @type {number}
     * @memberof Query
     */
    totalFixedLengthBufferBytes: number;
    /**
     * Total number of bytes in variable size attribute buffers.
     * @type {number}
     * @memberof Query
     */
    totalVarLenBufferBytes: number;
    /**
     * Total number of bytes in validity buffers
     * @type {number}
     * @memberof Query
     */
    totalValidityBufferBytes?: number;
}
/**
 * Read struct (can\'t be called reader due to class name conflict)
 * @export
 * @interface QueryReader
 */
export interface QueryReader {
    /**
     *
     * @type {Layout}
     * @memberof QueryReader
     */
    layout?: Layout;
    /**
     *
     * @type {Subarray}
     * @memberof QueryReader
     */
    subarray?: Subarray;
    /**
     *
     * @type {ReadState}
     * @memberof QueryReader
     */
    readState?: ReadState;
}
/**
 * Status of query
 * @export
 * @enum {string}
 */
export declare enum Querystatus {
    Failed = "FAILED",
    Completed = "COMPLETED",
    Inprogress = "INPROGRESS",
    Incomplete = "INCOMPLETE",
    Uninitialized = "UNINITIALIZED"
}
/**
 * Type of query
 * @export
 * @enum {string}
 */
export declare enum Querytype {
    Read = "READ",
    Write = "WRITE"
}
/**
 * state for reads
 * @export
 * @interface ReadState
 */
export interface ReadState {
    /**
     * True if the reader has been initialized.
     * @type {boolean}
     * @memberof ReadState
     */
    initialized?: boolean;
    /**
     * True if the query produced results that could not fit in some buffer.
     * @type {boolean}
     * @memberof ReadState
     */
    overflowed?: boolean;
    /**
     * True if the current subarray partition is unsplittable.
     * @type {boolean}
     * @memberof ReadState
     */
    unsplittable?: boolean;
    /**
     *
     * @type {SubarrayPartitioner}
     * @memberof ReadState
     */
    subarrayPartitioner?: SubarrayPartitioner;
}
/**
 * A Subarray
 * @export
 * @interface Subarray
 */
export interface Subarray {
    /**
     *
     * @type {Layout}
     * @memberof Subarray
     */
    layout?: Layout;
    /**
     * List of 1D ranges, one per dimension
     * @type {Array<SubarrayRanges>}
     * @memberof Subarray
     */
    ranges?: Array<SubarrayRanges>;
}
/**
 * The subarray partitioner
 * @export
 * @interface SubarrayPartitioner
 */
export interface SubarrayPartitioner {
    /**
     *
     * @type {Subarray}
     * @memberof SubarrayPartitioner
     */
    subarray?: Subarray;
    /**
     * Result size budget (in bytes) for all attributes.
     * @type {Array<AttributeBufferSize>}
     * @memberof SubarrayPartitioner
     */
    budget?: Array<AttributeBufferSize>;
    /**
     *
     * @type {SubarrayPartitionerCurrent}
     * @memberof SubarrayPartitioner
     */
    current?: SubarrayPartitionerCurrent;
    /**
     *
     * @type {SubarrayPartitionerState}
     * @memberof SubarrayPartitioner
     */
    state?: SubarrayPartitionerState;
    /**
     * The memory budget for the fixed-sized attributes and the offsets of the var-sized attributes
     * @type {number}
     * @memberof SubarrayPartitioner
     */
    memoryBudget?: number;
    /**
     * The memory budget for the var-sized attributes
     * @type {number}
     * @memberof SubarrayPartitioner
     */
    memoryBudgetVar?: number;
}
/**
 * The current partition info
 * @export
 * @interface SubarrayPartitionerCurrent
 */
export interface SubarrayPartitionerCurrent {
    /**
     *
     * @type {Subarray}
     * @memberof SubarrayPartitionerCurrent
     */
    subarray?: Subarray;
    /**
     * PartitionInfo start
     * @type {number}
     * @memberof SubarrayPartitionerCurrent
     */
    start?: number;
    /**
     * PartitionInfo end
     * @type {number}
     * @memberof SubarrayPartitionerCurrent
     */
    end?: number;
    /**
     * PartitionInfo splitMultiRange
     * @type {boolean}
     * @memberof SubarrayPartitionerCurrent
     */
    splitMultiRange?: boolean;
}
/**
 * The state information for the remaining partitions to be produced
 * @export
 * @interface SubarrayPartitionerState
 */
export interface SubarrayPartitionerState {
    /**
     * State start
     * @type {number}
     * @memberof SubarrayPartitionerState
     */
    start?: number;
    /**
     * State end
     * @type {number}
     * @memberof SubarrayPartitionerState
     */
    end?: number;
    /**
     * State singleRange
     * @type {Array<Subarray>}
     * @memberof SubarrayPartitionerState
     */
    singleRange?: Array<Subarray>;
    /**
     * State multiRange
     * @type {Array<Subarray>}
     * @memberof SubarrayPartitionerState
     */
    multiRange?: Array<Subarray>;
}
/**
 * A set of 1D ranges for a subarray
 * @export
 * @interface SubarrayRanges
 */
export interface SubarrayRanges {
    /**
     *
     * @type {Datatype}
     * @memberof SubarrayRanges
     */
    type?: Datatype;
    /**
     * True if the range is the default range
     * @type {boolean}
     * @memberof SubarrayRanges
     */
    hasDefaultRange?: boolean;
    /**
     * The bytes of the ranges
     * @type {Array<number>}
     * @memberof SubarrayRanges
     */
    buffer?: Array<number>;
    /**
     * The list of sizes per range
     * @type {Array<number>}
     * @memberof SubarrayRanges
     */
    bufferSizes?: Array<number>;
    /**
     * The list of start sizes per range
     * @type {Array<number>}
     * @memberof SubarrayRanges
     */
    bufferStartSizes?: Array<number>;
}
/**
 *
 * @export
 * @interface Writer
 */
export interface Writer {
    /**
     *
     * @type {boolean}
     * @memberof Writer
     */
    checkCoordDups?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof Writer
     */
    checkCoordOOB?: boolean;
    /**
     *
     * @type {boolean}
     * @memberof Writer
     */
    dedupCoords?: boolean;
    /**
     *
     * @type {Subarray}
     * @memberof Writer
     */
    subarrayRanges?: Subarray;
    /**
     *
     * @type {DomainArray}
     * @memberof Writer
     */
    subarray?: DomainArray;
}
/**
 * ArrayApi - axios parameter creator
 * @export
 */
export declare const ArrayApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * get array activity logs
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {number} [start] Start time of window of fetch logs, unix epoch in seconds (default: seven days ago)
     * @param {number} [end] End time of window of fetch logs, unix epoch in seconds (default: current utc timestamp)
     * @param {Array<string>} [eventTypes] Event values can be one or more of the following read, write, create, delete, register, deregister, comma separated
     * @param {string} [taskId] Array task id To filter activity to
     * @param {boolean} [hasTaskId] Excludes activity log results that does not contain an array task uuid
     * @param {number} [page] pagination offset
     * @param {number} [perPage] pagination limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    arrayActivityLog: (namespace: string, array: string, start?: number, end?: number, eventTypes?: Array<string>, taskId?: string, hasTaskId?: boolean, page?: number, perPage?: number, options?: any) => Promise<RequestArgs>;
};
/**
 * ArrayApi - functional programming interface
 * @export
 */
export declare const ArrayApiFp: (configuration?: Configuration) => {
    /**
     * get array activity logs
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {number} [start] Start time of window of fetch logs, unix epoch in seconds (default: seven days ago)
     * @param {number} [end] End time of window of fetch logs, unix epoch in seconds (default: current utc timestamp)
     * @param {Array<string>} [eventTypes] Event values can be one or more of the following read, write, create, delete, register, deregister, comma separated
     * @param {string} [taskId] Array task id To filter activity to
     * @param {boolean} [hasTaskId] Excludes activity log results that does not contain an array task uuid
     * @param {number} [page] pagination offset
     * @param {number} [perPage] pagination limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    arrayActivityLog(namespace: string, array: string, start?: number, end?: number, eventTypes?: Array<string>, taskId?: string, hasTaskId?: boolean, page?: number, perPage?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ArrayActivityLogData>>;
};
/**
 * ArrayApi - factory interface
 * @export
 */
export declare const ArrayApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * get array activity logs
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {number} [start] Start time of window of fetch logs, unix epoch in seconds (default: seven days ago)
     * @param {number} [end] End time of window of fetch logs, unix epoch in seconds (default: current utc timestamp)
     * @param {Array<string>} [eventTypes] Event values can be one or more of the following read, write, create, delete, register, deregister, comma separated
     * @param {string} [taskId] Array task id To filter activity to
     * @param {boolean} [hasTaskId] Excludes activity log results that does not contain an array task uuid
     * @param {number} [page] pagination offset
     * @param {number} [perPage] pagination limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    arrayActivityLog(namespace: string, array: string, start?: number, end?: number, eventTypes?: Array<string>, taskId?: string, hasTaskId?: boolean, page?: number, perPage?: number, options?: any): AxiosPromise<ArrayActivityLogData>;
};
/**
 * ArrayApi - object-oriented interface
 * @export
 * @class ArrayApi
 * @extends {BaseAPI}
 */
export declare class ArrayApi extends BaseAPI {
    /**
     * get array activity logs
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {number} [start] Start time of window of fetch logs, unix epoch in seconds (default: seven days ago)
     * @param {number} [end] End time of window of fetch logs, unix epoch in seconds (default: current utc timestamp)
     * @param {Array<string>} [eventTypes] Event values can be one or more of the following read, write, create, delete, register, deregister, comma separated
     * @param {string} [taskId] Array task id To filter activity to
     * @param {boolean} [hasTaskId] Excludes activity log results that does not contain an array task uuid
     * @param {number} [page] pagination offset
     * @param {number} [perPage] pagination limit
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ArrayApi
     */
    arrayActivityLog(namespace: string, array: string, start?: number, end?: number, eventTypes?: Array<string>, taskId?: string, hasTaskId?: boolean, page?: number, perPage?: number, options?: any): Promise<import("axios").AxiosResponse<ArrayActivityLogData>>;
}
/**
 * QueryApi - axios parameter creator
 * @export
 */
export declare const QueryApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     * send a query to run against a specified array/URI registered to a group/project
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {string} type type of query
     * @param {string} contentType Content Type of input and return mime
     * @param {Query} query query to run
     * @param {string} [xPayer] Name of organization or user who should be charged for this request
     * @param {number} [openAt] open_at for array in unix epoch
     * @param {string} [readAll] If \&quot;true\&quot;, resubmits incomplete queries until the query has completed. Defaults to \&quot;false\&quot;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    submitQuery: (namespace: string, array: string, type: string, contentType: string, query: Query, xPayer?: string, openAt?: number, readAll?: string, options?: any) => Promise<RequestArgs>;
};
/**
 * QueryApi - functional programming interface
 * @export
 */
export declare const QueryApiFp: (configuration?: Configuration) => {
    /**
     * send a query to run against a specified array/URI registered to a group/project
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {string} type type of query
     * @param {string} contentType Content Type of input and return mime
     * @param {Query} query query to run
     * @param {string} [xPayer] Name of organization or user who should be charged for this request
     * @param {number} [openAt] open_at for array in unix epoch
     * @param {string} [readAll] If \&quot;true\&quot;, resubmits incomplete queries until the query has completed. Defaults to \&quot;false\&quot;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    submitQuery(namespace: string, array: string, type: string, contentType: string, query: Query, xPayer?: string, openAt?: number, readAll?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>>;
};
/**
 * QueryApi - factory interface
 * @export
 */
export declare const QueryApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     * send a query to run against a specified array/URI registered to a group/project
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {string} type type of query
     * @param {string} contentType Content Type of input and return mime
     * @param {Query} query query to run
     * @param {string} [xPayer] Name of organization or user who should be charged for this request
     * @param {number} [openAt] open_at for array in unix epoch
     * @param {string} [readAll] If \&quot;true\&quot;, resubmits incomplete queries until the query has completed. Defaults to \&quot;false\&quot;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    submitQuery(namespace: string, array: string, type: string, contentType: string, query: Query, xPayer?: string, openAt?: number, readAll?: string, options?: any): AxiosPromise<any>;
};
/**
 * QueryApi - object-oriented interface
 * @export
 * @class QueryApi
 * @extends {BaseAPI}
 */
export declare class QueryApi extends BaseAPI {
    /**
     * send a query to run against a specified array/URI registered to a group/project
     * @param {string} namespace namespace array is in (an organization name or user\&#39;s username)
     * @param {string} array name/uri of array that is url-encoded
     * @param {string} type type of query
     * @param {string} contentType Content Type of input and return mime
     * @param {Query} query query to run
     * @param {string} [xPayer] Name of organization or user who should be charged for this request
     * @param {number} [openAt] open_at for array in unix epoch
     * @param {string} [readAll] If \&quot;true\&quot;, resubmits incomplete queries until the query has completed. Defaults to \&quot;false\&quot;.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof QueryApi
     */
    submitQuery(namespace: string, array: string, type: string, contentType: string, query: Query, xPayer?: string, openAt?: number, readAll?: string, options?: any): Promise<import("axios").AxiosResponse<any>>;
}
