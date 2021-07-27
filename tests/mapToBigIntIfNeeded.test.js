const mapToBigIntIfNeeded = require("../lib/utils/mapToBigIntIfNeeded");
const { Datatype } = require("../lib/v2");


describe("mapToBigIntIfNeeded()", () => {
    it('Should return array of numbers if not an int64 type', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.Int32)).toEqual([1, 2, 3]);
    });

    it('Should return Array of bigInts if type is int64', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.Int64)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is uint64', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.Uint64)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeAs', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeAs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeDay', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeDay)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeFs', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeFs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeHr', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeHr)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeMin', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeMin)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeMonth', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeMonth)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeMs', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeMs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeNs', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeNs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimePs', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimePs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeSec', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeSec)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeUs', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeUs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeWeek', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeWeek)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeYear', () => {
        expect(mapToBigIntIfNeeded.default([1, 2, 3], Datatype.DatetimeYear)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });
});