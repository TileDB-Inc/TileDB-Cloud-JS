import { Datatype } from '../v2';

export const fixedLenAttributesSchema = [
  {
    name: 'rows',
    nullTileExtent: false,
    type: Datatype.Int32,
    tileExtent: { int32: 4 },
    domain: { int32: [] },
    filterPipeline: {},
  },
  {
    name: 'cols',
    nullTileExtent: false,
    type: Datatype.Int32,
    tileExtent: { int32: 4 },
    domain: { int32: [] },
    filterPipeline: {},
  },
  {
    cellValNum: 1,
    name: 'a3',
    type: Datatype.Int32,
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
  {
    cellValNum: 1,
    name: 'a0',
    type: Datatype.Int32,
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: false,
    fillValueValidity: true,
  },
];

export const varLenNullableAttributesSchema = [
  {
    name: 'rows',
    nullTileExtent: false,
    type: Datatype.Int32,
    tileExtent: { int32: 2 },
    domain: { int32: [] },
    filterPipeline: {},
  },
  {
    name: 'cols',
    nullTileExtent: false,
    type: Datatype.Int32,
    tileExtent: { int32: 2 },
    domain: { int32: [] },
    filterPipeline: {},
  },
  {
    cellValNum: 1,
    name: 'a1',
    type: Datatype.Int32,
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: true,
    fillValueValidity: false,
  },
  {
    cellValNum: 4294967295,
    name: 'a2',
    type: Datatype.Int32,
    filterPipeline: {},
    fillValue: [0, 0, 0, 128],
    nullable: true,
    fillValueValidity: false,
  },
  {
    cellValNum: 4294967295,
    name: 'a3',
    type: Datatype.StringUtf8,
    filterPipeline: {},
    fillValue: [0],
    nullable: true,
    fillValueValidity: false,
  },
];
