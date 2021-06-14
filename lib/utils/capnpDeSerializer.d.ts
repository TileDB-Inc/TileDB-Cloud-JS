import { ArrayMetadata } from "../capnp/arrayMetadata.capnp";
declare const capnpDeSerializer: (buffer: ArrayBuffer | ArrayBufferLike) => ArrayMetadata;
export default capnpDeSerializer;
