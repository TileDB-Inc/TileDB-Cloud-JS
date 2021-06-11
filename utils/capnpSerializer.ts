import { ArrayMetadata } from "../capnp/arrayMetadata.capnp";
import capnp from "capnp-ts";

const capnpSerializer = (data: any) => {
  if (data && Array.isArray(data.entries)) {
    const entriesLength = data.entries.length;
    const message = new capnp.Message();
    const metadata = message.initRoot(ArrayMetadata);
    const entries = metadata.initEntries(entriesLength);

    data.entries.forEach((entryData, i) => {
      const entry = entries.get(i);
      entry.setDel(entryData.del);
      entry.setKey(entryData.key);
      entry.setType(entryData.type);
      entry.setValue(entryData.value);
      entry.setValueNum(entryData.valueNum);
    });

    return message;
  }
};

export default capnpSerializer;
