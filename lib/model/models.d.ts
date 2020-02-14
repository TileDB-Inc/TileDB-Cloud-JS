export * from './aWSAccessCredentials';
export * from './activityEventType';
export * from './arrayActions';
export * from './arrayActivityLog';
export * from './arrayInfo';
export * from './arrayInfoUpdate';
export * from './arrayMetadata';
export * from './arrayMetadataEntry';
export * from './arraySample';
export * from './arraySchema';
export * from './arraySharing';
export * from './arrayTask';
export * from './arrayTaskBrowserSidebar';
export * from './arrayTaskData';
export * from './arrayTaskLog';
export * from './arrayTaskStatus';
export * from './arrayTaskType';
export * from './arrayType';
export * from './attribute';
export * from './attributeBufferHeader';
export * from './attributeBufferSize';
export * from './datatype';
export * from './dimension';
export * from './dimensionCoordinate';
export * from './dimensionTileExtent';
export * from './domain';
export * from './domainArray';
export * from './filter';
export * from './filterData';
export * from './filterOption';
export * from './filterPipeline';
export * from './filterType';
export * from './inlineObject';
export * from './inlineResponse200';
export * from './lastAccessedArray';
export * from './layout';
export * from './maxBufferSizes';
export * from './modelArray';
export * from './modelError';
export * from './namespaceActions';
export * from './nonEmptyDomain';
export * from './organization';
export * from './organizationRoles';
export * from './organizationUser';
export * from './paginationMetadata';
export * from './publicShareFilter';
export * from './query';
export * from './queryReader';
export * from './querystatus';
export * from './querytype';
export * from './readState';
export * from './sQLParameters';
export * from './sSOProvider';
export * from './subarray';
export * from './subarrayPartitioner';
export * from './subarrayPartitionerCurrent';
export * from './subarrayPartitionerState';
export * from './subarrayRanges';
export * from './token';
export * from './tokenRequest';
export * from './uDF';
export * from './uDFSubarray';
export * from './uDFSubarrayRange';
export * from './uDFType';
export * from './user';
export * from './writer';
import localVarRequest = require('request');
export declare class ObjectSerializer {
    static findCorrectType(data: any, expectedType: string): any;
    static serialize(data: any, type: string): any;
    static deserialize(data: any, type: string): any;
}
export interface Authentication {
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}
export declare class HttpBasicAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class ApiKeyAuth implements Authentication {
    private location;
    private paramName;
    apiKey: string;
    constructor(location: string, paramName: string);
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class OAuth implements Authentication {
    accessToken: string;
    applyToRequest(requestOptions: localVarRequest.Options): void;
}
export declare class VoidAuth implements Authentication {
    username: string;
    password: string;
    applyToRequest(_: localVarRequest.Options): void;
}
