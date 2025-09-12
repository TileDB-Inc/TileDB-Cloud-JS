import isArrayOfArrays from "./isArrayOfArrays";
import { describe, it, expect } from "vitest";

describe("isArrayOfArrays()", () => {
  it("Should return true if value is a multidimensional array", () => {
    expect(isArrayOfArrays([[]])).toBeTruthy();
  });

  it("Should return false if value is an array", () => {
    expect(isArrayOfArrays(["a", "b"])).toBeFalsy();
  });

  it("Should return false if value is not an array", () => {
    expect(isArrayOfArrays(1)).toBeFalsy();
  });
});
