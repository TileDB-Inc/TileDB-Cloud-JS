const serializer = require("../lib/utils/capnpSerializer");
const deSerializer = require("../lib/utils/capnpDeSerializer");

test("serializer", () => {
  const data = {
    entries: [
      {
        key: "file_size",
        type: "INT64",
        valueNum: 3,
        value: [10, 8, 12, 3],
        del: true,
      },
      {
        key: "format",
        type: "STRING_UTF8",
        valueNum: 4,
        value: [106, 115, 111, 110],
        del: false,
      },
      {
        key: "type",
        type: "STRING_UTF8",
        valueNum: 8,
        value: [110, 111, 116, 101, 98, 111, 111, 107],
        del: false,
      },
    ],
  };
  const serializedData = serializer.default(data);
  expect(serializedData.toString()).toBe(
    "Message_arena:SingleSegmentArena_len:0x1000"
  );

  const deSerialized = deSerializer.default(
    serializedData.toPackedArrayBuffer()
  );

  expect(deSerialized.toString()).toBe(
    "ArrayMetadata_Struct_Pointer_0@0x00000000,[00 00 00 00 00 00 01 00],limit:0x7fffffff"
  );
  deSerialized.getEntries().forEach((entry, i) => {
    const value = entry.getValue().toArray();

    expect(value).toEqual(data.entries[i].value);
    expect(entry.getDel()).toBe(data.entries[i].del);
    expect(entry.getKey()).toBe(data.entries[i].key);
    expect(entry.getType()).toBe(data.entries[i].type);
    expect(entry.getValueNum()).toBe(data.entries[i].valueNum);
  });
});
