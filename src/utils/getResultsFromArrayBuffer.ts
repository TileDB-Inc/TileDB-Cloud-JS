import { Attribute, Dimension } from "../v1";
import { AttributeBufferHeader } from "../v2";
import getAttributeSizeInBytes from "./getAttributeSizeInBytes";
import getAttributeSchema from "./getAttributeSchema";
import getAttributeResult, { bufferToInt8 } from "./bufferToData";
import getByteLengthOfDatatype from "./getByteLengthOfDatatype";
import setNullables from "./setNullables";
import isArrayOfArrays from "./isArrayOfArrays";
import groupValuesByOffsetBytes from "./groupValuesByOffsetBytes";
import flatten from "./flatten";
import convertToArray from "./convertToArray";

/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
export const getResultsFromArrayBuffer = (
  arrayBuffer: ArrayBuffer,
  attributeBufferHeaders: AttributeBufferHeader[],
  attributesSchema: Array<Dimension | Attribute>
) => {
  const data = {};

  /**
   * We start from the last attribute which is at the end of the buffer
   */
  attributeBufferHeaders.reverse().reduce((offset, attribute) => {
    const totalNumberOfBytesOfAttribute = getAttributeSizeInBytes(attribute);

    if (!totalNumberOfBytesOfAttribute) {
      data[attribute.name] = [];

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

    let result: any = getAttributeResult(
      arrayBuffer.slice(start, end),
      selectedAttributeSchema.type
    );

    let offsets = [];
    if (isVarLengthSized) {
      const BYTE_PER_ELEMENT = getByteLengthOfDatatype(
        selectedAttributeSchema.type
      );
      const startOfBuffer = negativeOffset - totalNumberOfBytesOfAttribute;
      const offsetsBuffer = arrayBuffer.slice(
        startOfBuffer,
        startOfBuffer + attribute.fixedLenBufferSizeInBytes
      );
      /**
       * Offsets are Uint64 numbers, buffer contains byte offsets though,
       * e.g. if type of the attribute is an INT32 (4 bytes per number) and the offsets are [0, 3, 4]
       * the buffer contains the offsets * bytes of the element instead of just the offsets [0, 3 * 4, 4 * 4] = [0, 12, 16]
       */
      const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
      // Convert byte offsets to offsets
      offsets = byteOffsets.map((o) => Number(o) / BYTE_PER_ELEMENT);
    }

    if (isNullable) {
      /**
       * If attribute is Nullable, we get the last N bytes, cast it to uint8 array to get
       * what is null.
       */
      const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
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

      result = setNullables(Array.from(result), nullablesArray, offsets);
    }

    // If result is a String slice the String by the offsets to make it an array
    if (isVarLengthSized && typeof result === "string") {
      result = groupValuesByOffsetBytes(convertToArray(result), offsets).map(
        (s) => s.join("")
      );
    }

    data[attribute.name] = isArrayOfArrays(result) ? flatten(result) : result;

    return offset + totalNumberOfBytesOfAttribute;
  }, 0);

  return data;
};

export default getResultsFromArrayBuffer;
