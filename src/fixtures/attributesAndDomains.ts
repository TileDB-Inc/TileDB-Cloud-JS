import { Attribute, Dimension, Datatype } from '../v1';

const attributesAndDomains: Array<Dimension | Attribute> = [
  {
    domain: {
      int32: [1, 2],
    },
    filterPipeline: {},
    name: 'cols',
    nullTileExtent: false,
    tileExtent: {
      int32: 2,
    },
    type: Datatype.Int32,
  },
  {
    cellValNum: 1,
    filterPipeline: {},
    name: 'a1',
    type: Datatype.Int32,
  },
  {
    cellValNum: 4294967295,
    filterPipeline: {},
    name: 'a2',
    type: Datatype.Int32,
  },
  {
    cellValNum: 4294967295,
    filterPipeline: {},
    name: 'a3',
    type: Datatype.StringUtf8,
  },
];

export default attributesAndDomains;
