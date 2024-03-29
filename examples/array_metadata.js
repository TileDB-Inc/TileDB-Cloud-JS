const tiledb = require("../lib");

const config = new tiledb.v1.Configuration({
  apiKey: process.env.TDB_API_KEY,
});
const arrayApi = new tiledb.v1.ArrayApi(config);

arrayApi
  .updateArrayMetadataCapnp(
    "ns",
    "array_name",
    {
      entries: [
        {
          key: "a1",
          type: "INT32",
          valueNum: 2,
          value: [1, 0, 0, 0, 2, 0, 0, 0],
          del: false,
        },
        {
          key: "a2",
          type: "UINT8",
          valueNum: 3,
          value: [97, 98, 99],
          del: false,
        },
        {
          key: "a3",
          type: "FLOAT32",
          valueNum: 3,
          value: [201, 204, 140, 63, 205, 204, 140, 63, 205, 204, 12, 64],
          del: false,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/capnp",
      },
    }
  )
  .then((data) => {
    console.log(data);
  })
  .catch((ex) => {
    console.log(ex);
  });

arrayApi
  .getArrayMetadataCapnp("ns", "array_name", {
    headers: {
      "Accept": "application/capnp",
    },
  })
  .then((data) => {
    console.log(tiledb.deserializeCapnp(data.data, tiledb.DeserializableType.arrayMetadata));
  })
  .catch((ex) => {
    console.log(ex);
  });
