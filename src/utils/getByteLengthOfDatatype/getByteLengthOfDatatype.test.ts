import { Datatype } from '../../v2';
import getByteLengthOfDatatype from './getByteLengthOfDatatype';

describe('getByteLengthOfDatatype()', () => {
  it('Should return 1 for utf8', () => {
    const result = getByteLengthOfDatatype(Datatype.StringUtf8);

    expect(1).toBe(result);
  });

  it('Should return 2 for utf16', () => {
    const result = getByteLengthOfDatatype(Datatype.StringUtf16);

    expect(2).toBe(result);
  });

  it('Should return 4 for utf32', () => {
    const result = getByteLengthOfDatatype(Datatype.StringUtf32);

    expect(4).toBe(result);
  });

  it('Should return 2 for usc2', () => {
    const result = getByteLengthOfDatatype(Datatype.StringUcs2);

    expect(2).toBe(result);
  });

  it('Should return 4 for usc4', () => {
    const result = getByteLengthOfDatatype(Datatype.StringUcs4);

    expect(4).toBe(result);
  });

  it('Should return 1 for ascii', () => {
    const result = getByteLengthOfDatatype(Datatype.StringAscii);

    expect(1).toBe(result);
  });

  it('Should return 1 for char', () => {
    const result = getByteLengthOfDatatype(Datatype.Char);

    expect(1).toBe(result);
  });

  it('Should return 1 for blob', () => {
    const result = getByteLengthOfDatatype(Datatype.Blob);

    expect(1).toBe(result);
  });

  it('Should return 8 for datetime types (Uint64)', () => {
    const result = getByteLengthOfDatatype(Datatype.DatetimeAs);

    expect(8).toBe(result);
  });

  it('Should return 4 for Float32', () => {
    const result = getByteLengthOfDatatype(Datatype.Float32);

    expect(4).toBe(result);
  });

  it('Should return 4 for Float64', () => {
    const result = getByteLengthOfDatatype(Datatype.Float64);

    expect(8).toBe(result);
  });

  it('Should return 1 for Int8', () => {
    const result = getByteLengthOfDatatype(Datatype.Int8);

    expect(1).toBe(result);
  });

  it('Should return 2 for Int16', () => {
    const result = getByteLengthOfDatatype(Datatype.Int16);

    expect(2).toBe(result);
  });

  it('Should return 8 for Int64', () => {
    const result = getByteLengthOfDatatype(Datatype.Int64);

    expect(8).toBe(result);
  });

  it('Should return 1 for Uint8', () => {
    const result = getByteLengthOfDatatype(Datatype.Uint8);

    expect(1).toBe(result);
  });

  it('Should return 2 for Uint16', () => {
    const result = getByteLengthOfDatatype(Datatype.Uint16);

    expect(2).toBe(result);
  });

  it('Should return 8 for Uint64', () => {
    const result = getByteLengthOfDatatype(Datatype.Uint64);

    expect(8).toBe(result);
  });
});
