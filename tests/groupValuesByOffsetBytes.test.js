const {default: groupValuesByOffsets} = require("../lib/utils/groupValuesByOffsets");

describe("groupValuesByOffsets()", () => {
    it("Should group values by offsets", () => {
        const result = groupValuesByOffsets([33, 28, 35, 49, 122, 322, 199, 301, 234, 123, 99, 88], [0, 2, 3, 5, 9])
        expect(result).toEqual([[33, 28], [35], [49, 122], [322, 199, 301, 234], [123, 99, 88]])
    })
})