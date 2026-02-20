import { getResultsFromArrayBuffer } from './getResultsFromArrayBuffer';
import { readFileSync } from 'fs';
import path from 'path';
import convertToArrayBufferIfNodeBuffer from '../convertToArrayBufferIfNodeBuffer';
import {
  fixedAttrBufferHeaders,
  nullableVarLengthAttrBufferHeaders
} from '../../fixtures/attributeBufferHeaders';
import {
  fixedLenAttributesSchema,
  varLenNullableAttributesSchema
} from '../../fixtures/attributes';
import { describe, it, expect } from 'vitest';
import { Datatype } from '../../v3';

/**
 * Helper to capture memory metrics
 */
interface MemoryMetrics {
  heapUsedMB: number;
  heapTotalMB: number;
  externalMB: number;
  rss: number;
}

function getMemoryMetrics(): MemoryMetrics {
  const mem = process.memoryUsage();
  return {
    heapUsedMB: mem.heapUsed / 1024 / 1024,
    heapTotalMB: mem.heapTotal / 1024 / 1024,
    externalMB: mem.external / 1024 / 1024,
    rss: mem.rss / 1024 / 1024
  };
}

function formatMemoryDelta(before: MemoryMetrics, after: MemoryMetrics): string {
  const heapDelta = after.heapUsedMB - before.heapUsedMB;
  const externalDelta = after.externalMB - before.externalMB;
  const rssDelta = after.rss - before.rss;
  return `Heap: ${heapDelta >= 0 ? '+' : ''}${heapDelta.toFixed(2)}MB, External: ${externalDelta >= 0 ? '+' : ''}${externalDelta.toFixed(2)}MB, RSS: ${rssDelta >= 0 ? '+' : ''}${rssDelta.toFixed(2)}MB`;
}

describe('getResultsFromArrayBuffer()', () => {
  it('Should convert a raw ArrayBuffer to a results object with fixed length attributes', async () => {
    const file = path.join(__dirname, '../../fixtures/fixed_buffer.raw');
    const rawBuffer = readFileSync(file);
    const arrayBufferOfFixedLengthAttributes =
      new DataView(convertToArrayBufferIfNodeBuffer(rawBuffer));

    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      fixedAttrBufferHeaders,
      fixedLenAttributesSchema
    );

    expect(results).toEqual({
      a0: [222, 0, 234, 17, 53, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      a3: [111, 0, 23, 44, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      cols: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
      rows: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]
    });
  });

  it('Should convert a raw ArrayBuffer to a results object with var length & nullable attributes and returnOffsets', async () => {
    const file = path.join(__dirname, '../../fixtures/nullable_buffer.raw');
    const rawBuffer = readFileSync(file);
    const arrayBufferOfFixedLengthAttributes =
      new DataView(convertToArrayBufferIfNodeBuffer(rawBuffer));

    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      nullableVarLengthAttrBufferHeaders,
      varLenNullableAttributesSchema,
      {
        returnOffsets: true
      }
    );

    expect(results).toEqual({
      a1: [100, null, null, 400],
      a2: [null, [20], [30, 30, 30], null],
      a3: ['abc', null, null, 'dddddewxyz'],
      cols: [1, 2, 1, 2],
      rows: [1, 1, 2, 2],
      __offsets: {
        a2: [BigInt(0), BigInt(8), BigInt(12), BigInt(24)],
        a3: [BigInt(0), BigInt(3), BigInt(5), BigInt(6)]
      }
    });
  });

  it('Should return empty array if there are no results if attributebuffers are empty', async () => {
    const file = path.join(__dirname, '../../fixtures/nullable_buffer.raw');
    const rawBuffer = readFileSync(file);
    const arrayBufferOfFixedLengthAttributes =
      new DataView(convertToArrayBufferIfNodeBuffer(rawBuffer));

    const attributeBufferHeaders = [
      {
        name: 'cols',
        fixedLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        originalFixedLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        originalValidityLenBufferSizeInBytes: 0
      }
    ];

    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      attributeBufferHeaders,
      varLenNullableAttributesSchema
    );

    expect(results).toEqual({ cols: [] });
  });

  it('Should return empty ArrayBuffer if no results and returnRawBuffers is true', async () => {
    const file = path.join(__dirname, '../../fixtures/nullable_buffer.raw');
    const rawBuffer = readFileSync(file);
    const arrayBufferOfFixedLengthAttributes =
      new DataView(convertToArrayBufferIfNodeBuffer(rawBuffer));

    const attributeBufferHeaders = [
      {
        name: 'cols',
        fixedLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        originalFixedLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        originalValidityLenBufferSizeInBytes: 0
      }
    ];

    const memBefore = getMemoryMetrics();
    const startTime = performance.now();
    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      attributeBufferHeaders,
      varLenNullableAttributesSchema,
      {
        returnRawBuffers: true
      }
    );
    const endTime = performance.now();
    const memAfter = getMemoryMetrics();

    expect(results).toEqual({ cols: new ArrayBuffer(0) });

    const elapsedTime = endTime - startTime;
    console.log(
      `returnRawBuffers (${attributeBufferHeaders.length} attributes): ${elapsedTime.toFixed(2)}ms`
    );
    console.log(`  Memory: ${formatMemoryDelta(memBefore, memAfter)}`);
  });
});

