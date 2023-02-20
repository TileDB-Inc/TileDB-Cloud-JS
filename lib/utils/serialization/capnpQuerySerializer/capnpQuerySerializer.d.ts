import { Query as QueryType, ArrayData } from "../../../v2";
import { Array as ArrayCapnp } from "../../../capnp/query_capnp";
/**
 * Serialize the Query object to capnp
 * @param data Query javascript object
 * @returns ArrayBuffer of the capnp Query object
 */
declare const capnpQuerySerializer: (data: Partial<QueryType>) => ArrayBuffer;
export default capnpQuerySerializer;
export declare const serializeArrayData: (array: ArrayData) => ArrayBuffer;
export declare const serializeArray: (arrayCapNp: ArrayCapnp, array: ArrayData) => void;
