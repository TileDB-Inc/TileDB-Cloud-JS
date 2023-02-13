import { ValueBuffers } from "./attributeValuesToArrayBuffers";
import { Querystatus, Querytype } from "../v2";
import { QueryWrite } from '../TileDBQuery/TileDBQuery';
import { Dimension } from "../v1";
declare const dataToQueryWriter: (data: QueryWrite, dimensions: Dimension[], valueBuffer: ValueBuffers) => {
    attributeBufferHeaders: {
        name: string;
        fixedLenBufferSizeInBytes: number;
        varLenBufferSizeInBytes: number;
        validityLenBufferSizeInBytes: number;
        originalFixedLenBufferSizeInBytes: number;
        originalVarLenBufferSizeInBytes: number;
        originalValidityLenBufferSizeInBytes: number;
    }[];
    layout: import("../v2").Layout;
    status: Querystatus;
    type: Querytype;
    writer: {
        checkCoordDups: boolean;
        checkCoordOOB: boolean;
        dedupCoords: boolean;
        subarray: {
            int8: any[];
            uint8: any[];
            int16: any[];
            uint16: any[];
            int32: any[];
            uint32: any[];
            int64: any[];
            uint64: any[];
            float32: any[];
            float64: any[];
        };
        subarrayRanges: {
            layout: import("../v2").Layout;
            ranges: {
                type: import("../v1").Datatype;
                hasDefaultRange: boolean;
                buffer: any;
                bufferSizes: number[];
                bufferStartSizes: number[];
            }[];
        };
    };
};
export default dataToQueryWriter;
