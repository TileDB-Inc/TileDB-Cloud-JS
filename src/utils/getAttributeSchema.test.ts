import attributesAndDomains from "../fixtures/attributesAndDomains";
import getAttributeSchema from "./getAttributeSchema";

describe("getAttributeSchema()", () => {
  it("Should find the attribute/domain schema needed by name", () => {
    const result = getAttributeSchema("a2", attributesAndDomains);

    expect(result).toEqual({
      cellValNum: 4294967295,
      filterPipeline: {},
      name: "a2",
      type: 'INT32',
    });
  });
});
