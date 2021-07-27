const rangesToBuffer = require("../lib/utils/rangesToBuffer");
const { Datatype } = require("../lib/v2");


describe("rangesToBuffer()", () => {
    it('should convert int16', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Int16);
        expect(res).toEqual([1, 0, 2, 0, 3, 0]);
    });

    it('should convert uint16', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Uint16);
        expect(res).toEqual([1, 0, 2, 0, 3, 0]);
    });

    it('should convert int8', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Int8);
        expect(res).toEqual([1, 2, 3]);
    });

    it('should convert uint8', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Uint8);
        expect(res).toEqual([1, 2, 3]);
    });

    it('should convert int32', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Int32);
        expect(res).toEqual([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0]);
    });

    it('should convert uint32', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Uint32);
        expect(res).toEqual([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0]);
    });

    it('should convert int64', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Int64);
        expect(res).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0]);
    });

    it('should convert uint64', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Uint64);
        expect(res).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0]);
    });

    it('should convert Float64', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Float64);
        expect(res).toEqual([0, 0, 0, 0, 0, 0, 240, 63, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 8, 64]);
    });

    it('should convert Float32', () => {
        const res = rangesToBuffer.default([1,2,3], Datatype.Float32);
        expect(res).toEqual([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]);
    });

    it('should convert StringAscii', () => {
        const res = rangesToBuffer.default(['a', 'c'], Datatype.StringAscii);
        expect(res).toEqual([97, 99]);
    });

    it('should convert DatetimeSec', () => {
        const res = rangesToBuffer.default([1577836800, 1588878856], Datatype.DatetimeSec);
        expect(res).toEqual([0, 225, 11, 94, 0, 0, 0, 0, 8, 94, 180, 94, 0, 0, 0, 0]);
    });
})