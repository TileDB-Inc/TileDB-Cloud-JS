import {
  AttributeBufferHeader,
  Attribute,
  Dimension,
  Datatype
} from '../../v3';
import { CancelToken } from 'axios';
import getAttributeSizeInBytes from '../getAttributeSizeInBytes';
import getAttributeSchema from '../getAttributeSchema';
import getAttributeResult, { bufferToInt8 } from '../bufferToData';
import getByteLengthOfDatatype from '../getByteLengthOfDatatype';
import setNullables from '../setNullables';
import groupValuesByOffsetBytes from '../groupValuesByOffsetBytes';
import concatChars from '../concatChars';
import convertToArray from '../convertToArray';
import { getAlignedBuffer } from '../getAlignedBuffer';

export interface Options {
  /**
   * Results will return without setting nullables, used on big data
   * to avoid expensive calculations
   */
  ignoreNullables?: boolean;
  /**
   * Results will return without setting offsets, used on big data
   * to avoid expensive calculations
   */
  ignoreOffsets?: boolean;
  /**
   * Return only given attributes/dimensions
   */
  attributes?: string[];
  /**
   * Return raw buffers instead of convert to javascript primitives
   */
  returnRawBuffers?: boolean;
  /**
   * Return offsets for every var-length attribute
   */
  returnOffsets?: boolean;
  /**
   * CancelToken
   */
  cancelToken?: CancelToken;
}

type Result =
  | string[]
  | string
  | number[]
  | bigint[]
  | number[][]
  | bigint[][]
  | ArrayBuffer
  | ArrayBufferLike[];

type Results = Record<string, Result>;
type DataMap = { __offsets?: Record<string, bigint[]> };

const stringTypes: Set<Datatype> = new Set([
  Datatype.Char,
  Datatype.StringAscii,
  Datatype.StringUtf8,
  Datatype.StringUtf16,
  Datatype.StringUtf32,
  Datatype.StringUcs2,
  Datatype.StringUcs4
]);

const stringDecoderMap: Partial<Record<Datatype, string>> = {
  [Datatype.Char]: 'utf-8',
  [Datatype.StringAscii]: 'ascii',
  [Datatype.StringUtf8]: 'utf-8',
  [Datatype.StringUtf16]: 'utf-16',
  [Datatype.StringUcs2]: 'utf-16',
  // StringUtf32 and StringUcs4 are not natively supported by TextDecoder
};

