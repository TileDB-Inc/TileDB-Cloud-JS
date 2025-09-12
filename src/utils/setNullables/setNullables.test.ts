import setNullables from "./setNullables";
import { describe, it, expect } from "vitest";

describe("setNullables()", () => {
  it("Should set NULL in every index with 0", async () => {
    const result = await setNullables(
      [33, [28, 35], [49], 95, [101]],
      [0, 1, 1, 0, 1]
    );
    expect(result).toEqual([null, [28, 35], [49], null, [101]]);
  });
});
