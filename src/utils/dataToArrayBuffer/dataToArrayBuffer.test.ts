import { Datatype } from '../../v2';
import bufferToData from '../bufferToData';
import dataToArrayBuffer from './dataToArrayBuffer';

describe('dataToArrayBuffer()', () => {
  it('Should return empty Arraybuffer if data is undefined', () => {
    const result = dataToArrayBuffer(undefined, Datatype.Any);

    expect(result.byteLength).toBe(0);
  });

  it('Should return bytes for utf-8 strings', () => {
    const type = Datatype.StringUtf8;
    const str = 'hello';
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length);
    // Sanity check that we get back the same data
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return bytes for utf-16 strings', () => {
    const type = Datatype.StringUtf16;
    const str = 'hello';
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length * 2);
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return bytes for utf-32 strings', () => {
    const str = 'hello';
    const type = Datatype.StringUtf32;
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length * 4);
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return bytes for ascii strings', () => {
    const str = 'hello';
    const type = Datatype.StringAscii;
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length * 1);
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return bytes for usc2 strings', () => {
    const str = 'hello';
    const type = Datatype.StringUcs2;
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length * 2);
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return bytes for usc4 strings', () => {
    const str = 'hello';
    const type = Datatype.StringUcs4;
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length * 4);
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return bytes for char strings', () => {
    const str = 'hello';
    const type = Datatype.Char;
    const result = dataToArrayBuffer(str, type);

    expect(result.byteLength).toBe(str.length);
    expect(bufferToData(result, type)).toBe(str);
  });

  it('Should return itself if datatype is Blob', () => {
    const buffer = Uint8Array.from([1,2,3,4])
    const result = dataToArrayBuffer(buffer, Datatype.Blob);

    expect(result).toBe(buffer);
  });
});
