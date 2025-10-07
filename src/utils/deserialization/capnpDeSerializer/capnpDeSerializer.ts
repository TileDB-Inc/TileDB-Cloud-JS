import * as capnp from 'capnp-es';
import { ArrayMetadata, Query as QueryCapnp } from '../../../capnp/rest';
import capnpQueryDeSerializer, {
  deserializeAttributeBufferHeaders
} from '../capnpQueryDeSerializer';
import capnpArrayDeserializer from '../capnpArrayDeserializer';
import { AttributeBufferHeader, QueryStatus } from '../../../v3';

export enum DeserializableType {
  'arrayMetadata',
  'query',
  'array'
}

export const deserializeCapnp = (data: unknown, type: DeserializableType) => {
  if (!isArrayBuffer(data)) {
    throw new Error('Data is not of type ArrayBuffer');
  }
  if (type === DeserializableType.array) {
    return capnpArrayDeserializer(data);
  }
  if (type === DeserializableType.query) {
    return capnpQueryDeSerializer(data);
  }
  if (type === DeserializableType.arrayMetadata) {
    return capnpArrayMetadaDeSerializer(data);
  }
};

const capnpArrayMetadaDeSerializer = (
  buffer: ArrayBuffer | ArrayBufferView<ArrayBufferLike>
) => {
  const message = new capnp.Message(buffer, false);
  const arrayMetadata = message.getRoot(ArrayMetadata);
  const entries = arrayMetadata.entries.map(entry => {
    const value = entry.value.toArray();

    return {
      value,
      del: entry.del,
      key: entry.key,
      type: entry.type,
      valueNum: entry.valueNum
    };
  });
  return { entries };
};

const isArrayBuffer = (data: Partial<ArrayBuffer>): data is ArrayBuffer => {
  if (data && data.byteLength && data.slice) {
    return true;
  }
  return false;
};

export function getQueryStatus(
  bufferView: ArrayBufferView<ArrayBuffer>
): QueryStatus {
  return new capnp.Message(bufferView, false).getRoot(QueryCapnp)
    .status as QueryStatus;
}

export function getQueryAttributeHeaders(
  bufferView: ArrayBufferView<ArrayBuffer>
): Array<AttributeBufferHeader> {
  return deserializeAttributeBufferHeaders(
    new capnp.Message(bufferView, false).getRoot(QueryCapnp)
  );
}
