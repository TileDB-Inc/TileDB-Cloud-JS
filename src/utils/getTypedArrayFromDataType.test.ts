import getTypedArrayFromDataType from "./getTypedArrayFromDataType";
import { Datatype } from "../v2";

describe("getTypedArrayFromDataType()", () => {
  it("Should return Float32Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Float32)).toEqual(Float32Array);
  });

  it("Should return Float64Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Float64)).toEqual(Float64Array);
  });

  it("Should return Int8Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Int8)).toEqual(Int8Array);
  });

  it("Should return Uint8Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Uint8)).toEqual(Uint8Array);
  });

  it("Should return Uint16Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Uint16)).toEqual(Uint16Array);
  });

  it("Should return Int16Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Int16)).toEqual(Int16Array);
  });

  it("Should return Int32Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Int32)).toEqual(Int32Array);
  });

  it("Should return Uint32Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Uint32)).toEqual(Uint32Array);
  });

  it("Should return BigInt64Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Int64)).toEqual(BigInt64Array);
  });

  it("Should return BigUint64Array", () => {
    expect(getTypedArrayFromDataType(Datatype.Uint64)).toEqual(BigUint64Array);
  });
});
