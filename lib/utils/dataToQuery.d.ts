import { Attribute } from "../v1";
import { Query } from "../v2";
export interface QueryData extends Pick<Query, "layout"> {
    ranges: Array<number[]>;
    bufferSize: number;
}
declare const dataToQuery: (data: QueryData, attributes: Attribute[]) => Query;
export default dataToQuery;
