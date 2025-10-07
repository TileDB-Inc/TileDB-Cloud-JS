import convertToArray from './convertToArray';
import { describe, it, expect } from 'vitest';

describe('convertToArray()', () => {
  it('Should return arrays as is', () => {
    const result = convertToArray([1, 2, 3]);
    expect(result).toStrictEqual([1, 2, 3]);
  });

  it('Should convert strings to arrays of chars', () => {
    const result = convertToArray('hello');
    expect(result).toStrictEqual(['h', 'e', 'l', 'l', 'o']);
  });

  it('Should convert Buffers to arrays of ints', () => {
    const result = convertToArray(Uint8Array.from([1, 5, 12]).buffer);
    expect(result).toStrictEqual([1, 5, 12]);
  });
});
