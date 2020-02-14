"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./aWSAccessCredentials"));
__export(require("./activityEventType"));
__export(require("./arrayActions"));
__export(require("./arrayActivityLog"));
__export(require("./arrayInfo"));
__export(require("./arrayInfoUpdate"));
__export(require("./arrayMetadata"));
__export(require("./arrayMetadataEntry"));
__export(require("./arraySample"));
__export(require("./arraySchema"));
__export(require("./arraySharing"));
__export(require("./arrayTask"));
__export(require("./arrayTaskBrowserSidebar"));
__export(require("./arrayTaskData"));
__export(require("./arrayTaskLog"));
__export(require("./arrayTaskStatus"));
__export(require("./arrayTaskType"));
__export(require("./arrayType"));
__export(require("./attribute"));
__export(require("./attributeBufferHeader"));
__export(require("./attributeBufferSize"));
__export(require("./datatype"));
__export(require("./dimension"));
__export(require("./dimensionCoordinate"));
__export(require("./dimensionTileExtent"));
__export(require("./domain"));
__export(require("./domainArray"));
__export(require("./filter"));
__export(require("./filterData"));
__export(require("./filterOption"));
__export(require("./filterPipeline"));
__export(require("./filterType"));
__export(require("./inlineObject"));
__export(require("./inlineResponse200"));
__export(require("./lastAccessedArray"));
__export(require("./layout"));
__export(require("./maxBufferSizes"));
__export(require("./modelArray"));
__export(require("./modelError"));
__export(require("./namespaceActions"));
__export(require("./nonEmptyDomain"));
__export(require("./organization"));
__export(require("./organizationRoles"));
__export(require("./organizationUser"));
__export(require("./paginationMetadata"));
__export(require("./publicShareFilter"));
__export(require("./query"));
__export(require("./queryReader"));
__export(require("./querystatus"));
__export(require("./querytype"));
__export(require("./readState"));
__export(require("./sQLParameters"));
__export(require("./sSOProvider"));
__export(require("./subarray"));
__export(require("./subarrayPartitioner"));
__export(require("./subarrayPartitionerCurrent"));
__export(require("./subarrayPartitionerState"));
__export(require("./subarrayRanges"));
__export(require("./token"));
__export(require("./tokenRequest"));
__export(require("./uDF"));
__export(require("./uDFSubarray"));
__export(require("./uDFSubarrayRange"));
__export(require("./uDFType"));
__export(require("./user"));
__export(require("./writer"));
const aWSAccessCredentials_1 = require("./aWSAccessCredentials");
const activityEventType_1 = require("./activityEventType");
const arrayActions_1 = require("./arrayActions");
const arrayActivityLog_1 = require("./arrayActivityLog");
const arrayInfo_1 = require("./arrayInfo");
const arrayInfoUpdate_1 = require("./arrayInfoUpdate");
const arrayMetadata_1 = require("./arrayMetadata");
const arrayMetadataEntry_1 = require("./arrayMetadataEntry");
const arraySample_1 = require("./arraySample");
const arraySchema_1 = require("./arraySchema");
const arraySharing_1 = require("./arraySharing");
const arrayTask_1 = require("./arrayTask");
const arrayTaskBrowserSidebar_1 = require("./arrayTaskBrowserSidebar");
const arrayTaskData_1 = require("./arrayTaskData");
const arrayTaskLog_1 = require("./arrayTaskLog");
const arrayTaskStatus_1 = require("./arrayTaskStatus");
const arrayTaskType_1 = require("./arrayTaskType");
const arrayType_1 = require("./arrayType");
const attribute_1 = require("./attribute");
const attributeBufferHeader_1 = require("./attributeBufferHeader");
const attributeBufferSize_1 = require("./attributeBufferSize");
const datatype_1 = require("./datatype");
const dimension_1 = require("./dimension");
const dimensionCoordinate_1 = require("./dimensionCoordinate");
const dimensionTileExtent_1 = require("./dimensionTileExtent");
const domain_1 = require("./domain");
const domainArray_1 = require("./domainArray");
const filter_1 = require("./filter");
const filterData_1 = require("./filterData");
const filterOption_1 = require("./filterOption");
const filterPipeline_1 = require("./filterPipeline");
const filterType_1 = require("./filterType");
const inlineObject_1 = require("./inlineObject");
const inlineResponse200_1 = require("./inlineResponse200");
const lastAccessedArray_1 = require("./lastAccessedArray");
const layout_1 = require("./layout");
const maxBufferSizes_1 = require("./maxBufferSizes");
const modelArray_1 = require("./modelArray");
const modelError_1 = require("./modelError");
const namespaceActions_1 = require("./namespaceActions");
const nonEmptyDomain_1 = require("./nonEmptyDomain");
const organization_1 = require("./organization");
const organizationRoles_1 = require("./organizationRoles");
const organizationUser_1 = require("./organizationUser");
const paginationMetadata_1 = require("./paginationMetadata");
const publicShareFilter_1 = require("./publicShareFilter");
const query_1 = require("./query");
const queryReader_1 = require("./queryReader");
const querystatus_1 = require("./querystatus");
const querytype_1 = require("./querytype");
const readState_1 = require("./readState");
const sQLParameters_1 = require("./sQLParameters");
const sSOProvider_1 = require("./sSOProvider");
const subarray_1 = require("./subarray");
const subarrayPartitioner_1 = require("./subarrayPartitioner");
const subarrayPartitionerCurrent_1 = require("./subarrayPartitionerCurrent");
const subarrayPartitionerState_1 = require("./subarrayPartitionerState");
const subarrayRanges_1 = require("./subarrayRanges");
const token_1 = require("./token");
const tokenRequest_1 = require("./tokenRequest");
const uDF_1 = require("./uDF");
const uDFSubarray_1 = require("./uDFSubarray");
const uDFSubarrayRange_1 = require("./uDFSubarrayRange");
const uDFType_1 = require("./uDFType");
const user_1 = require("./user");
const writer_1 = require("./writer");
let primitives = [
    "string",
    "boolean",
    "double",
    "integer",
    "long",
    "float",
    "number",
    "any"
];
let enumsMap = {
    "ActivityEventType": activityEventType_1.ActivityEventType,
    "ArrayActions": arrayActions_1.ArrayActions,
    "ArrayTaskStatus": arrayTaskStatus_1.ArrayTaskStatus,
    "ArrayTaskType": arrayTaskType_1.ArrayTaskType,
    "ArrayType": arrayType_1.ArrayType,
    "Datatype": datatype_1.Datatype,
    "FilterOption": filterOption_1.FilterOption,
    "FilterType": filterType_1.FilterType,
    "Layout": layout_1.Layout,
    "NamespaceActions": namespaceActions_1.NamespaceActions,
    "OrganizationRoles": organizationRoles_1.OrganizationRoles,
    "PublicShareFilter": publicShareFilter_1.PublicShareFilter,
    "Querystatus": querystatus_1.Querystatus,
    "Querytype": querytype_1.Querytype,
    "SSOProvider": sSOProvider_1.SSOProvider,
    "UDFType": uDFType_1.UDFType,
};
let typeMap = {
    "AWSAccessCredentials": aWSAccessCredentials_1.AWSAccessCredentials,
    "ArrayActivityLog": arrayActivityLog_1.ArrayActivityLog,
    "ArrayInfo": arrayInfo_1.ArrayInfo,
    "ArrayInfoUpdate": arrayInfoUpdate_1.ArrayInfoUpdate,
    "ArrayMetadata": arrayMetadata_1.ArrayMetadata,
    "ArrayMetadataEntry": arrayMetadataEntry_1.ArrayMetadataEntry,
    "ArraySample": arraySample_1.ArraySample,
    "ArraySchema": arraySchema_1.ArraySchema,
    "ArraySharing": arraySharing_1.ArraySharing,
    "ArrayTask": arrayTask_1.ArrayTask,
    "ArrayTaskBrowserSidebar": arrayTaskBrowserSidebar_1.ArrayTaskBrowserSidebar,
    "ArrayTaskData": arrayTaskData_1.ArrayTaskData,
    "ArrayTaskLog": arrayTaskLog_1.ArrayTaskLog,
    "Attribute": attribute_1.Attribute,
    "AttributeBufferHeader": attributeBufferHeader_1.AttributeBufferHeader,
    "AttributeBufferSize": attributeBufferSize_1.AttributeBufferSize,
    "Dimension": dimension_1.Dimension,
    "DimensionCoordinate": dimensionCoordinate_1.DimensionCoordinate,
    "DimensionTileExtent": dimensionTileExtent_1.DimensionTileExtent,
    "Domain": domain_1.Domain,
    "DomainArray": domainArray_1.DomainArray,
    "Filter": filter_1.Filter,
    "FilterData": filterData_1.FilterData,
    "FilterPipeline": filterPipeline_1.FilterPipeline,
    "InlineObject": inlineObject_1.InlineObject,
    "InlineResponse200": inlineResponse200_1.InlineResponse200,
    "LastAccessedArray": lastAccessedArray_1.LastAccessedArray,
    "MaxBufferSizes": maxBufferSizes_1.MaxBufferSizes,
    "ModelArray": modelArray_1.ModelArray,
    "ModelError": modelError_1.ModelError,
    "NonEmptyDomain": nonEmptyDomain_1.NonEmptyDomain,
    "Organization": organization_1.Organization,
    "OrganizationUser": organizationUser_1.OrganizationUser,
    "PaginationMetadata": paginationMetadata_1.PaginationMetadata,
    "Query": query_1.Query,
    "QueryReader": queryReader_1.QueryReader,
    "ReadState": readState_1.ReadState,
    "SQLParameters": sQLParameters_1.SQLParameters,
    "Subarray": subarray_1.Subarray,
    "SubarrayPartitioner": subarrayPartitioner_1.SubarrayPartitioner,
    "SubarrayPartitionerCurrent": subarrayPartitionerCurrent_1.SubarrayPartitionerCurrent,
    "SubarrayPartitionerState": subarrayPartitionerState_1.SubarrayPartitionerState,
    "SubarrayRanges": subarrayRanges_1.SubarrayRanges,
    "Token": token_1.Token,
    "TokenRequest": tokenRequest_1.TokenRequest,
    "UDF": uDF_1.UDF,
    "UDFSubarray": uDFSubarray_1.UDFSubarray,
    "UDFSubarrayRange": uDFSubarrayRange_1.UDFSubarrayRange,
    "User": user_1.User,
    "Writer": writer_1.Writer,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType;
            }
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType;
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType;
                    }
                    else {
                        return expectedType;
                    }
                }
                else {
                    return expectedType;
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            let subType = type.replace("Array<", "");
            subType = subType.substring(0, subType.length - 1);
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return data.toISOString();
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            type = this.findCorrectType(data, type);
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            let subType = type.replace("Array<", "");
            subType = subType.substring(0, subType.length - 1);
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}
exports.ObjectSerializer = ObjectSerializer;
class HttpBasicAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username, password: this.password
        };
    }
}
exports.HttpBasicAuth = HttpBasicAuth;
class ApiKeyAuth {
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
        this.apiKey = '';
    }
    applyToRequest(requestOptions) {
        if (this.location == "query") {
            requestOptions.qs[this.paramName] = this.apiKey;
        }
        else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
        else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}
exports.ApiKeyAuth = ApiKeyAuth;
class OAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}
exports.OAuth = OAuth;
class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(_) {
    }
}
exports.VoidAuth = VoidAuth;
//# sourceMappingURL=models.js.map