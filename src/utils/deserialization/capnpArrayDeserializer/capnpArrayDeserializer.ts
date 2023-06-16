import { Array as ArrayCapnp } from '../../../capnp/query_capnp';
import * as capnp from 'capnp-ts';
import { deserializeArray } from '../capnpQueryDeSerializer';

const capnpArrayDeserializer = (buffer: ArrayBuffer) => {
  const message = new capnp.Message(buffer, false);
  const array = message.getRoot(ArrayCapnp);
  return deserializeArray(array);
};

export default capnpArrayDeserializer;
