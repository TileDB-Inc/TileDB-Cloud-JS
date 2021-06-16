import { ArrayMetadata as ArrayMetadataType } from './../api';
import { ArrayMetadata } from "../capnp/arrayMetadata.capnp";
import * as capnp from "capnp-ts";

export const capnpArrayMetadaDeSerializer = (buffer: ArrayBuffer | ArrayBufferLike | ArrayMetadataType) => {
  if (!isArrayBuffer(buffer)) {
    throw new Error(`Data is not of type ArrayBuffer`);
  }
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