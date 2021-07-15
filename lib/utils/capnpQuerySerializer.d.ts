import { Query as QueryType } from "../v2";
declare const capnpQuerySerializer: (data: Partial<QueryType>) => ArrayBuffer;
export default capnpQuerySerializer;
