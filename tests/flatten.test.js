const flatten = require("../lib/utils/flatten");


describe("flatten()", () => {
    it('Should flatten array', () => {
        expect(flatten.default([1, 2, [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
    })
})