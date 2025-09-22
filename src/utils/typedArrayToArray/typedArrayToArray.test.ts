import typedArrayToArray from './typedArrayToArray';
import { describe, it, expect } from 'vitest';

describe('typedArrayToArray()', () => {
  it('Should return an array', () => {
    expect(typedArrayToArray(Int16Array.from([1, 2, 3]))).toEqual([1, 2, 3]);
  });
});