describe('getResultsFromArrayBuffer() - Performance Tests', () => {
  describe('Fixed-length attributes performance', () => {
    it(
      'Should handle large fixed-length ArrayBuffer efficiently',
      async () => {
        // Create a large buffer with 100,000 elements per attribute
        const numElements = 100000;
        const numAttributes = 4;
        const bytesPerElement = 4; // Int32
        const totalBytes = numElements * bytesPerElement * numAttributes;

        const buffer = new ArrayBuffer(totalBytes);
        const view = new Int32Array(buffer);

        // Fill with test data
        for (let i = 0; i < view.length; i++) {
          view[i] = i % 1000;
        }

        const largeBufferHeaders = [
          {
            name: 'cols',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'rows',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'a0',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'a3',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          }
        ];

        const memBefore = getMemoryMetrics();
        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          largeBufferHeaders,
          fixedLenAttributesSchema
        );
        const endTime = performance.now();
        const memAfter = getMemoryMetrics();

        expect(Object.keys(results)).toHaveLength(4);
        expect((results.cols as number[]).length).toBe(numElements);
        expect((results.rows as number[]).length).toBe(numElements);
        expect((results.a0 as number[]).length).toBe(numElements);
        expect((results.a3 as number[]).length).toBe(numElements);

        const elapsedTime = endTime - startTime;
        console.log(
          `Fixed-length processing (${numElements} elements): ${elapsedTime.toFixed(2)}ms`
        );
        console.log(`  Memory: ${formatMemoryDelta(memBefore, memAfter)}`);

        // Performance assertion - should complete in reasonable time
        expect(elapsedTime).toBeLessThan(5000); // 5 seconds max
      },
      30000
    );

    it(
      'Should handle returnRawBuffers option efficiently for large data',
      async () => {
        const numElements = 100000;
        const bytesPerElement = 4;
        const totalBytes = numElements * bytesPerElement * 4;

        const buffer = new ArrayBuffer(totalBytes);
        const view = new Int32Array(buffer);

        for (let i = 0; i < view.length; i++) {
          view[i] = i;
        }

        const largeBufferHeaders = [
          {
            name: 'cols',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'rows',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'a0',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'a3',
            fixedLenBufferSizeInBytes: numElements * bytesPerElement,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: numElements * bytesPerElement,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          }
        ];

        const memBefore = getMemoryMetrics();
        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          largeBufferHeaders,
          fixedLenAttributesSchema,
          { returnRawBuffers: true }
        );
        const endTime = performance.now();
        const memAfter = getMemoryMetrics();

        expect(results.cols).toBeInstanceOf(ArrayBuffer);
        expect((results.cols as ArrayBuffer).byteLength).toBe(
          numElements * bytesPerElement
        );

        const elapsedTime = endTime - startTime;
        console.log(
          `returnRawBuffers (${numElements} elements): ${elapsedTime.toFixed(2)}ms`
        );
        console.log(`  Memory: ${formatMemoryDelta(memBefore, memAfter)}`);

        // Raw buffers should be much faster as no conversion happens
        expect(elapsedTime).toBeLessThan(1000); // 1 second max
      },
      30000
    );
  });
});

