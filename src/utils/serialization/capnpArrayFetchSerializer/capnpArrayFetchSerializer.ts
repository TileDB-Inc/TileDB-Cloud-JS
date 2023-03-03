import { ArrayFetch } from "../../../v2";
import * as capnp from "capnp-ts";
import { ArrayOpen } from "../../../capnp/query_capnp";

const capnpArrayFetchSerializer = (arrayFetch: ArrayFetch): ArrayBuffer => {
  const message = new capnp.Message();
  const arrayFetchData = message.initRoot(ArrayOpen);

  arrayFetchData.setQueryType(arrayFetch.queryType || "READ");
  const entriesLength = arrayFetch.config?.entries?.length;
  if (entriesLength) {
    const config = arrayFetchData.initConfig();
    const entries = config.initEntries(entriesLength);

    arrayFetch.config?.entries?.forEach((entry, i) => {
      const entryData = entries.get(i);
      entryData.setKey(entry.key as string);
      entryData.setValue(entry.value as string);
    });
  }

  return message.toArrayBuffer();
};

export default capnpArrayFetchSerializer;
