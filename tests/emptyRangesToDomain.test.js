const {
    default: emptyRangesToDomain,
  } = require("../lib/utils/emptyRangesToDomain");


describe("emptyRangesToDomain()", () => {
    it("should change empty ranges with the dimensions's domain", () => {
        const dimensions = [
            {
              "domain": null,
              "filterPipeline": {},
              "name": "rows",
              "nullTileExtent": true,
              "tileExtent": {},
              "type": "STRING_ASCII"
            },
            {
              "domain": {
                "int64": [
                  "1",
                  "4"
                ]
              },
              "filterPipeline": {},
              "name": "cols",
              "nullTileExtent": false,
              "tileExtent": {
                "int64": "4"
              },
              "type": "INT64"
            }
          ];
        const results = emptyRangesToDomain([[], []], dimensions);
        
        expect(results).toEqual([[], ["1", "4"]]);
    })
})