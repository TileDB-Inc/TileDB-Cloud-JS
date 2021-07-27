const getTypedArrayFromDataType = require("../lib/utils/getTypedArrayFromDataType");
const { Datatype } = require("../lib/v2");


describe("getTypedArrayFromDataType()", () => {
    it('Should return Float32Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Float32)).toEqual(Float32Array)
    });

    it('Should return Float64Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Float64)).toEqual(Float64Array)
    });

    it('Should return Int8Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Int8)).toEqual(Int8Array)
    });

    it('Should return Uint8Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Uint8)).toEqual(Uint8Array)
    });

    it('Should return Uint16Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Uint16)).toEqual(Uint16Array)
    });

    it('Should return Int16Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Int16)).toEqual(Int16Array)
    });

    it('Should return Int32Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Int32)).toEqual(Int32Array)
    });

    it('Should return Uint32Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Uint32)).toEqual(Uint32Array)
    });

    it('Should return BigInt64Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Int64)).toEqual(BigInt64Array)
    });

    it('Should return BigUint64Array', () => {
        expect(getTypedArrayFromDataType.default(Datatype.Uint64)).toEqual(BigUint64Array)
    });
})