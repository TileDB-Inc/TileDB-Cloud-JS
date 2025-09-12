import concatChars from "./concatChars";
import { describe, it, expect } from 'vitest';

describe("concatChars()", () => {
  it("Should concat character array", () => {
    const chars = [
      ["T", "i", "l", "e", "D", "B"],
      ["C", "l", "o", "u", "d"],
    ];
    const result = concatChars(chars);

    expect(result).toEqual(["TileDB", "Cloud"]);
  });

  it("Should ignore nulls in case it's nullable", () => {
    const chars = [
      ["T", "i", "l", "e", "D", "B"],
      null,
      ["C", "l", "o", "u", "d"],
    ];
    const result = concatChars(chars);

    expect(result).toEqual(["TileDB", undefined, "Cloud"]);
  });
});
