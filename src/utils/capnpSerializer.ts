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
      const data = entry.initValue(entryData.value.length);
      const buffer = new Uint32Array(entryData.value).buffer;
      data.copyBuffer(buffer);
      // const dataBox = new capnp.Message().initRoot(DataBox);
      // dataBox.initValue(entryData.value.length);
      // // dataBox.setValue(entryData.value);
      // const a = dataBox.getValue()
      
      entry.setValue(data);
      entry.setDel(entryData.del);
    });

    return metadata;
  }
};

export default capnpSerializer;
