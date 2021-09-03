const {
  default: getByteLengthOfData,
} = require("../lib/utils/getByteLengthOfdata");
const { Datatype } = require("../lib/v2");

describe("getByteLengthOfData()", () => {
  it("Should return byte length of char", () => {
    expect(getByteLengthOfData(["ENSG00000202059.1"], Datatype.Char)).toEqual(
      17
    );
  });

  it("Should return byte length of uint16", () => {
    expect(getByteLengthOfData([12, 1888], Datatype.Uint16)).toEqual(4);
  });

  it("Should return byte length of uint32", () => {
    expect(getByteLengthOfData([12122, 1888], Datatype.Uint32)).toEqual(8);
  });

  it("Should return byte length of datetime", () => {
    expect(
      getByteLengthOfData([1577836800, 1588878856], Datatype.DatetimeSec)
    ).toEqual(16);
  });
});
