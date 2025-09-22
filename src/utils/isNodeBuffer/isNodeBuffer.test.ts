import isNodeBuffer from './isNodeBuffer';
import { describe, it, expect } from 'vitest';

describe('isNodeBuffer()', () => {
  it('Should return true if data is a NodeJS buffer', () => {
    const result = isNodeBuffer(Buffer.from('hi', 'utf-8'));

    expect(result).toBe(true);
  });

  it('Should return false if data is not a NodeJS buffer', () => {
    const result = isNodeBuffer(Uint16Array.from([1, 2, 3]).buffer);

    expect(result).toBe(false);
  });
});
