import convertToArrayBufferIfNodeBuffer from './convertToArrayBufferIfNodeBuffer';
import { describe, it, expect } from 'vitest';

describe('convertToArrayBufferIfNodeBuffer()', () => {
  it('Should return arraybuffer from NodeJS buffer', () => {
    const result = convertToArrayBufferIfNodeBuffer(
      Buffer.from('hello', 'utf-8')
    );

    expect(result instanceof ArrayBuffer).toBe(true);
  });

  it('Should return arraybuffer if data is already an arraybuffer', () => {
    const result = convertToArrayBufferIfNodeBuffer(
      Uint16Array.from([1, 2, 3]).buffer
    );

    expect(result instanceof ArrayBuffer).toBe(true);
  });
});
