const { TileDBQuery } = require("@tiledb-inc/tiledb-cloud");

const tiledbQueries = new TileDBQuery({
    apiKey: 'my_api_key'
});

const ranges = [
    ["ENSG00000202059.1", "ENSG00000202059.1"],
    []
]

const query = {
    layout: "row-major",
    ranges: ranges,
    // set how much memory you need to allocate to your buffers
    bufferSize: 210000,
};

// Iterate over results
(async function() {
    for await (let results of tiledbQueries.ReadQuery("namespace", "array_name", query)) {
        console.log(results);
    }
})()

