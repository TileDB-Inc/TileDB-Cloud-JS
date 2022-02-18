import { getResultsFromArrayBuffer } from "./getResultsFromArrayBuffer";
import { readFileSync } from "fs";
import path from "path";
import convertToArrayBufferIfNodeBuffer from "./convertToArrayBufferIfNodeBuffer";
import {
  fixedAttrBufferHeaders,
  nullableVarLengthAttrBufferHeaders,
} from "../fixtures/attributeBufferHeaders";
import {
  fixedLenAttributesSchema,
  varLenNullableAttributesSchema,
} from "../fixtures/attributes";

describe("getResultsFromArrayBuffer()", () => {
  it("Should convert a raw ArrayBuffer to a results object with fixed length attributes", async () => {
    const file = path.join(__dirname, "../fixtures/fixed_buffer.raw");
    const rawBuffer = readFileSync(file);
    const arrayBufferOfFixedLengthAttributes =
      convertToArrayBufferIfNodeBuffer(rawBuffer);

    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      fixedAttrBufferHeaders,
      fixedLenAttributesSchema
    );

    expect(results).toEqual({
      a0: [222, 0, 234, 17, 53, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      a3: [111, 0, 23, 44, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      cols: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
      rows: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4],
    });
  });

  it("Should convert a raw ArrayBuffer to a results object with var length & nullable attributes", async () => {
    const file = path.join(__dirname, "../fixtures/nullable_buffer.raw");
    const rawBuffer = readFileSync(file);
    const arrayBufferOfFixedLengthAttributes =
      convertToArrayBufferIfNodeBuffer(rawBuffer);

    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      nullableVarLengthAttrBufferHeaders,
      varLenNullableAttributesSchema
    );
    // expect(results).toEqual("");

    expect(results).toEqual({
      a1: [100, null, null, 400],
      a2: [null, [20], [30, 30, 30], null],
      a3: ["abc", null, null, "dddddewxyz"],
      cols: [1, 2, 1, 2],
      rows: [1, 1, 2, 2],
    });
  });
});
