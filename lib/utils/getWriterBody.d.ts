import { ArraySchema } from "../v1";
import { QueryWrite } from './dataToQueryWriter';
declare const getWriterBody: (data: QueryWrite, arraySchema: ArraySchema) => ArrayBufferLike;
export default getWriterBody;
