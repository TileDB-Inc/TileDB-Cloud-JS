const concatArrayBuffers = (...buffers: ArrayBuffer[]) => {
  const result = new Uint8Array(
    buffers.reduce((totalSize, buf) => totalSize + buf.byteLength, 0)
  );
  buffers.reduce((offset, buf) => {
    result.set(new Uint8Array(buf), offset);
    return offset + buf.byteLength;
  }, 0);
  return result.buffer;
};

export default concatArrayBuffers;
