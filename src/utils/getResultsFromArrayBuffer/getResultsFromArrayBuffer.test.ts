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

    const results = await getResultsFromArrayBuffer(
      arrayBufferOfFixedLengthAttributes,
      attributeBufferHeaders,
      varLenNullableAttributesSchema,
      {
        returnRawBuffers: true
      }
    );

    expect(results).toEqual({ cols: new ArrayBuffer(0) });
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

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          largeBufferHeaders,
          fixedLenAttributesSchema
        );
        const endTime = performance.now();

        expect(Object.keys(results)).toHaveLength(4);
        expect((results.cols as number[]).length).toBe(numElements);
        expect((results.rows as number[]).length).toBe(numElements);
        expect((results.a0 as number[]).length).toBe(numElements);
        expect((results.a3 as number[]).length).toBe(numElements);

        const elapsedTime = endTime - startTime;
        console.log(
          `Fixed-length processing (${numElements} elements): ${elapsedTime.toFixed(2)}ms`
        );

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

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          largeBufferHeaders,
          fixedLenAttributesSchema,
          { returnRawBuffers: true }
        );
        const endTime = performance.now();

        expect(results.cols).toBeInstanceOf(ArrayBuffer);
        expect((results.cols as ArrayBuffer).byteLength).toBe(
          numElements * bytesPerElement
        );

        const elapsedTime = endTime - startTime;
        console.log(
          `returnRawBuffers (${numElements} elements): ${elapsedTime.toFixed(2)}ms`
        );

        // Raw buffers should be much faster as no conversion happens
        expect(elapsedTime).toBeLessThan(1000); // 1 second max
      },
      30000
    );
  });

  describe('Variable-length attributes performance', () => {
    it(
      'Should handle large var-length string attributes efficiently',
      async () => {
        // Create buffer with many string values
        const numStrings = 10000;
        const avgStringLength = 20;

        // Generate strings
        const strings: string[] = [];
        for (let i = 0; i < numStrings; i++) {
          strings.push(`String_${i}_${'x'.repeat(avgStringLength)}`);
        }

        const fullString = strings.join('');
        const stringBytes = new TextEncoder().encode(fullString);

        // Create offsets (byte offsets)
        const offsets = new BigUint64Array(numStrings);
        let currentOffset = 0;
        for (let i = 0; i < numStrings; i++) {
          offsets[i] = BigInt(currentOffset);
          currentOffset += new TextEncoder().encode(strings[i]).length;
        }

        const offsetsBytes = numStrings * 8; // 8 bytes per BigUint64
        const validityBytes = numStrings; // 1 byte per element
        const totalBytes = offsetsBytes + stringBytes.length + validityBytes;

        // Build buffer: [offsets][string data][validity]
        const buffer = new ArrayBuffer(totalBytes);
        const offsetView = new BigUint64Array(buffer, 0, numStrings);
        offsetView.set(offsets);
        const stringView = new Uint8Array(
          buffer,
          offsetsBytes,
          stringBytes.length
        );
        stringView.set(stringBytes);
        const validityView = new Uint8Array(
          buffer,
          offsetsBytes + stringBytes.length,
          validityBytes
        );
        validityView.fill(1); // All valid

        const bufferHeaders = [
          {
            name: 'strings',
            fixedLenBufferSizeInBytes: offsetsBytes,
            varLenBufferSizeInBytes: stringBytes.length,
            validityLenBufferSizeInBytes: validityBytes,
            originalFixedLenBufferSizeInBytes: offsetsBytes,
            originalVarLenBufferSizeInBytes: stringBytes.length,
            originalValidityLenBufferSizeInBytes: validityBytes
          }
        ];

        const schema = [
          {
            cellValNum: 4294967295,
            name: 'strings',
            type: Datatype.StringUtf8,
            filterPipeline: {},
            fillValue: [0],
            nullable: true,
            fillValueValidity: false
          }
        ];

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          bufferHeaders,
          schema
        );
        const endTime = performance.now();

        expect((results.strings as string[]).length).toBe(numStrings);
        expect((results.strings as string[])[0]).toBe(strings[0]);

        const elapsedTime = endTime - startTime;
        console.log(
          `Var-length strings (${numStrings} strings, avg ${avgStringLength} chars): ${elapsedTime.toFixed(2)}ms`
        );

        expect(elapsedTime).toBeLessThan(10000); // 10 seconds max
      },
      30000
    );

    it(
      'Should handle large var-length numeric arrays efficiently',
      async () => {
        const numArrays = 5000;
        const avgArrayLength = 10;

        // Generate array values
        let totalValues = 0;
        const offsets = new BigUint64Array(numArrays);
        const values: number[] = [];

        for (let i = 0; i < numArrays; i++) {
          offsets[i] = BigInt(totalValues);
          const arrayLength = Math.floor(Math.random() * avgArrayLength) + 1;
          for (let j = 0; j < arrayLength; j++) {
            values.push(Math.floor(Math.random() * 1000));
          }
          totalValues += arrayLength;
        }

        const offsetsBytes = numArrays * 8;
        const valuesBytes = totalValues * 4; // Int32
        const validityBytes = numArrays;
        const totalBytes = offsetsBytes + valuesBytes + validityBytes;

        // Build buffer
        const buffer = new ArrayBuffer(totalBytes);
        const offsetView = new BigUint64Array(buffer, 0, numArrays);
        offsetView.set(offsets);
        const valuesView = new Int32Array(
          buffer,
          offsetsBytes,
          totalValues
        );
        valuesView.set(values);
        const validityView = new Uint8Array(
          buffer,
          offsetsBytes + valuesBytes,
          validityBytes
        );
        validityView.fill(1);

        const bufferHeaders = [
          {
            name: 'arrays',
            fixedLenBufferSizeInBytes: offsetsBytes,
            varLenBufferSizeInBytes: valuesBytes,
            validityLenBufferSizeInBytes: validityBytes,
            originalFixedLenBufferSizeInBytes: offsetsBytes,
            originalVarLenBufferSizeInBytes: valuesBytes,
            originalValidityLenBufferSizeInBytes: validityBytes
          }
        ];

        const schema = [
          {
            cellValNum: 4294967295,
            name: 'arrays',
            type: Datatype.Int32,
            filterPipeline: {},
            fillValue: [0, 0, 0, 128],
            nullable: true,
            fillValueValidity: false
          }
        ];

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          bufferHeaders,
          schema
        );
        const endTime = performance.now();

        expect((results.arrays as number[][]).length).toBe(numArrays);

        const elapsedTime = endTime - startTime;
        console.log(
          `Var-length numeric arrays (${numArrays} arrays, ${totalValues} total values): ${elapsedTime.toFixed(2)}ms`
        );

        expect(elapsedTime).toBeLessThan(15000); // 15 seconds max
      },
      30000
    );
  });

  describe('Nullable attributes performance', () => {
    it(
      'Should handle large nullable datasets efficiently',
      async () => {
        const numElements = 50000;
        const bytesPerElement = 4;
        const dataBytes = numElements * bytesPerElement;
        const validityBytes = numElements;
        const totalBytes = dataBytes + validityBytes;

        const buffer = new ArrayBuffer(totalBytes);
        const dataView = new Int32Array(buffer, 0, numElements);
        const validityView = new Uint8Array(buffer, dataBytes, validityBytes);

        // Fill with data and set 20% as null
        for (let i = 0; i < numElements; i++) {
          dataView[i] = i * 2;
          validityView[i] = Math.random() > 0.2 ? 1 : 0;
        }

        const bufferHeaders = [
          {
            name: 'nullable_data',
            fixedLenBufferSizeInBytes: dataBytes,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: validityBytes,
            originalFixedLenBufferSizeInBytes: dataBytes,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: validityBytes
          }
        ];

        const schema = [
          {
            cellValNum: 1,
            name: 'nullable_data',
            type: Datatype.Int32,
            filterPipeline: {},
            fillValue: [0, 0, 0, 128],
            nullable: true,
            fillValueValidity: false
          }
        ];

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          bufferHeaders,
          schema
        );
        const endTime = performance.now();

        expect((results.nullable_data as Array<number | null>).length).toBe(
          numElements
        );

        const elapsedTime = endTime - startTime;
        console.log(
          `Nullable attributes (${numElements} elements, ~20% null): ${elapsedTime.toFixed(2)}ms`
        );

        expect(elapsedTime).toBeLessThan(5000); // 5 seconds max
      },
      30000
    );

    it(
      'Should skip nullable processing when ignoreNullables is true',
      async () => {
        const numElements = 50000;
        const bytesPerElement = 4;
        const dataBytes = numElements * bytesPerElement;
        const validityBytes = numElements;
        const totalBytes = dataBytes + validityBytes;

        const buffer = new ArrayBuffer(totalBytes);
        const dataView = new Int32Array(buffer, 0, numElements);
        const validityView = new Uint8Array(buffer, dataBytes, validityBytes);

        for (let i = 0; i < numElements; i++) {
          dataView[i] = i * 2;
          validityView[i] = i % 5 === 0 ? 0 : 1; // 20% null
        }

        const bufferHeaders = [
          {
            name: 'nullable_data',
            fixedLenBufferSizeInBytes: dataBytes,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: validityBytes,
            originalFixedLenBufferSizeInBytes: dataBytes,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: validityBytes
          }
        ];

        const schema = [
          {
            cellValNum: 1,
            name: 'nullable_data',
            type: Datatype.Int32,
            filterPipeline: {},
            fillValue: [0, 0, 0, 128],
            nullable: true,
            fillValueValidity: false
          }
        ];

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          bufferHeaders,
          schema,
          { ignoreNullables: true }
        );
        const endTime = performance.now();

        // With ignoreNullables, no nulls should be in result
        expect((results.nullable_data as number[]).every(v => v !== null)).toBe(
          true
        );

        const elapsedTime = endTime - startTime;
        console.log(
          `Nullable ignored (${numElements} elements): ${elapsedTime.toFixed(2)}ms`
        );

        // Should be faster than processing nullables
        expect(elapsedTime).toBeLessThan(3000); // 3 seconds max
      },
      30000
    );
  });

  describe('Mixed workload performance', () => {
    it(
      'Should handle complex mixed attribute types efficiently',
      async () => {
        const numRows = 10000;

        // Build a complex buffer with multiple attribute types
        // Fixed int, var-length strings, nullable floats, var-length int arrays

        // 1. Fixed length dimension (rows)
        const rowsBytes = numRows * 4;
        const rowsData = new Int32Array(numRows);
        for (let i = 0; i < numRows; i++) {
          rowsData[i] = i;
        }

        // 2. Var-length strings
        const strings = Array.from(
          { length: numRows },
          (_, i) => `Record_${i}`
        );
        const fullString = strings.join('');
        const stringBytes = new TextEncoder().encode(fullString);
        const stringOffsets = new BigUint64Array(numRows);
        let offset = 0;
        for (let i = 0; i < numRows; i++) {
          stringOffsets[i] = BigInt(offset);
          offset += new TextEncoder().encode(strings[i]).length;
        }
        const stringOffsetsBytes = numRows * 8;
        const stringDataBytes = stringBytes.length;
        const stringValidityBytes = numRows;

        // 3. Nullable floats
        const floatsBytes = numRows * 8; // Float64
        const floatsData = new Float64Array(numRows);
        const floatsValidityBytes = numRows;
        const floatsValidity = new Uint8Array(floatsValidityBytes);
        for (let i = 0; i < numRows; i++) {
          floatsData[i] = Math.random() * 1000;
          floatsValidity[i] = i % 10 === 0 ? 0 : 1; // 10% null
        }

        // Calculate padding needed for Float64Array alignment (must be multiple of 8)
        const beforeFloatOffset = 
          rowsBytes + 
          stringOffsetsBytes + 
          stringDataBytes + 
          stringValidityBytes;
        const paddingBytes = (8 - (beforeFloatOffset % 8)) % 8;

        // Calculate total buffer size
        const totalBytes =
          rowsBytes +
          stringOffsetsBytes +
          stringDataBytes +
          stringValidityBytes +
          paddingBytes +
          floatsBytes +
          floatsValidityBytes;

        const buffer = new ArrayBuffer(totalBytes);
        let currentOffset = 0;

        // Write rows
        new Int32Array(buffer, currentOffset, numRows).set(rowsData);
        currentOffset += rowsBytes;

        // Write string offsets
        new BigUint64Array(buffer, currentOffset, numRows).set(stringOffsets);
        currentOffset += stringOffsetsBytes;

        // Write string data
        new Uint8Array(buffer, currentOffset, stringBytes.length).set(
          stringBytes
        );
        currentOffset += stringDataBytes;

        // Write string validity
        new Uint8Array(buffer, currentOffset, stringValidityBytes).fill(1);
        currentOffset += stringValidityBytes;

        // Add padding
        currentOffset += paddingBytes;

        // Write floats (now properly aligned)
        new Float64Array(buffer, currentOffset, numRows).set(floatsData);
        currentOffset += floatsBytes;

        // Write float validity
        new Uint8Array(buffer, currentOffset, floatsValidityBytes).set(
          floatsValidity
        );

        const bufferHeaders = [
          {
            name: 'rows',
            fixedLenBufferSizeInBytes: rowsBytes,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: 0,
            originalFixedLenBufferSizeInBytes: rowsBytes,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: 0
          },
          {
            name: 'names',
            fixedLenBufferSizeInBytes: stringOffsetsBytes,
            varLenBufferSizeInBytes: stringDataBytes,
            validityLenBufferSizeInBytes: stringValidityBytes,
            originalFixedLenBufferSizeInBytes: stringOffsetsBytes,
            originalVarLenBufferSizeInBytes: stringDataBytes,
            originalValidityLenBufferSizeInBytes: stringValidityBytes
          },
          {
            name: 'values',
            fixedLenBufferSizeInBytes: floatsBytes,
            varLenBufferSizeInBytes: 0,
            validityLenBufferSizeInBytes: floatsValidityBytes,
            originalFixedLenBufferSizeInBytes: floatsBytes,
            originalVarLenBufferSizeInBytes: 0,
            originalValidityLenBufferSizeInBytes: floatsValidityBytes
          }
        ];

        const schema = [
          {
            name: 'rows',
            nullTileExtent: false,
            type: Datatype.Int32,
            tileExtent: { int32: 4 },
            domain: { int32: [] },
            filterPipeline: {}
          },
          {
            cellValNum: 4294967295,
            name: 'names',
            type: Datatype.StringUtf8,
            filterPipeline: {},
            fillValue: [0],
            nullable: true,
            fillValueValidity: false
          },
          {
            cellValNum: 1,
            name: 'values',
            type: Datatype.Float64,
            filterPipeline: {},
            fillValue: [0, 0, 0, 0, 0, 0, 0, 0],
            nullable: true,
            fillValueValidity: false
          }
        ];

        const startTime = performance.now();
        const results = await getResultsFromArrayBuffer(
          new DataView(buffer),
          bufferHeaders,
          schema
        );
        const endTime = performance.now();

        expect((results.rows as number[]).length).toBe(numRows);
        expect((results.names as string[]).length).toBe(numRows);
        expect((results.values as Array<number | null>).length).toBe(numRows);

        const elapsedTime = endTime - startTime;
        console.log(
          `Mixed workload (${numRows} rows, 3 different attribute types): ${elapsedTime.toFixed(2)}ms`
        );

        expect(elapsedTime).toBeLessThan(10000); // 10 seconds max
      },
      30000
    );
  });
});