describe('getResultsFromArrayBuffer() - UTF-32 String Tests', () => {
  it('Should handle var-length UTF-32 strings (non-fast-path)', async () => {
    // UTF-32 uses 4 bytes per character
    const strings = ['Hello', 'World', 'UTF32', '🎉🎊'];
    const numStrings = strings.length;

    // Encode strings as UTF-32LE (4 bytes per code point)
    const encodedStrings: Uint32Array[] = [];
    let totalCodePoints = 0;

    for (const str of strings) {
      const codePoints = Array.from(str).map(char => char.codePointAt(0)!);
      encodedStrings.push(new Uint32Array(codePoints));
      totalCodePoints += codePoints.length;
    }

    // Calculate byte offsets
    const offsets = new BigUint64Array(numStrings);
    let byteOffset = 0;
    for (let i = 0; i < numStrings; i++) {
      offsets[i] = BigInt(byteOffset);
      byteOffset += encodedStrings[i].length * 4; // 4 bytes per code point
    }

    const offsetsBytes = numStrings * 8;
    const stringDataBytes = totalCodePoints * 4; // 4 bytes per code point
    const validityBytes = numStrings;
    const totalBytes = offsetsBytes + stringDataBytes + validityBytes;

    const buffer = new ArrayBuffer(totalBytes);

    // Write offsets
    new BigUint64Array(buffer, 0, numStrings).set(offsets);

    // Write string data as UTF-32LE
    const stringDataView = new Uint8Array(buffer, offsetsBytes, stringDataBytes);
    let writePos = 0;
    for (const encoded of encodedStrings) {
      const bytes = new Uint8Array(encoded.buffer);
      stringDataView.set(bytes, writePos);
      writePos += bytes.length;
    }

    // Write validity (all valid)
    const validityView = new Uint8Array(
      buffer,
      offsetsBytes + stringDataBytes,
      validityBytes
    );
    validityView.fill(1);

    const bufferHeaders = [
      {
        name: 'utf32_strings',
        fixedLenBufferSizeInBytes: offsetsBytes,
        varLenBufferSizeInBytes: stringDataBytes,
        validityLenBufferSizeInBytes: validityBytes,
        originalFixedLenBufferSizeInBytes: offsetsBytes,
        originalVarLenBufferSizeInBytes: stringDataBytes,
        originalValidityLenBufferSizeInBytes: validityBytes
      }
    ];

    const schema = [
      {
        cellValNum: 4294967295,
        name: 'utf32_strings',
        type: Datatype.StringUtf32,
        filterPipeline: {},
        fillValue: [0],
        nullable: true,
        fillValueValidity: false
      }
    ];

    const results = await getResultsFromArrayBuffer(
      new DataView(buffer),
      bufferHeaders,
      schema
    );

    const resultStrings = results.utf32_strings as string[];
    expect(resultStrings.length).toBe(numStrings);
    expect(resultStrings[0]).toBe('Hello');
    expect(resultStrings[1]).toBe('World');
    expect(resultStrings[2]).toBe('UTF32');
    expect(resultStrings[3]).toBe('🎉🎊');
  });

  it('Should handle nullable UTF-32 strings', async () => {
    const strings = ['Test', 'UTF32', 'Data', 'Null'];
    const numStrings = strings.length;

    // Encode strings as UTF-32LE
    const encodedStrings: Uint32Array[] = [];
    let totalCodePoints = 0;

    for (const str of strings) {
      const codePoints = Array.from(str).map(char => char.codePointAt(0)!);
      encodedStrings.push(new Uint32Array(codePoints));
      totalCodePoints += codePoints.length;
    }

    const offsets = new BigUint64Array(numStrings);
    let byteOffset = 0;
    for (let i = 0; i < numStrings; i++) {
      offsets[i] = BigInt(byteOffset);
      byteOffset += encodedStrings[i].length * 4;
    }

    const offsetsBytes = numStrings * 8;
    const stringDataBytes = totalCodePoints * 4;
    const validityBytes = numStrings;
    const totalBytes = offsetsBytes + stringDataBytes + validityBytes;

    const buffer = new ArrayBuffer(totalBytes);

    // Write offsets
    new BigUint64Array(buffer, 0, numStrings).set(offsets);

    // Write string data
    const stringDataView = new Uint8Array(buffer, offsetsBytes, stringDataBytes);
    let writePos = 0;
    for (const encoded of encodedStrings) {
      const bytes = new Uint8Array(encoded.buffer);
      stringDataView.set(bytes, writePos);
      writePos += bytes.length;
    }

    // Write validity - make index 1 and 3 null
    const validityView = new Uint8Array(
      buffer,
      offsetsBytes + stringDataBytes,
      validityBytes
    );
    validityView[0] = 1;
    validityView[1] = 0; // null
    validityView[2] = 1;
    validityView[3] = 0; // null

    const bufferHeaders = [
      {
        name: 'utf32_strings',
        fixedLenBufferSizeInBytes: offsetsBytes,
        varLenBufferSizeInBytes: stringDataBytes,
        validityLenBufferSizeInBytes: validityBytes,
        originalFixedLenBufferSizeInBytes: offsetsBytes,
        originalVarLenBufferSizeInBytes: stringDataBytes,
        originalValidityLenBufferSizeInBytes: validityBytes
      }
    ];

    const schema = [
      {
        cellValNum: 4294967295,
        name: 'utf32_strings',
        type: Datatype.StringUtf32,
        filterPipeline: {},
        fillValue: [0],
        nullable: true,
        fillValueValidity: false
      }
    ];

    const results = await getResultsFromArrayBuffer(
      new DataView(buffer),
      bufferHeaders,
      schema
    );

    const resultStrings = results.utf32_strings as Array<string | null>;
    expect(resultStrings.length).toBe(numStrings);
    expect(resultStrings[0]).toBe('Test');
    expect(resultStrings[1]).toBeNull();
    expect(resultStrings[2]).toBe('Data');
    expect(resultStrings[3]).toBeNull();
  });

  it('Should handle UTF-32 strings with emoji and special characters', async () => {
    // Test strings with various Unicode characters including emoji
    const strings = [
      '😀😃😄', // Emoji
      'Δημοκρατία', // Greek
      '中文字符', // Chinese
      '🚀🌟💻', // More emoji
      'Ñoño' // Latin with accents
    ];
    const numStrings = strings.length;

    const encodedStrings: Uint32Array[] = [];
    let totalCodePoints = 0;

    for (const str of strings) {
      const codePoints = Array.from(str).map(char => char.codePointAt(0)!);
      encodedStrings.push(new Uint32Array(codePoints));
      totalCodePoints += codePoints.length;
    }

    const offsets = new BigUint64Array(numStrings);
    let byteOffset = 0;
    for (let i = 0; i < numStrings; i++) {
      offsets[i] = BigInt(byteOffset);
      byteOffset += encodedStrings[i].length * 4;
    }

    const offsetsBytes = numStrings * 8;
    const stringDataBytes = totalCodePoints * 4;
    const validityBytes = numStrings;
    const totalBytes = offsetsBytes + stringDataBytes + validityBytes;

    const buffer = new ArrayBuffer(totalBytes);

    // Write offsets
    new BigUint64Array(buffer, 0, numStrings).set(offsets);

    // Write string data
    const stringDataView = new Uint8Array(buffer, offsetsBytes, stringDataBytes);
    let writePos = 0;
    for (const encoded of encodedStrings) {
      const bytes = new Uint8Array(encoded.buffer);
      stringDataView.set(bytes, writePos);
      writePos += bytes.length;
    }

    // Write validity (all valid)
    const validityView = new Uint8Array(
      buffer,
      offsetsBytes + stringDataBytes,
      validityBytes
    );
    validityView.fill(1);

    const bufferHeaders = [
      {
        name: 'utf32_strings',
        fixedLenBufferSizeInBytes: offsetsBytes,
        varLenBufferSizeInBytes: stringDataBytes,
        validityLenBufferSizeInBytes: validityBytes,
        originalFixedLenBufferSizeInBytes: offsetsBytes,
        originalVarLenBufferSizeInBytes: stringDataBytes,
        originalValidityLenBufferSizeInBytes: validityBytes
      }
    ];

    const schema = [
      {
        cellValNum: 4294967295,
        name: 'utf32_strings',
        type: Datatype.StringUtf32,
        filterPipeline: {},
        fillValue: [0],
        nullable: true,
        fillValueValidity: false
      }
    ];

    const results = await getResultsFromArrayBuffer(
      new DataView(buffer),
      bufferHeaders,
      schema
    );

    const resultStrings = results.utf32_strings as string[];
    expect(resultStrings.length).toBe(numStrings);
    expect(resultStrings[0]).toBe('😀😃😄');
    expect(resultStrings[1]).toBe('Δημοκρατία');
    expect(resultStrings[2]).toBe('中文字符');
    expect(resultStrings[3]).toBe('🚀🌟💻');
    expect(resultStrings[4]).toBe('Ñoño');
  });

  it('Should handle empty UTF-32 strings', async () => {
    const strings = ['Hello', '', 'World', '', 'End'];
    const numStrings = strings.length;

    const encodedStrings: Uint32Array[] = [];
    let totalCodePoints = 0;

    for (const str of strings) {
      if (str.length === 0) {
        encodedStrings.push(new Uint32Array(0));
      } else {
        const codePoints = Array.from(str).map(char => char.codePointAt(0)!);
        encodedStrings.push(new Uint32Array(codePoints));
        totalCodePoints += codePoints.length;
      }
    }

    const offsets = new BigUint64Array(numStrings);
    let byteOffset = 0;
    for (let i = 0; i < numStrings; i++) {
      offsets[i] = BigInt(byteOffset);
      byteOffset += encodedStrings[i].length * 4;
    }

    const offsetsBytes = numStrings * 8;
    const stringDataBytes = totalCodePoints * 4;
    const validityBytes = numStrings;
    const totalBytes = offsetsBytes + stringDataBytes + validityBytes;

    const buffer = new ArrayBuffer(totalBytes);

    // Write offsets
    new BigUint64Array(buffer, 0, numStrings).set(offsets);

    // Write string data
    const stringDataView = new Uint8Array(buffer, offsetsBytes, stringDataBytes);
    let writePos = 0;
    for (const encoded of encodedStrings) {
      if (encoded.length > 0) {
        const bytes = new Uint8Array(encoded.buffer);
        stringDataView.set(bytes, writePos);
        writePos += bytes.length;
      }
    }

    // Write validity (all valid)
    const validityView = new Uint8Array(
      buffer,
      offsetsBytes + stringDataBytes,
      validityBytes
    );
    validityView.fill(1);

    const bufferHeaders = [
      {
        name: 'utf32_strings',
        fixedLenBufferSizeInBytes: offsetsBytes,
        varLenBufferSizeInBytes: stringDataBytes,
        validityLenBufferSizeInBytes: validityBytes,
        originalFixedLenBufferSizeInBytes: offsetsBytes,
        originalVarLenBufferSizeInBytes: stringDataBytes,
        originalValidityLenBufferSizeInBytes: validityBytes
      }
    ];

    const schema = [
      {
        cellValNum: 4294967295,
        name: 'utf32_strings',
        type: Datatype.StringUtf32,
        filterPipeline: {},
        fillValue: [0],
        nullable: true,
        fillValueValidity: false
      }
    ];

    const results = await getResultsFromArrayBuffer(
      new DataView(buffer),
      bufferHeaders,
      schema
    );

    const resultStrings = results.utf32_strings as string[];
    expect(resultStrings.length).toBe(numStrings);
    expect(resultStrings[0]).toBe('Hello');
    expect(resultStrings[1]).toBe('');
    expect(resultStrings[2]).toBe('World');
    expect(resultStrings[3]).toBe('');
    expect(resultStrings[4]).toBe('End');
  });

  it(
    'Should handle large UTF-32 string dataset with performance tracking',
    async () => {
      const numStrings = 100_000;
      const strings: string[] = [];

      // Generate varied UTF-32 strings
      for (let i = 0; i < numStrings; i++) {
        if (i % 2 === 0) {
          strings.push(`emoji_${i}_🎉🚀💻`);
        } else if (i % 3 === 0) {
          strings.push(`greek_${i}_Δημοκρατία`);
        } else {
          strings.push(`text_${i}_regular`);
        }
      }

      const encodedStrings: Uint32Array[] = [];
      let totalCodePoints = 0;

      for (const str of strings) {
        const codePoints = Array.from(str).map(char => char.codePointAt(0)!);
        encodedStrings.push(new Uint32Array(codePoints));
        totalCodePoints += codePoints.length;
      }

      const offsets = new BigUint64Array(numStrings);
      let byteOffset = 0;
      for (let i = 0; i < numStrings; i++) {
        offsets[i] = BigInt(byteOffset);
        byteOffset += encodedStrings[i].length * 4;
      }

      const offsetsBytes = numStrings * 8;
      const stringDataBytes = totalCodePoints * 4;
      const validityBytes = numStrings;
      const totalBytes = offsetsBytes + stringDataBytes + validityBytes;

      const buffer = new ArrayBuffer(totalBytes);

      // Write offsets
      new BigUint64Array(buffer, 0, numStrings).set(offsets);

      // Write string data
      const stringDataView = new Uint8Array(buffer, offsetsBytes, stringDataBytes);
      let writePos = 0;
      for (const encoded of encodedStrings) {
        const bytes = new Uint8Array(encoded.buffer);
        stringDataView.set(bytes, writePos);
        writePos += bytes.length;
      }

      // Write validity - 20% null
      const validityView = new Uint8Array(
        buffer,
        offsetsBytes + stringDataBytes,
        validityBytes
      );
      for (let i = 0; i < numStrings; i++) {
        validityView[i] = i % 5 === 0 ? 0 : 1;
      }

      const bufferHeaders = [
        {
          name: 'utf32_strings',
          fixedLenBufferSizeInBytes: offsetsBytes,
          varLenBufferSizeInBytes: stringDataBytes,
          validityLenBufferSizeInBytes: validityBytes,
          originalFixedLenBufferSizeInBytes: offsetsBytes,
          originalVarLenBufferSizeInBytes: stringDataBytes,
          originalValidityLenBufferSizeInBytes: validityBytes
        }
      ];

      const schema = [
        {
          cellValNum: 4294967295,
          name: 'utf32_strings',
          type: Datatype.StringUtf32,
          filterPipeline: {},
          fillValue: [0],
          nullable: true,
          fillValueValidity: false
        }
      ];

      const memBefore = getMemoryMetrics();
      const startTime = performance.now();
      const results = await getResultsFromArrayBuffer(
        new DataView(buffer),
        bufferHeaders,
        schema
      );
      const endTime = performance.now();
      const memAfter = getMemoryMetrics();

      const resultStrings = results.utf32_strings as Array<string | null>;
      expect(resultStrings.length).toBe(numStrings);

      // Verify nulls
      expect(resultStrings[0]).toBeNull();
      expect(resultStrings[5]).toBeNull();
      expect(resultStrings[10]).toBeNull();

      // Verify non-null values
      expect(resultStrings[1]).toBe(strings[1]);
      expect(resultStrings[2]).toBe(strings[2]);
      expect(resultStrings[999]).toBe(strings[999]);

      const elapsedTime = endTime - startTime;
      console.log(
        `UTF-32 strings (${numStrings} strings, ~${(totalCodePoints / numStrings).toFixed(1)} avg code points, 20% null): ${elapsedTime.toFixed(2)}ms`
      );
      console.log(`  Memory: ${formatMemoryDelta(memBefore, memAfter)}`);

      expect(elapsedTime).toBeLessThan(5000);
    },
    30000
  );
});
