import { Query as QueryType } from "../v2";
/**
 * Serialize the Query object to capnp
 * @param data Query javascript object
 * @returns ArrayBuffer of the capnp Query object
 */
declare const capnpQuerySerializer: (data: Partial<QueryType>) => ArrayBuffer;
export default capnpQuerySerializer;
