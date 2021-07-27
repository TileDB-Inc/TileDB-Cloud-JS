import { Datatype } from "../v2";

const int64Types = [
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
  Datatype.DatetimeYear,
];

const mapToBigIntIfNeeded = (data: number[], type: Datatype) => {
  let nums: Array<number | BigInt> = data;
  if (int64Types.includes(type) && typeof nums[0] === "number") {
    nums = data.map(BigInt);
  }

  return nums;
};

export default mapToBigIntIfNeeded;
