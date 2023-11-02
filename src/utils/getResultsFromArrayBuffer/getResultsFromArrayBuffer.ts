import {
  AttributeBufferHeader,
  Attribute,
  Dimension,
  Datatype
} from '../../v2';
import { CancelToken } from 'axios';
import getAttributeSizeInBytes from '../getAttributeSizeInBytes';
import getAttributeSchema from '../getAttributeSchema';
import getAttributeResult, { bufferToInt8 } from '../bufferToData';
import getByteLengthOfDatatype from '../getByteLengthOfDatatype';
import setNullables from '../setNullables';
import groupValuesByOffsetBytes from '../groupValuesByOffsetBytes';
import concatChars from '../concatChars';
import convertToArray from '../convertToArray';

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

/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export const getResultsFromArrayBuffer = async (
  arrayBuffer: ArrayBuffer,
  attributeBufferHeaders: AttributeBufferHeader[],
  attributesSchema: Array<Dimension | Attribute>,
  options: Options = {}
) => {
  const data: Results & DataMap = {};

  if (options.returnOffsets) {
    data.__offsets = {};
  }

  /**
   * We start from the last attribute which is at the end of the buffer
   */
  await attributeBufferHeaders
    .reverse()
    .reduce(async (offsetPromise, attribute) => {
      const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);
      const offset = await offsetPromise;

      if (!totalNumberOfBytesOfAttribute) {
        if (options.returnRawBuffers) {
          data[attribute.name] = new ArrayBuffer(0);
        } else {
          data[attribute.name] = [];
        }

        return offset;
      }

      // If there are validityLenBufferSizeInBytes the attribute is nullable
      const isNullable = !!attribute.validityLenBufferSizeInBytes;
      // If there are varLenBufferSizeInBytes the attribute is varLengthSized
      const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
      const selectedAttributeSchema = getAttributeSchema(
        attribute.name,
        attributesSchema
      );

      const negativeOffset = -1 * offset;
      /**
       * If attribute is varLengthSized, we ignore the first N bytes (where N = fixedLenBufferSizeInBytes)
       * These first N bytes contain the offsets of the attribute, which is a uint64 array.
       */
      const start =
        negativeOffset -
        totalNumberOfBytesOfAttribute +
        (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
      /**
       * If attribute is isNullable we ignore the last N bytes (where N = validityLenBufferSizeInBytes)
       * These last N bytes contain a uint8 array of zeros and ones, where every zero represents
       * that in that index the attribute is null.
       */
      const ending =
        negativeOffset -
        (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
      const end = ending ? ending : undefined;
      /**
       * Offsets are Uint64 numbers, buffer contains byte offsets though,
       * e.g. if type of the attribute is an INT32 (4 bytes per number) and the offsets are [0, 3, 4]
       * the buffer contains the offsets * bytes of the element instead of just the offsets [0, 3 * 4, 4 * 4] = [0, 12, 16]
       */
      let byteOffsets: bigint[] = [];

      if (isVarLengthSized) {
        const startOfBuffer = negativeOffset - totalNumberOfBytesOfAttribute;
        const offsetsBuffer = arrayBuffer.slice(
          startOfBuffer,
          startOfBuffer + attribute.fixedLenBufferSizeInBytes
        );

        byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
      }

      if (isVarLengthSized && options.returnOffsets) {
        data.__offsets[attribute.name] = byteOffsets;
      }

      if (options.returnRawBuffers) {
        data[attribute.name] = arrayBuffer.slice(start, end);

        return offset + totalNumberOfBytesOfAttribute;
      }

      let result: Result = getAttributeResult(
        arrayBuffer.slice(start, end),
        selectedAttributeSchema.type
      ) as string | number[] | bigint[];
      let offsets: number[] = [];
      if (isVarLengthSized && !options.ignoreOffsets) {
        const BYTE_PER_ELEMENT = getByteLengthOfDatatype(
          selectedAttributeSchema.type
        );

        // Convert byte offsets to offsets
        offsets = byteOffsets.map(o => Number(o / BigInt(BYTE_PER_ELEMENT)));
        const isString = typeof result === 'string';
        const groupedValues = await groupValuesByOffsetBytes(
          convertToArray(result),
          offsets
        );

        // If it's a string we concat all the characters to create array of strings
        result = isString
          ? concatChars(groupedValues as string[][])
          : (groupedValues as number[][] | bigint[][]);

        /**
         * ParallelJS accepts data that are JSON serializable
         * thus we have to convert buffer to array of uint8
         * and after grouping convert the data back to ArrayBuffer.
         */
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
        const nullableArrayEnd =
          ending + attribute.validityLenBufferSizeInBytes;
        const nullableArrayBuffer = arrayBuffer.slice(
          ending,
          nullableArrayEnd ? nullableArrayEnd : undefined
        );
        const nullablesTypedArray = bufferToInt8(nullableArrayBuffer);
        /**
         * nullablesArray should be an array of zeros and ones (e.g. [0, 1, 1, 0])
         * Every zero represents that in that specific index the attribute is NULL
         */
        const nullablesArray = Array.from(nullablesTypedArray);
        const values = convertToArray(result) as Array<
          string | bigint | number
        >;

        result = (await setNullables(values, nullablesArray)) as
          | number[]
          | string[]
          | bigint[];
      }

      data[attribute.name] = result;

      return offset + totalNumberOfBytesOfAttribute;
    }, Promise.resolve(0));

  return data;
};

export default getResultsFromArrayBuffer;
