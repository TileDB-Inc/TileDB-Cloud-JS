import flatten from './flatten';
import { describe, it, expect } from 'vitest';

describe('flatten()', () => {
  it('Should flatten array', () => {
    expect(flatten([1, 2, [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });
});
