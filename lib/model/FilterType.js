"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterType;
(function (FilterType) {
    FilterType[FilterType["NONE"] = 'FILTER_NONE'] = "NONE";
    FilterType[FilterType["GZIP"] = 'FILTER_GZIP'] = "GZIP";
    FilterType[FilterType["ZSTD"] = 'FILTER_ZSTD'] = "ZSTD";
    FilterType[FilterType["LZ4"] = 'FILTER_LZ4'] = "LZ4";
    FilterType[FilterType["RLE"] = 'FILTER_RLE'] = "RLE";
    FilterType[FilterType["BZIP2"] = 'FILTER_BZIP2'] = "BZIP2";
    FilterType[FilterType["DOUBLEDELTA"] = 'FILTER_DOUBLE_DELTA'] = "DOUBLEDELTA";
    FilterType[FilterType["BITWIDTHREDUCTION"] = 'FILTER_BIT_WIDTH_REDUCTION'] = "BITWIDTHREDUCTION";
    FilterType[FilterType["BITSHUFFLE"] = 'FILTER_BITSHUFFLE'] = "BITSHUFFLE";
    FilterType[FilterType["BYTESHUFFLE"] = 'FILTER_BYTESHUFFLE'] = "BYTESHUFFLE";
    FilterType[FilterType["POSITIVEDELTA"] = 'FILTER_POSITIVE_DELTA'] = "POSITIVEDELTA";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
//# sourceMappingURL=filterType.js.map