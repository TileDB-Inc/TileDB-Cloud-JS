import { QueryData } from "../TileDBQuery/TileDBQuery";
import { Dimension } from "../v1";
declare const getRanges: (ranges: QueryData["ranges"], dimensions: Dimension[], hasDefaultRange?: boolean) => {
    type: import("../v1").Datatype;
    hasDefaultRange: boolean;
    buffer: any;
    bufferSizes: number[];
    bufferStartSizes: number[];
}[];
export default getRanges;
