import { ArraySchema } from "../v1";
import { QueryWrite } from "../TileDBQuery/TileDBQuery";
declare const getWriterBody: (data: QueryWrite, arraySchema: ArraySchema) => ArrayBufferLike;
export default getWriterBody;
