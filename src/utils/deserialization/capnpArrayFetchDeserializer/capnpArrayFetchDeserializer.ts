import { ArrayFetch, Querytype } from '../../../v2';
import { deserializeConfig } from './../capnpQueryDeSerializer/capnpQueryDeSerializer';
import { ArrayOpen } from '../../../capnp/rest';
import * as capnp from 'capnp-es';

const capnpArrayFetchDeserializer = (buffer: ArrayBuffer): ArrayFetch => {
  const message = new capnp.Message(buffer, false);
  const arrayOpen = message.getRoot(ArrayOpen);

  return {
    queryType: arrayOpen.queryType as Querytype,
    config: deserializeConfig(arrayOpen.config)
  };
};

export default capnpArrayFetchDeserializer;
