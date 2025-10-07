import { ArrayFetch } from '../../../v2';
import * as capnp from 'capnp-es';
import { ArrayOpen } from '../../../capnp/rest';

const capnpArrayFetchSerializer = (arrayFetch: ArrayFetch): ArrayBuffer => {
  const message = new capnp.Message();
  const arrayFetchData = message.initRoot(ArrayOpen);

  arrayFetchData.queryType = arrayFetch.queryType || 'READ';
  const entriesLength = arrayFetch.config?.entries?.length;
  if (entriesLength) {
    const config = arrayFetchData._initConfig();
    const entries = config._initEntries(entriesLength);

    arrayFetch.config?.entries?.forEach((entry, i) => {
      const entryData = entries.get(i);
      entryData.key = entry.key as string;
      entryData.value = entry.value as string;
    });
  }

  return message.toArrayBuffer();
};

export default capnpArrayFetchSerializer;
