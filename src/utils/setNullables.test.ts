import setNullables from "./setNullables";

describe("setNullables()", () => {
  it("Should set NULL in every index with 0", () => {
    const result = setNullables(
      [33, 28, 35, 49, 95, 101],
      [0, 1, 1, 0, 1],
      [0, 1, 3, 4, 5]
    );
    expect(result).toEqual([null, [28, 35], [49], null, [101]]);
  });
});
