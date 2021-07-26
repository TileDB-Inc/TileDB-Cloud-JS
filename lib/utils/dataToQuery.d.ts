import { Attribute, Dimension } from "../v1";
import { Query } from "../v2";
export interface QueryData extends Pick<Query, "layout"> {
    ranges: Array<number[] | Array<number[]>>;
    bufferSize: number;
}
declare const dataToQuery: (data: QueryData, attributes: Attribute[], dimensions: Dimension[]) => Query;
export default dataToQuery;
