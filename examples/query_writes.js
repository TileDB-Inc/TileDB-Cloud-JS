const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");

const tiledbQueries = new TileDBQuery({
  apiKey: "my_api_key",
});

const query = {
  layout: "row-major",
  values: {
    // a1 is a fixed-length attribute
    a1: {
      values: [100, 200, 300, 400],
    },
    // a2 is a var-length attribute
    a2: {
      values: [10, 10, 20, 30, 30, 30, 40, 40],
      offsets: [0, 8, 12, 24],
    },
    // a3 is a var-length nullable attribute
    a3: {
      values: ["abccccdddddewxyz"],
      offsets: [0, 3, 5, 6],
      validity: [1, 0, 0, 1],
    },
  },
};

tiledbQueries
  .WriteQuery("namespace", "array_name", query)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.error(e);
  });
