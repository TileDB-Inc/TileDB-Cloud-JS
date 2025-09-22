const isNodeBuffer = (buffer: Buffer | ArrayBuffer): buffer is Buffer => {
  if ('buffer' in buffer) {
    return true;
  }
  return false;
};

export default isNodeBuffer;
