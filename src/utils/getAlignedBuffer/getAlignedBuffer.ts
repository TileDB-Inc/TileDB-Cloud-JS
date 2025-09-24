export function getAlignedBuffer(
  buffer: ArrayBuffer,
  offset: number,
  length: number,
  wordSize: number
): { buffer: ArrayBuffer; offset: number } {
  if (offset % wordSize === 0) {
    return { buffer, offset };
  }

  return {
    buffer: buffer.slice(offset, offset + length),
    offset: 0
  };
}
