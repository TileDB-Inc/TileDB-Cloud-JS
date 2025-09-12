import mapToBigIntIfNeeded from './mapToBigIntIfNeeded';
import { Datatype } from '../../v2';
import { describe, it, expect } from 'vitest';


describe("mapToBigIntIfNeeded()", () => {
    it('Should return array of numbers if not an int64 type', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.Int32)).toEqual([1, 2, 3]);
    });

    it('Should return Array of bigInts if type is int64', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.Int64)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is uint64', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.Uint64)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeAs', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeAs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeDay', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeDay)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeFs', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeFs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeHr', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeHr)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeMin', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeMin)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeMonth', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeMonth)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeMs', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeMs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeNs', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeNs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimePs', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimePs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeSec', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeSec)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeUs', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeUs)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeWeek', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeWeek)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });

    it('Should return Array of bigInts if type is DatetimeYear', () => {
        expect(mapToBigIntIfNeeded([1, 2, 3], Datatype.DatetimeYear)).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
    });
});