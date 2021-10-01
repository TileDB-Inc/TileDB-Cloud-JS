import * as capnp from "capnp-ts";
import { ArrayMetadata } from "../capnp/arrayMetadata_capnp";
import capnpQueryDeSerializer from './capnpQueryDeSerializer';

export enum DeserializableType {
  "arrayMetadata",
  "query",
}

export const deserializeCapnp = (data: any, type: DeserializableType) => {
  if (!isArrayBuffer(data)) {
    throw new Error(`Data is not of type ArrayBuffer`);
  }
  if (type === DeserializableType.query) {
    return capnpQueryDeSerializer(data);
  }
  if (type === DeserializableType.arrayMetadata) {
    return capnpArrayMetadaDeSerializer(data);
  }
}

const capnpArrayMetadaDeSerializer = (buffer: ArrayBuffer | ArrayBufferLike) => {
  
  const message = new capnp.Message(buffer, false);
  const arrayMetadata = message.getRoot(ArrayMetadata);
  const entries = arrayMetadata.getEntries().map((entry) => {
    const value = entry.getValue().toArray();

    return {
      value,
      del: entry.getDel(),
      key: entry.getKey(),
      type: entry.getType(),
      valueNum: entry.getValueNum(),
    };
  });
  return { entries };
};


const isArrayBuffer = (data: any): data is ArrayBuffer => {
  if (data && data.byteLength && data.slice) {
    return true;
  }
  return false;
}
