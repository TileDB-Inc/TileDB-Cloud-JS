"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * If buffer is a NodeJS Buffer object we convert it back to an ArrayBuffer
 * Axios is NodeJS environments returns a NodeJS buffer while in browsers, an ArrayBuffer
 * @param buffer ArrayBuffer or Nodejs Buffer
 * @returns ArrayBuffer
 */
function convertToArrayBufferIfNodeBuffer(buffer) {
    if (buffer.buffer) {
        return new Uint8Array(buffer).buffer;
    }
    return buffer;
}
exports.default = convertToArrayBufferIfNodeBuffer;
//# sourceMappingURL=convertToArrayBufferIfNodeBuffer.js.map