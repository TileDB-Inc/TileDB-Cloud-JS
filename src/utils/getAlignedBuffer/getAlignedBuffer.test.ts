import { getAlignedBuffer } from './getAlignedBuffer';
import { describe, it, expect } from 'vitest';

describe('getAlignedBuffer()', () => {
const buffer = new ArrayBuffer(128);
  it('1 byte aligned', async () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 1, 16, Int8Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).toStrictEqual(buffer);
    expect(offset).toEqual(1);
  });
  it('2 byte aligned', () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 4, 16, Int16Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).toStrictEqual(buffer);
    expect(offset).toEqual(4);
  });
  it('2 byte misaligned', () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 5, 16, Int16Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).not.toStrictEqual(buffer);
    expect(offset).toEqual(0);
  });
  it('4 byte aligned', () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 8, 16, Int32Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).toStrictEqual(buffer);
    expect(offset).toEqual(8);
  });
  it('4 byte misaligned', () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 9, 16, Int32Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).not.toStrictEqual(buffer);
    expect(offset).toEqual(0);
  });
  it('8 byte aligned', () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 16, 16, BigInt64Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).toStrictEqual(buffer);
    expect(offset).toEqual(16);
  });
  it('8 byte misaligned', () => {
    const {buffer: alignedBuffer, offset} = getAlignedBuffer(buffer, 17, 16, BigInt64Array.BYTES_PER_ELEMENT)
  
    expect(alignedBuffer).not.toStrictEqual(buffer);
    expect(offset).toEqual(0);
  });
});
