import range from "./range";
import { describe, it, expect } from "vitest";

describe("range()", () => {
  it("Should create a range from 0 to N", () => {
    const result = range(0, 10);

    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
