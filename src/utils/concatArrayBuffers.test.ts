import concatArrayBuffers from "./concatArrayBuffers";

describe("concatArrayBuffers()", () => {
  it("Should concat 2 ArrayBuffers", () => {
    const arr1 = Uint32Array.from([88, 122, 29]);
    const arr2 = Uint16Array.from([22, 17, 4]);
    const concatenatedArrayBuffer = concatArrayBuffers(
      arr1.buffer,
      arr2.buffer
    );

    expect(concatenatedArrayBuffer.byteLength).toBe(18);
    expect(Array.from(new Uint16Array(concatenatedArrayBuffer))).toEqual([
      88, 0, 122, 0, 29, 0, 22, 17, 4,
    ]);
  });
});