/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export const getResultsFromArrayBuffer = async (
  arrayBuffer: ArrayBufferView<ArrayBuffer>,
  attributeBufferHeaders: AttributeBufferHeader[],
  attributesSchema: Array<Dimension | Attribute>,
  options: Options = {}
) => {
  const data: Results & DataMap = {};

  if (options.returnOffsets) {
    data.__offsets = {};
  }

  let byteOffset = 0;

  for (const attribute of attributeBufferHeaders) {
    const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);

    if (!totalNumberOfBytesOfAttribute) {
      if (options.returnRawBuffers) {
        data[attribute.name] = new ArrayBuffer(0);
      } else {
        data[attribute.name] = [];
      }

      continue;
    }

    // If there are validityLenBufferSizeInBytes the attribute is nullable
    const isNullable = !!attribute.validityLenBufferSizeInBytes;
    // If there are varLenBufferSizeInBytes the attribute is varLengthSized
    const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
    const selectedAttributeSchema = getAttributeSchema(
      attribute.name,
      attributesSchema
    );

    const dataOffset = isVarLengthSized
      ? attribute.fixedLenBufferSizeInBytes
      : 0;
    const validityOffset =
      totalNumberOfBytesOfAttribute -
      (isNullable ? attribute.validityLenBufferSizeInBytes : 0);

    /**
     * Offsets are Uint64 numbers, buffer contains byte offsets though,
     * e.g. if type of the attribute is an INT32 (4 bytes per number) and the offsets are [0, 3, 4]
     * the buffer contains the offsets * bytes of the element instead of just the offsets [0, 3 * 4, 4 * 4] = [0, 12, 16]
     */
    let byteOffsets: bigint[] = [];

    if (isVarLengthSized) {
      const { buffer, offset } = getAlignedBuffer(
        arrayBuffer.buffer,
        arrayBuffer.byteOffset + byteOffset,
        attribute.fixedLenBufferSizeInBytes,
        BigUint64Array.BYTES_PER_ELEMENT
      );

      const offsetCount =
        attribute.fixedLenBufferSizeInBytes /
        BigUint64Array.BYTES_PER_ELEMENT;

      // Read offsets directly from DataView to avoid materializing a BigInt array
      // when we only need them as numbers later. Keep bigint array for returnOffsets.
      const alignedView = new DataView(
        buffer,
        offset,
        attribute.fixedLenBufferSizeInBytes
      );
      byteOffsets = new Array(offsetCount);
      for (let i = 0; i < offsetCount; i++) {
        byteOffsets[i] = alignedView.getBigUint64(i * 8, true);
      }

      if (options.returnOffsets) {
        data.__offsets[attribute.name] = byteOffsets;
      }
    }

    if (options.returnRawBuffers) {
      data[attribute.name] = arrayBuffer.buffer.slice(
        arrayBuffer.byteOffset + byteOffset + dataOffset,
        arrayBuffer.byteOffset + byteOffset + validityOffset
      );

      byteOffset += totalNumberOfBytesOfAttribute;
      continue;
    }

    const dataStart = arrayBuffer.byteOffset + byteOffset + dataOffset;
    const dataLength = validityOffset - dataOffset;

    // Fast path for var-length string types: decode sub-buffers directly
    // instead of decode→split→group→join
    if (
      isVarLengthSized &&
      !options.ignoreOffsets &&
      stringTypes.has(selectedAttributeSchema.type) &&
      selectedAttributeSchema.type !== Datatype.StringUtf32 &&
      selectedAttributeSchema.type !== Datatype.StringUcs4
    ) {
      const encoding =
        stringDecoderMap[selectedAttributeSchema.type] || 'utf-8';
      const decoder = new TextDecoder(encoding);
      const numStrings = byteOffsets.length;
      const strings: string[] = new Array(numStrings);

      for (let i = 0; i < numStrings; i++) {
        const start = Number(byteOffsets[i]);
        const end =
          i + 1 < numStrings ? Number(byteOffsets[i + 1]) : dataLength;
        strings[i] = decoder.decode(
          new Uint8Array(arrayBuffer.buffer, dataStart + start, end - start)
        );
      }

      let result: Result = strings;

      if (isNullable && !options.ignoreNullables) {
        const nullablesTypedArray = bufferToInt8(
          new DataView(
            arrayBuffer.buffer,
            arrayBuffer.byteOffset + byteOffset + validityOffset,
            totalNumberOfBytesOfAttribute - validityOffset
          )
        );
        const nullablesArray: number[] = new Array(nullablesTypedArray.length);
        for (let i = 0; i < nullablesTypedArray.length; i++) {
          nullablesArray[i] = nullablesTypedArray[i];
        }
        result = setNullables(strings, nullablesArray);
      }

      data[attribute.name] = result;
      byteOffset += totalNumberOfBytesOfAttribute;
      continue;
    }

    let result: Result = getAttributeResult(
      new DataView(
        arrayBuffer.buffer,
        dataStart,
        dataLength
      ),
      selectedAttributeSchema.type
    );

    if (isVarLengthSized && !options.ignoreOffsets) {
      const BYTE_PER_ELEMENT = BigInt(
        getByteLengthOfDatatype(selectedAttributeSchema.type)
      );

      // Convert byte offsets to element offsets
      const offsets: number[] = new Array(byteOffsets.length);
      for (let i = 0; i < byteOffsets.length; i++) {
        offsets[i] = Number(byteOffsets[i] / BYTE_PER_ELEMENT);
      }

      const isString = typeof result === 'string';
      const groupedValues = groupValuesByOffsetBytes(
        convertToArray(result) as Array<unknown>,
        offsets
      );

      // If it's a string we concat all the characters to create array of strings
      result = isString
        ? concatChars(groupedValues as string[][])
        : (groupedValues as number[][] | bigint[][]);

      if (selectedAttributeSchema.type === Datatype.Blob) {
        const arrayBuffers = groupedValues.map(
          ints => Uint8Array.from(ints).buffer
        );
        result = arrayBuffers;
      }
    }

    if (isNullable && !options.ignoreNullables) {
      /**
       * If attribute is Nullable, we get the last N bytes, cast it to uint8 array to get
       * what is null.
       */
      const nullablesTypedArray = bufferToInt8(
        new DataView(
          arrayBuffer.buffer,
          arrayBuffer.byteOffset + byteOffset + validityOffset,
          totalNumberOfBytesOfAttribute - validityOffset
        )
      );
      /**
       * nullablesArray should be an array of zeros and ones (e.g. [0, 1, 1, 0])
       * Every zero represents that in that specific index the attribute is NULL
       */
      const nullablesArray: number[] = new Array(nullablesTypedArray.length);
      for (let i = 0; i < nullablesTypedArray.length; i++) {
        nullablesArray[i] = nullablesTypedArray[i];
      }

      // @ts-expect-error: Cannot infer a single T that satisfies all Array<...>
      result = setNullables(result, nullablesArray);
    }

    data[attribute.name] = result;

    byteOffset += totalNumberOfBytesOfAttribute;
  }

  return data;
};

export default getResultsFromArrayBuffer;
