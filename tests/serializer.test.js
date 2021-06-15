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
  expect(serializedData.byteLength).toBe(
    224
  );

  const deSerialized = deSerializer.capnpArrayMetadaDeSerializer(
    serializedData
  );

  expect(deSerialized).toEqual(
    data
  );
});
