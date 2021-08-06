const { default: dataToQuery, getRanges } = require("../lib/utils/dataToQuery");

const arraySchemaAttributes = [
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

const dimensions = [
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
    const stringQueryData = {
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
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a2",
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a4",
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a3",
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a0",
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a5",
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
      {
        fixedLenBufferSizeInBytes: 0,
        name: "a6",
        originalFixedLenBufferSizeInBytes: 714,
        originalValidityLenBufferSizeInBytes: 714,
        originalVarLenBufferSizeInBytes: 714,
        validityLenBufferSizeInBytes: 0,
        varLenBufferSizeInBytes: 0,
      },
    ];
    const res = dataToQuery(stringQueryData, arraySchemaAttributes, dimensions);

    expect(res.reader.layout).toEqual("row-major");
    expect(res.reader.subarray.ranges).toEqual(exptectedRanges);
    expect(res.attributeBufferHeaders).toEqual(expectedAttrBuffers);
  });
});

describe("getRanges()", () => {
  it("Should create int32 ranges", () => {
    const dimensions = [
      {
        domain: {
          int32: [1, 4],
        },
        filterPipeline: {},
        name: "rows",
        nullTileExtent: false,
        tileExtent: {
          int32: 4,
        },
        type: "INT32",
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
    const expected = [
      {
        buffer: [1, 0, 0, 0, 4, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
    ];
    expect(
      getRanges(
        [
          [1, 4],
          [2, 3],
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it("Should create overlapped ranges", () => {
    const dimensions = [
      {
        domain: {
          int32: [1, 4],
        },
        filterPipeline: {},
        name: "rows",
        nullTileExtent: false,
        tileExtent: {
          int32: 4,
        },
        type: "INT32",
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

    const expected = [
      {
        buffer: [1, 0, 0, 0, 4, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
      {
        buffer: [1, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8, 8],
        bufferStartSizes: [0, 0],
        hasDefaultRange: false,
        type: "INT32",
      },
    ];

    expect(
      getRanges(
        [
          [1, 4],
          [
            [1, 3],
            [2, 3],
          ],
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it("Should create string ranges", () => {
    const dimensions = [
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
    const expected = [
      {
        buffer: [97, 99],
        bufferSizes: [2],
        bufferStartSizes: [1],
        hasDefaultRange: false,
        type: "STRING_ASCII",
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
    ];
    expect(
      getRanges(
        [
          ["a", "c"],
          [2, 3],
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it("Should create string empty ranges", () => {
    const dimensions = [
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
    const expected = [
      {
        buffer: [],
        bufferSizes: [0],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "STRING_ASCII",
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
    ];
    expect(
      getRanges(
        [
          [],
          [2, 3],
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it("Should create string overlapped ranges", () => {
    const dimensions = [
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
    const expected = [
      {
        buffer: [97, 99, 97, 98],
        bufferSizes: [2, 2],
        bufferStartSizes: [1, 1],
        hasDefaultRange: false,
        type: "STRING_ASCII",
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
    ];
    expect(
      getRanges(
        [
          [
            ["a", "c"],
            ["a", "bb"],
          ],
          [2, 3],
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it("Should create datetime ranges", () => {
    const dimensions = [
      {
        domain: {
          int32: [1, 100],
        },
        filterPipeline: {},
        name: "id",
        nullTileExtent: false,
        tileExtent: {
          int32: 10,
        },
        type: "INT32",
      },
      {
        domain: {
          int64: ["0", "3153600000"],
        },
        filterPipeline: {},
        name: "timestamp",
        nullTileExtent: false,
        tileExtent: {
          int64: "86400",
        },
        type: "DATETIME_SEC",
      },
    ];
    const expected = [
      {
        buffer: [1, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "INT32",
      },
      {
        buffer: [
          8, 94, 180, 94, 0, 0, 0, 0, 8, 187, 177, 94, 0, 0, 0, 0, 0, 225, 11,
          94, 0, 0, 0, 0,
        ],
        bufferSizes: [24],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: "DATETIME_SEC",
      },
    ];
    expect(
      getRanges(
        [
          [1, 3],
          [1588878856, 1588706056, 1577836800],
        ],
        dimensions
      )
    ).toEqual(expected);
  });
});
