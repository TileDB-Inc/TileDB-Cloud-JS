import { Attribute, Dimension } from "../v1";
import { Query } from "../v2";
import { QueryData } from "../TileDBQuery/TileDBQuery";
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
declare const dataToQuery: (data: QueryData, attributes: Attribute[], dimensions: Dimension[]) => Query;
export default dataToQuery;