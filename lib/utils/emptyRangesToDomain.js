"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emptyRangesToDomain = (ranges, dimensions) => {
    return ranges.map((range, i) => {
        const isEmpty = !range.length;
        const domain = dimensions[i].domain;
        if (!isEmpty) {
            return range;
        }
        // If there is a Domain for the dimension we return the dimension's domain as range
        if (domain) {
            const [firstValue] = Object.values(domain);
            return firstValue;
        }
        return range;
    });
};
exports.default = emptyRangesToDomain;
//# sourceMappingURL=emptyRangesToDomain.js.map