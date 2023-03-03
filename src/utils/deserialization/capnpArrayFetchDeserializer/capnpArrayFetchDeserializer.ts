import { ArrayFetch, Querytype } from '../../../v2';
import { deserializeConfig } from "./../capnpQueryDeSerializer/capnpQueryDeSerializer";
import { ArrayOpen } from "../../../capnp/query_capnp";
import * as capnp from "capnp-ts";

const capnpArrayFetchDeserializer = (buffer: ArrayBuffer): ArrayFetch => {
  const message = new capnp.Message(buffer, false);
  const arrayOpen = message.getRoot(ArrayOpen);

  return {
    queryType: arrayOpen.getQueryType() as Querytype,
    config: deserializeConfig(arrayOpen.getConfig()),
  };
};

export default capnpArrayFetchDeserializer;
