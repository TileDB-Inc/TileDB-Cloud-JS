import { ArrayData } from "../v2";
import { ArraySchema, Query } from "../v2";
import { QueryData } from "../TileDBQuery/TileDBQuery";
import { Options } from "./getResultsFromArrayBuffer";
/**
 * Helper function that takes user data and returns a Query object.
 * Since the Query object is really big we don't expect user to manually set all the values.
 * We get the essential minimal data needed from the user (such as the layout and ranges) and
 * convert it to a Query object.
 * @param data
 * @param attributes
 * @param dimensions
 * @returns Query object
 */
declare const dataToQuery: (data: QueryData, arraySchema: ArraySchema, array: ArrayData, options: Options) => Query;
export default dataToQuery;
