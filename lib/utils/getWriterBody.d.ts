import { QueryWrite } from "../TileDBQuery/TileDBQuery";
import { ArrayData } from "../v2";
declare const getWriterBody: (data: QueryWrite, arrayStruct: ArrayData) => ArrayBufferLike;
export default getWriterBody;
