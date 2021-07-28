"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int64Types = void 0;
const v2_1 = require("../v2");
exports.int64Types = [
    v2_1.Datatype.Int64,
    v2_1.Datatype.Uint64,
    v2_1.Datatype.DatetimeAs,
    v2_1.Datatype.DatetimeDay,
    v2_1.Datatype.DatetimeFs,
    v2_1.Datatype.DatetimeHr,
    v2_1.Datatype.DatetimeMin,
    v2_1.Datatype.DatetimeMonth,
    v2_1.Datatype.DatetimeMs,
    v2_1.Datatype.DatetimeNs,
    v2_1.Datatype.DatetimePs,
    v2_1.Datatype.DatetimeSec,
    v2_1.Datatype.DatetimeUs,
    v2_1.Datatype.DatetimeWeek,
    v2_1.Datatype.DatetimeYear,
];
const mapToBigIntIfNeeded = (data, type) => {
    let nums = data;
    if (exports.int64Types.includes(type) && typeof nums[0] === "number") {
        nums = data.map(BigInt);
    }
    return nums;
};
exports.default = mapToBigIntIfNeeded;
//# sourceMappingURL=mapToBigIntIfNeeded.js.map