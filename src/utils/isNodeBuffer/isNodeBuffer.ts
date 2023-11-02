const isNodeBuffer = (buffer: any): buffer is Buffer => {
  if (buffer.buffer) {
    return true;
  }
  return false;
};

export default isNodeBuffer;
