import { ArrayMetadata } from "../capnp/arrayMetadata.capnp";
import * as capnp from "capnp-ts";
import { ArrayMetadata as ArrayMetadataType } from "../api";

const capnpSerializer = (data: any) => {
  if (isArrayMetadata(data)) {
    return serializeArrayMetadata(data);
  }
};

export default capnpSerializer;

const serializeArrayMetadata = (data: ArrayMetadataType) => {
  const entriesLength = data.entries.length;
  const message = new capnp.Message();
  const metadata = message.initRoot(ArrayMetadata);
  const entries = metadata.initEntries(entriesLength);

  data.entries.forEach((entryData, i) => {
    const entry = entries.get(i);
    entry.setKey(entryData.key);
    entry.setType(entryData.type);
    entry.setValueNum((entryData as any).valueNum);
    const valueLength = entryData.value.length;
    const data = entry.initValue(valueLength);
    const arrBuffer = new ArrayBuffer(valueLength);
    const view = new Uint8Array(arrBuffer);
    entryData.value.forEach((num, i) => {
      view[i] = num;
    });
    data.copyBuffer(view);
    entry.setValue(data);
    entry.setDel(entryData.del);
  });

  return message.toArrayBuffer();
};

const isArrayMetadata = (data: any): data is ArrayMetadataType => {
  if (data && Array.isArray(data.entries)) {
    return true;
  }
  return false;
};
