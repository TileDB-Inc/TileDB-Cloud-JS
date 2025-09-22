import rangesToBuffer from './rangesToBuffer';
import { Datatype } from '../../v2';
import { describe, it, expect } from 'vitest';

describe('rangesToBuffer()', () => {
  it('should convert int16', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Int16);
    expect(res).toEqual([1, 0, 2, 0, 3, 0]);
  });

  it('should convert uint16', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Uint16);
    expect(res).toEqual([1, 0, 2, 0, 3, 0]);
  });

  it('should convert int8', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Int8);
    expect(res).toEqual([1, 2, 3]);
  });

  it('should convert uint8', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Uint8);
    expect(res).toEqual([1, 2, 3]);
  });

  it('should convert int32', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Int32);
    expect(res).toEqual([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0]);
  });

  it('should convert uint32', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Uint32);
    expect(res).toEqual([1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0]);
  });

  it('should convert int64', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Int64);
    expect(res).toEqual([
      1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0
    ]);
  });

  it('should convert uint64', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Uint64);
    expect(res).toEqual([
      1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0
    ]);
  });

  it('should convert Float64', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Float64);
    expect(res).toEqual([
      0, 0, 0, 0, 0, 0, 240, 63, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 8,
      64
    ]);
  });

  it('should convert Float32', () => {
    const res = rangesToBuffer([1, 2, 3], Datatype.Float32);
    expect(res).toEqual([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]);
  });

  it('should convert StringAscii', () => {
    const res = rangesToBuffer(['a', 'c'], Datatype.StringAscii);
    expect(res).toEqual([97, 99]);
  });

  it('should convert StringAscii with more letters', () => {
    const res = rangesToBuffer(
      ['GTEX-1117F-0226-SM-5GZZ7', 'GTEX-1117F-1326-SM-5EGHH'],
      Datatype.StringAscii
    );
    expect(res).toEqual([
      71, 84, 69, 88, 45, 49, 49, 49, 55, 70, 45, 48, 50, 50, 54, 45, 83, 77,
      45, 53, 71, 90, 90, 55, 71, 84, 69, 88, 45, 49, 49, 49, 55, 70, 45, 49,
      51, 50, 54, 45, 83, 77, 45, 53, 69, 71, 72, 72
    ]);
  });

  it('should convert DatetimeSec', () => {
    const res = rangesToBuffer([1577836800, 1588878856], Datatype.DatetimeSec);
    expect(res).toEqual([
      0, 225, 11, 94, 0, 0, 0, 0, 8, 94, 180, 94, 0, 0, 0, 0
    ]);
  });
});
