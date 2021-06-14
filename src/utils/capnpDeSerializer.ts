import { ArrayMetadata } from "../capnp/arrayMetadata.capnp";
import * as capnp from "capnp-ts";

const capnpDeSerializer = (buffer: ArrayBuffer | ArrayBufferLike) => {
    const message = new capnp.Message(buffer);
    return message.getRoot(ArrayMetadata);
}

export default capnpDeSerializer;