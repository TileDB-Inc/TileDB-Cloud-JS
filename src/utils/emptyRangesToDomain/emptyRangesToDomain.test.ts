import { Datatype, Dimension } from "../../v2";
import emptyRangesToDomain from "./emptyRangesToDomain";
import { describe, it, expect } from 'vitest';

describe("emptyRangesToDomain()", () => {
  it("should change empty ranges with the dimensions's domain", () => {
    const dimensions: Dimension[] = [
      {
        domain: null,
        filterPipeline: {},
        name: "rows",
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii,
      },
      {
        domain: {
          int64: [1, 4],
        },
        filterPipeline: {},
        name: "cols",
        nullTileExtent: false,
        tileExtent: {
          int64: 4,
        },
        type: Datatype.Int64,
      },
    ];
    const results = emptyRangesToDomain([[], []], dimensions);

    expect(results).toStrictEqual([[], [1, 4]]);
  });
});
