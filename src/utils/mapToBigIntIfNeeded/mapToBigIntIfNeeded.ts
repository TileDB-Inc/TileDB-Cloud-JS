import { Datatype } from '../../v3';

// DateTime types are Int64 numbers
export const int64Types: Array<Datatype> = [
  Datatype.Int64,
  Datatype.Uint64,
  Datatype.DatetimeAs,
  Datatype.DatetimeDay,
  Datatype.DatetimeFs,
  Datatype.DatetimeHr,
  Datatype.DatetimeMin,
  Datatype.DatetimeMonth,
  Datatype.DatetimeMs,
  Datatype.DatetimeNs,
  Datatype.DatetimePs,
  Datatype.DatetimeSec,
  Datatype.DatetimeUs,
  Datatype.DatetimeWeek,
  Datatype.DatetimeYear
];

/**
 * If the type is an INT64 (e.g. Datetimes or Uint64 or Int64)
 * we convert the number array to an array of BigInts.
 */
const mapToBigIntIfNeeded = (data: unknown[], type: Datatype) => {
  let nums: Array<unknown> = data;
  if (int64Types.includes(type) && typeof nums[0] === 'number') {
    nums = data.map(BigInt);
  }

  return nums;
};

export default mapToBigIntIfNeeded;
