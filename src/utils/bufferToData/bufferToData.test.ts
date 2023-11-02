import bufferToData from './bufferToData';
import { Datatype } from '../../v2';


describe("bufferToData()", () => {
    it('should convert buffer int16 arraybuffer', () => {
        const nums = Int16Array.from([2, 8, 32 ,44])
        const res = bufferToData(nums.buffer, Datatype.Int16);

        expect(nums.byteLength).toBe(8);
        expect(res).toEqual([2, 8, 32, 44]);
    });

    it('should convert buffer uint16 arraybuffer', () => {
        const nums = Uint16Array.from([2, 8, 32 ,44])
        const res = bufferToData(nums.buffer, Datatype.Uint16);

        expect(nums.byteLength).toBe(8);
        expect(res).toEqual([2, 8, 32, 44]);
    });

    it('should convert buffer int32 arraybuffer', () => {
        const nums = Int32Array.from([2, 8, 32 ,44])
        const res = bufferToData(nums.buffer, Datatype.Int32);
        expect(nums.byteLength).toBe(16);
        expect(res).toEqual([2, 8, 32, 44]);
    });

    it('should convert buffer uint32 arraybuffer', () => {
        const nums = Uint32Array.from([2, 8, 32 ,44])
        const res = bufferToData(nums.buffer, Datatype.Uint32);
        expect(nums.byteLength).toBe(16);
        expect(res).toEqual([2, 8, 32, 44]);
    });

    it('should convert buffer int64 arraybuffer', () => {
        const nums = BigInt64Array.from([BigInt(2), BigInt(322)])
        const res = bufferToData(nums.buffer, Datatype.Int64);
        expect(nums.byteLength).toBe(16);
        expect(res).toEqual([BigInt(2), BigInt(322)]);
    });

    it('should convert buffer uint64 arraybuffer', () => {
        const nums = BigUint64Array.from([BigInt(2), BigInt(322)])
        const res = bufferToData(nums.buffer, Datatype.Uint64);
        expect(nums.byteLength).toBe(16);
        expect(res).toEqual([BigInt(2), BigInt(322)]);
    });

    it('should convert buffer float32 arraybuffer', () => {
        const nums = Float32Array.from([2, 8, 32 ,44])
        const res = bufferToData(nums.buffer, Datatype.Float32);
        expect(nums.byteLength).toBe(16);
        expect(res).toEqual([2, 8, 32, 44]);
    });

    it('should convert buffer float64 arraybuffer', () => {
        const nums = Float64Array.from([2, 8, 32 ,44])
        const res = bufferToData(nums.buffer, Datatype.Float64);
        expect(nums.byteLength).toBe(32);
        expect(res).toEqual([2, 8, 32, 44]);
    });

    it('Should convert utf8 encoded to string', () => {
        const encodedStr = Uint8Array.from([97, 97, 98, 98, 122, 122, 122, 122]);

        const res = bufferToData(encodedStr.buffer, Datatype.StringUtf8);
        expect(res).toEqual('aabbzzzz');
    })

    it('Should convert utf16 encoded to string', () => {
        const encodedStr = Uint16Array.from([97, 97, 97, 122, 122, 116, 105, 108, 101, 100, 98, 100, 101, 109, 111]);
        
        const res = bufferToData(encodedStr.buffer, Datatype.StringUtf16);
        expect(res).toEqual('aaazztiledbdemo');
    });

    it('Should convert utf32 encoded to string', () => {
        const encodedStr = Uint32Array.from([116, 105, 108, 101, 100, 98, 95, 100, 101, 109, 111, 95, 117, 116, 102, 51, 50]);
        
        const res = bufferToData(encodedStr.buffer, Datatype.StringUtf32);
        expect(res).toEqual('tiledb_demo_utf32');
    });

    it('Should convert ascii encoded to string', () => {
        const encodedStr = Uint8Array.from([104, 101, 108, 108, 111])
        
        const res = bufferToData(encodedStr.buffer, Datatype.StringAscii);
        expect(res).toEqual('hello');
    });

});