import checkRangeOutOfBounds from './checkRangeOutOfBounds';
import { describe, it, expect } from 'vitest';

describe('checkRangeOutOfBounds()', () => {
  it('Should return true when empty range', () => {
    const bounds = [1, 4];
    const range = [];
    expect(checkRangeOutOfBounds(range, bounds)).toBe(true);
  });

  it('Should return false when out of high bounds', () => {
    const bounds = [1, 4];
    const range = [1, 12];
    expect(checkRangeOutOfBounds(range, bounds)).toBe(false);
  });

  it('Should return false when out of low bounds', () => {
    const bounds = [2, 4];
    const range = [1, 4];
    expect(checkRangeOutOfBounds(range, bounds)).toBe(false);
  });

  it('Should return false when out of low bounds', () => {
    const bounds = [2, 4];
    const range = [1, 4];
    expect(checkRangeOutOfBounds(range, bounds)).toBe(false);
  });

  it('Should return true when range is the same as the bounds', () => {
    const bounds = [1, 4];
    const range = [1, 4];
    expect(checkRangeOutOfBounds(range, bounds)).toBe(true);
  });

  it('Should compute multi-ranges', () => {
    const bounds = [1, 4];
    const range = [
      [1, 1],
      [2, 3]
    ];
    expect(checkRangeOutOfBounds(range, bounds)).toBe(true);
  });
});
