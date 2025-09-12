import { varLenNullableAttributesSchema } from "../../fixtures/attributes";
import isAttributeNullable from "./isAttributeNullable";
import { describe, it, expect } from "vitest";

describe("isAttributeNullable()", () => {
  it("Should return false if it is a dimension", () => {
    expect(isAttributeNullable(varLenNullableAttributesSchema[0])).toEqual(
      false
    );
  });
});
