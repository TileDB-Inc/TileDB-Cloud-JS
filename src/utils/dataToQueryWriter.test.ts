import dataToQueryWriter from './dataToQueryWriter';
import attributeValuesToArrayBuffers from './attributeValuesToArrayBuffers';
import { Layout } from '../v2';

describe("dataToQueryWriter()", () => {
  it("Should return query object", () => {
    const dimensions: any = [
      {
        domain: null,
        filterPipeline: {},
        name: "rows",
        nullTileExtent: true,
        tileExtent: {},
        type: "STRING_ASCII",
      },
      {
        domain: {
          int32: [1, 4],
        },
        filterPipeline: {},
        name: "cols",
        nullTileExtent: false,
        tileExtent: {
          int32: 4,
        },
        type: "INT32",
      },
    ];

    const attributes: any = [
      {
        cellValNum: "1",
        filterPipeline: {},
        name: "a",
        type: "INT32",
      },
    ];

    const query = {
      layout: Layout.Unordered,
      values: {
        a: {
          values: [9, 12, 230],
        },
        rows: {
          values: ["a", "b", "b", "c"],
          offsets: [0, 1, 3],
        },
        cols: {
          values: [1, 4, 3],
        },
      },
    };

    const attrBuffers = attributeValuesToArrayBuffers(
      query.values,
      dimensions,
      attributes
    );

    const expectedRanges = [
      {
        type: "STRING_ASCII",
        hasDefaultRange: true,
        buffer: [],
        bufferSizes: [0],
        bufferStartSizes: [0],
      },
      {
        type: "INT32",
        hasDefaultRange: true,
        buffer: [1, 0, 0, 0, 4, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
      },
    ];

    const expectedAttrBuffer = [
      {
        fixedLenBufferSizeInBytes: 12,
        name: "a",
        originalFixedLenBufferSizeInBytes: 12,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 24,
        name: "rows",
        originalFixedLenBufferSizeInBytes: 24,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 4,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 4,
      },
      {
        fixedLenBufferSizeInBytes: 12,
        name: "cols",
        originalFixedLenBufferSizeInBytes: 12,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
    ];

    expect(
      dataToQueryWriter(query, dimensions, attrBuffers).writer.subarrayRanges
        .ranges
    ).toEqual(expectedRanges);
    expect(
      dataToQueryWriter(query, dimensions, attrBuffers).attributeBufferHeaders
    ).toEqual(expectedAttrBuffer);
  });
});
