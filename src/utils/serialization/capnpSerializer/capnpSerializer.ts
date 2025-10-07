import { ArrayMetadata } from '../../../capnp/rest';
import { ArrayFetch } from '../../../v2';
import { Query } from '../../../v3';
import * as capnp from 'capnp-es';
import { ArrayMetadata as ArrayMetadataType } from '../../../v1/api';
import capnpQuerySerializer from '../capnpQuerySerializer';
import capnpArrayFetchSerializer from '../capnpArrayFetchSerializer';

const capnpSerializer = (data: unknown): ArrayBuffer => {
  if (isArrayFetch(data)) {
    return capnpArrayFetchSerializer(data);
  } else if (isArrayMetadata(data)) {
    return serializeArrayMetadata(data);
  } else if (isQuerydata(data)) {
    return capnpQuerySerializer(data);
  }

  return data as ArrayBuffer;
};

export default capnpSerializer;

const serializeArrayMetadata = (data: ArrayMetadataType) => {
  const entriesLength = data.entries.length;
  const message = new capnp.Message();
  const metadata = message.initRoot(ArrayMetadata);
  const entries = metadata._initEntries(entriesLength);

  data.entries.forEach((entryData, i) => {
    const entry = entries.get(i);
    entry.key = entryData.key;
    entry.type = entryData.type;
    entry.valueNum = entryData.valueNum;
    const valueLength = entryData.value.length;
    const data = entry._initValue(valueLength);
    const arrBuffer = new ArrayBuffer(valueLength);
    const view = new Uint8Array(arrBuffer);
    entryData.value.forEach((num, i) => {
      view[i] = num;
    });
    data.copyBuffer(view);
    entry.value = data;
    entry.del = entryData.del;
  });

  return message.toArrayBuffer();
};

const isArrayMetadata = (
  data: Partial<ArrayMetadataType>
): data is ArrayMetadataType => {
  if (data && Array.isArray(data.entries)) {
    return true;
  }
  return false;
};

const isQuerydata = (data?: Partial<Query>): data is Query => {
  if (data && (data.denseReader || data.writer || data.reader)) {
    return true;
  }
  return false;
};

const isArrayFetch = (data: Partial<ArrayFetch>): data is ArrayFetch => {
  if (data && data.queryType && data.config) {
    return true;
  }
  return false;
};
