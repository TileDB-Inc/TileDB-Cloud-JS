import { QueryData } from "../TileDBQuery/TileDBQuery";
import { Dimension } from "../v2";
declare const getRanges: (ranges: QueryData["ranges"], dimensions: Dimension[], hasDefaultRange?: boolean) => {
    type: import("../v2").Datatype;
    hasDefaultRange: boolean;
    buffer: any;
    bufferSizes: number[];
    bufferStartSizes: number[];
}[];
export default getRanges;
