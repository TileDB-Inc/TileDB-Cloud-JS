import { ArrayFetch } from "../../../v2";
import capnpArrayFetchSerializer from "./capnpArrayFetchSerializer";

describe("capnpArrayFetchSerializer()", () => {
  it("Should serialize ArrayFetch object to capnp", () => {
    const arrayFetch = {
      config: {
        entries: [
          { key: "config.env_var_prefix", value: "TILEDB_" },
          { key: "config.logging_format", value: "DEFAULT" },
        ],
      },
      queryType: "READ",
    };
    const result = capnpArrayFetchSerializer(arrayFetch as ArrayFetch);
    expect(result.byteLength).toBe(152);
  });
});
