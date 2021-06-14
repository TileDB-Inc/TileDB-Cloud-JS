import { ArrayMetadata } from "../capnp/arrayMetadata.capnp";
import * as capnp from "capnp-ts";

const capnpSerializer = (data: any) => {
  if (data && Array.isArray(data.entries)) {
    const entriesLength = data.entries.length;
    const message = new capnp.Message();
    const metadata = message.initRoot(ArrayMetadata);
    const entries = metadata.initEntries(entriesLength);

    data.entries.forEach((entryData, i) => {
      const entry = entries.get(i);
      entry.setKey(entryData.key);
      entry.setType(entryData.type);
      entry.setValueNum(entryData.valueNum);
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

    return message;
  }
};

export default capnpSerializer;
