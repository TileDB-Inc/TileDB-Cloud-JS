import { QueryWrite } from "../TileDBQuery/TileDBQuery";
import { ArraySchema } from "../v1";
declare const getWriterBody: (data: QueryWrite, arraySchema: ArraySchema) => ArrayBufferLike;
export default getWriterBody;
