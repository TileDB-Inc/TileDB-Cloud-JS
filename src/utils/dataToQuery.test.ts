import dataToQuery from "./dataToQuery";

const arraySchemaAttributes: any = [
  {
    cellValNum: 4294967295,
    name: "a1",
    type: "CHAR",
    filterPipeline: {},
    fillValue: [128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 4294967295,
    name: "a2",
    type: "UINT64",
    filterPipeline: {},
    fillValue: [255, 255, 255, 255, 255, 255, 255, 255],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 4294967295,
    name: "a4",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: "a3",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: "a0",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: "a5",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: true,
    fillValueValidity: false,
  },
  {
    cellValNum: 4294967295,
    name: "a6",
    type: "INT32",
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: true,
    fillValueValidity: false,
  },
];

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
      int64: ["1", "4"],
    },
    filterPipeline: {},
    name: "cols",
    nullTileExtent: false,
    tileExtent: {
      int64: "4",
    },
    type: "INT64",
  },
];

describe("dataToQuery()", () => {
  it("Should return correct data", () => {
    const stringQueryData: any = {
      layout: "row-major",
      ranges: [
        [
          ["a", "c"],
          ["a", "c"],
        ],
        [
          [2, 4],
          [2, 4],
        ],
      ],
      bufferSize: 15000,
    };
    const exptectedRanges = [
      {
        buffer: [97, 99, 97, 99],
        bufferSizes: [2, 2],
        bufferStartSizes: [1, 1],
        hasDefaultRange: false,
        type: "STRING_ASCII",
      },
      {
        buffer: [
          2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
          0, 4, 0, 0, 0, 0, 0, 0, 0,
        ],
        bufferSizes: [16, 16],
        bufferStartSizes: [0, 0],
        hasDefaultRange: false,
        type: "INT64",
      },
    ];
    const expectedAttrBuffers = [
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a1",
        originalFixedLenBufferSizeInBytes: 1500,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 187,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a2",
        originalFixedLenBufferSizeInBytes: 1500,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 1500,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a4",
        originalFixedLenBufferSizeInBytes: 1500,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 750,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a3",
        originalFixedLenBufferSizeInBytes: 750,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a0",
        originalFixedLenBufferSizeInBytes: 750,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a5",
        originalFixedLenBufferSizeInBytes: 750,
        originalValidityLenBufferSizeInBytes: 187,
        originalVarLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a6",
        originalFixedLenBufferSizeInBytes: 1500,
        originalValidityLenBufferSizeInBytes: 187,
        originalVarLenBufferSizeInBytes: 750,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "rows",
        originalFixedLenBufferSizeInBytes: 1500,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 187,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "cols",
        originalFixedLenBufferSizeInBytes: 1500,
        originalValidityLenBufferSizeInBytes: 0,
        originalVarLenBufferSizeInBytes: 0,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
    ];
    const totalBufferSize = expectedAttrBuffers.reduce((accum, attr) => {
      return (
        accum +
        attr.originalFixedLenBufferSizeInBytes +
        attr.originalVarLenBufferSizeInBytes +
        attr.originalValidityLenBufferSizeInBytes
      );
    }, 0);
    const res = dataToQuery(stringQueryData, arraySchemaAttributes, dimensions);

    expect(res.reader.layout).toEqual("row-major");
    expect(res.reader.subarray.ranges).toEqual(exptectedRanges);
    expect(res.attributeBufferHeaders).toEqual(expectedAttrBuffers);
    expect(totalBufferSize).toBe(14998);
  });
});
