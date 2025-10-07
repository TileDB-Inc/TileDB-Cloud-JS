import { Array as ArrayCapnp } from '../../../capnp/rest';
import * as capnp from 'capnp-es';
import { deserializeArray } from '../capnpQueryDeSerializer';

const capnpArrayDeserializer = (buffer: ArrayBuffer) => {
  const message = new capnp.Message(buffer, false);
  const array = message.getRoot(ArrayCapnp);
  return deserializeArray(array);
};

export default capnpArrayDeserializer;
