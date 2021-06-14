const serializer = require("../lib/utils/capnpSerializer");

test("serializer", () => {
  const data = {
    entries: [
      {
        key: "file_size",
        type: "INT64",
        valueNum: 1,
        value: [248, 14, 0, 0, 0, 0, 0, 0],
        del: true,
      },
      {
        key: "format",
        type: "STRING_UTF8",
        valueNum: 148,
        value: [106, 115, 111, 110],
        del: false,
      },
      {
        key: "type",
        type: "STRING_UTF8",
        valueNum: 12,
        value: [110, 111, 116, 101, 98, 111, 111, 107, 122, 136],
        del: false,
      },
    ],
  };
  const serializedData = serializer.default(data);
  expect(serializedData.toString()).toBe(
    "ArrayMetadata_Struct_Pointer_0@0x00000000,[00 00 00 00 00 00 01 00],limit:0x7fffffff"
  );
});
