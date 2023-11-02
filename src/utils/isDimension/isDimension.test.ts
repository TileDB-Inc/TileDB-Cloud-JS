import attributesAndDomains from "../../fixtures/attributesAndDomains";
import isDimension from "./isDimension";

describe("isDimension()", () => {
  it("Should return true if it is a dimension", () => {
    expect(isDimension(attributesAndDomains[0])).toEqual(true);
  });

  it("Should return false if it is an attribute", () => {
    expect(isDimension(attributesAndDomains[1])).toEqual(false);
  });
});
