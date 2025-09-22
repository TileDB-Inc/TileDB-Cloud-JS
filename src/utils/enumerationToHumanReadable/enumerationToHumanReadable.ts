import { Enumeration } from '../../v1';
import { Datatype } from '../../v2';
import bufferToData from '../bufferToData';
import concatChars from '../concatChars';
import convertToArray from '../convertToArray';
import getByteLengthOfDatatype from '../getByteLengthOfDatatype';
import groupValuesByOffsetBytes from '../groupValuesByOffsetBytes';
import isAttributeVarLength from '../isAttributeVarLength';

const enumerationToHumanReadable = async (enumeration: Enumeration) => {
  const { type, data, name, offsets } = enumeration;
  // Data is returned as array of numbers, convert it to buffer
  const dataBuffer = Uint8Array.from(data).buffer;
  const values = bufferToData(dataBuffer, type as Datatype);

  // In case of var-length data, use offsets to get results
  if (isAttributeVarLength(enumeration)) {
    /**
     * Convert offsets from uint8 array to uint64
     * Uint8 array: 0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0
     * Uint64 array: 0, 3, 8
     */
    const offsetsBuffer = Uint8Array.from(offsets).buffer;
    const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
    // Get how many bytes this type is
    const BYTE_PER_ELEMENT = getByteLengthOfDatatype(type as Datatype);
    /**
     * Convert offsets by bytes to offsets by element,
     * since some primitives are more than 1 byte long.
     */
    const offsetsAsNumbers = byteOffsets.map(o =>
      Number(o / BigInt(BYTE_PER_ELEMENT))
    );

    const groupedValues = await groupValuesByOffsetBytes(
      convertToArray(values),
      offsetsAsNumbers
    );

    const valueIsString = typeof values === 'string';

    return {
      name: name,
      type: type,
      values: valueIsString
        ? concatChars(groupedValues as string[][])
        : (groupedValues as number[][] | bigint[][])
    };
  }

  return {
    name: name,
    type: type,
    values
  };
};

export default enumerationToHumanReadable;
