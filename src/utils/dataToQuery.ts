import { Attribute, Dimension } from "../v1";
import { Query, Querystatus, Querytype } from "../v2";
import { QueryData } from '../TileDBQuery/TileDBQuery';
import getRanges from './getRanges';

/**
 * Helper function that takes user data and returns a Query object.
 * Since the Query object is really big we don't expect user to manually set all the values.
 * We get the essential minimal data needed from the user (such as the layout and ranges) and
 * convert it to a Query object.
 * @param data 
 * @param attributes 
 * @param dimensions 
 * @returns Query object
 */
const dataToQuery = (data: QueryData, attributes: Attribute[], dimensions: Dimension[]): Query => {
  if (!data.layout) {
    return data as any;
  }
  const { bufferSize } = data;
  //   TODO: Distribute buffer size depending on the data's type (e.g. INT64 needs 8 times the bytes of an INT8)
  const AVERAGE_BUFFER_SIZE = Math.floor(bufferSize / (attributes.length * 3));
  const ranges = getRanges(data.ranges, dimensions);
  const attributeBufferHeaders = attributes.map((attr) => ({
    name: attr.name,
    fixedLenBufferSizeInBytes: 0,
    varLenBufferSizeInBytes: 0,
    validityLenBufferSizeInBytes: 0,
    originalFixedLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
    originalVarLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
    originalValidityLenBufferSizeInBytes: AVERAGE_BUFFER_SIZE,
  }));
  
  return {
    attributeBufferHeaders,
    layout: data.layout,
    status: Querystatus.Uninitialized,
    type: Querytype.Read,
    reader: {
      layout: data.layout,
      subarray: {
        layout: data.layout,
        ranges,
      },
      readState: {
        subarrayPartitioner: {
          subarray: {
            layout: data.layout,
            ranges: [],
          },
          budget: [],
          current: {
            subarray: {
              layout: data.layout,
              ranges: [],
            },
          },
        },
      },
    },
  } as Query;
};

export default dataToQuery;

