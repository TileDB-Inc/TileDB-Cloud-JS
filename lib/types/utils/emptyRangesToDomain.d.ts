import { QueryData } from "../TileDBQuery/TileDBQuery";
import { Dimension } from "../v1";
declare const emptyRangesToDomain: (ranges: QueryData["ranges"], dimensions: Dimension[]) => any[];
export default emptyRangesToDomain;
