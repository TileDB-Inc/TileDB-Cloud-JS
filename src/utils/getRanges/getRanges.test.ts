import { Datatype, Dimension } from '../../v2';
import getRanges from './getRanges';
import { describe, it, expect } from 'vitest';

describe('getRanges()', () => {
  it('Should create int32 ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'rows',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      },
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'cols',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      }
    ];
    const expected = [
      {
        buffer: [1, 0, 0, 0, 4, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      }
    ];
    expect(
      getRanges(
        [
          [1, 4],
          [2, 3]
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it('Should create overlapped ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'rows',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      },
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'cols',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      }
    ];

    const expected = [
      {
        buffer: [1, 0, 0, 0, 4, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      },
      {
        buffer: [1, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8, 8],
        bufferStartSizes: [0, 0],
        hasDefaultRange: false,
        type: 'INT32'
      }
    ];

    expect(
      getRanges(
        [
          [1, 4],
          [
            [1, 3],
            [2, 3]
          ]
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it('Should create string ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: null,
        filterPipeline: {},
        name: 'rows',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      },
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'cols',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      }
    ];
    const expected = [
      {
        buffer: [97, 99],
        bufferSizes: [2],
        bufferStartSizes: [1],
        hasDefaultRange: false,
        type: 'STRING_ASCII'
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      }
    ];
    expect(
      getRanges(
        [
          ['a', 'c'],
          [2, 3]
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it('Should create string empty ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: null,
        filterPipeline: {},
        name: 'rows',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      },
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'cols',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      }
    ];
    const expected = [
      {
        buffer: [],
        bufferSizes: [0],
        bufferStartSizes: [0],
        hasDefaultRange: true,
        type: 'STRING_ASCII'
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      }
    ];
    expect(getRanges([[], [2, 3]], dimensions)).toEqual(expected);
  });

  it('Should create string overlapped ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: null,
        filterPipeline: {},
        name: 'rows',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      },
      {
        domain: {
          int32: [1, 4]
        },
        filterPipeline: {},
        name: 'cols',
        nullTileExtent: false,
        tileExtent: {
          int32: 4
        },
        type: Datatype.Int32
      }
    ];
    const expected = [
      {
        buffer: [97, 99, 97, 98, 98],
        bufferSizes: [2, 3],
        bufferStartSizes: [1, 1],
        hasDefaultRange: false,
        type: 'STRING_ASCII'
      },
      {
        buffer: [2, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      }
    ];
    expect(
      getRanges(
        [
          [
            ['a', 'c'],
            ['a', 'bb']
          ],
          [2, 3]
        ],
        dimensions
      )
    ).toEqual(expected);
  });

  it('Should create string genomics ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: null,
        filterPipeline: {},
        name: 'gene_id',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      },
      {
        domain: null,
        filterPipeline: {},
        name: 'sample',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      }
    ];
    const expected = [
      {
        type: 'STRING_ASCII',
        hasDefaultRange: true,
        buffer: [],
        bufferSizes: [0],
        bufferStartSizes: [0]
      },
      {
        type: 'STRING_ASCII',
        hasDefaultRange: false,
        buffer: [
          71, 84, 69, 88, 45, 49, 49, 49, 55, 70, 45, 48, 50, 50, 54, 45, 83,
          77, 45, 53, 71, 90, 90, 55, 71, 84, 69, 88, 45, 49, 49, 49, 55, 70,
          45, 49, 51, 50, 54, 45, 83, 77, 45, 53, 69, 71, 72, 72
        ],
        bufferSizes: [48],
        bufferStartSizes: [24]
      }
    ];
    expect(
      getRanges(
        [[], ['GTEX-1117F-0226-SM-5GZZ7', 'GTEX-1117F-1326-SM-5EGHH']],
        dimensions
      )
    ).toEqual(expected);
  });

  it('Should create string genomics ranges that select all', () => {
    const dimensions: Dimension[] = [
      {
        domain: null,
        filterPipeline: {},
        name: 'gene_id',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      },
      {
        domain: null,
        filterPipeline: {},
        name: 'sample',
        nullTileExtent: true,
        tileExtent: {},
        type: Datatype.StringAscii
      }
    ];
    const expected = [
      {
        type: 'STRING_ASCII',
        hasDefaultRange: false,
        buffer: [
          69, 78, 83, 71, 48, 48, 48, 48, 48, 50, 48, 50, 48, 53, 57, 46, 49,
          69, 78, 83, 71, 48, 48, 48, 48, 48, 50, 48, 50, 48, 53, 57, 46, 49
        ],
        bufferSizes: [34],
        bufferStartSizes: [17]
      },
      {
        type: 'STRING_ASCII',
        hasDefaultRange: true,
        buffer: [],
        bufferSizes: [0],
        bufferStartSizes: [0]
      }
    ];
    expect(
      getRanges([['ENSG00000202059.1', 'ENSG00000202059.1'], []], dimensions)
    ).toEqual(expected);
  });

  it('Should create datetime ranges', () => {
    const dimensions: Dimension[] = [
      {
        domain: {
          int32: [1, 100]
        },
        filterPipeline: {},
        name: 'id',
        nullTileExtent: false,
        tileExtent: {
          int32: 10
        },
        type: Datatype.Int32
      },
      {
        domain: {
          int64: [0, 3153600000]
        },
        filterPipeline: {},
        name: 'timestamp',
        nullTileExtent: false,
        tileExtent: {
          int64: 86400
        },
        type: Datatype.DatetimeSec
      }
    ];
    const expected = [
      {
        buffer: [1, 0, 0, 0, 3, 0, 0, 0],
        bufferSizes: [8],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'INT32'
      },
      {
        buffer: [8, 94, 180, 94, 0, 0, 0, 0, 8, 187, 177, 94, 0, 0, 0, 0],
        bufferSizes: [16],
        bufferStartSizes: [0],
        hasDefaultRange: false,
        type: 'DATETIME_SEC'
      }
    ];
    expect(
      getRanges(
        [
          [1, 3],
          [1588878856, 1588706056]
        ],
        dimensions
      )
    ).toEqual(expected);
  });
});
