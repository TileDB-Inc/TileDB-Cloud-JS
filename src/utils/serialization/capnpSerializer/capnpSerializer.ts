import { ArrayMetadata } from '../../../capnp/arrayMetadata_capnp';
import { ArrayFetch, Query } from '../../../v2';
import * as capnp from 'capnp-ts';
import { ArrayMetadata as ArrayMetadataType } from '../../../v1/api';
import capnpQuerySerializer from '../capnpQuerySerializer';
import capnpArrayFetchSerializer from '../capnpArrayFetchSerializer';

const capnpSerializer = (data: any) => {
  if (isArrayFetch(data)) {
    return capnpArrayFetchSerializer(data);
  } else if (isArrayMetadata(data)) {
    return serializeArrayMetadata(data);
  } else if (isQuerydata(data)) {
    return capnpQuerySerializer(data);
  }

  return data;
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

  return message.toArrayBuffer();
};

const isArrayMetadata = (data: any): data is ArrayMetadataType => {
  if (data && Array.isArray(data.entries)) {
    return true;
  }
  return false;
};

const isQuerydata = (data: any): data is Query => {
  if (data && (data.reader || data.writer)) {
    return true;
  }
  return false;
};

const isArrayFetch = (data: any): data is ArrayFetch => {
  if (data && data.queryType && data.config) {
    return true;
  }
  return false;
};
