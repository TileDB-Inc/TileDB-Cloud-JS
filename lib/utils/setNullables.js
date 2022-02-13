"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupValuesByOffsetBytes_1 = __importDefault(require("./groupValuesByOffsetBytes"));
/**
 * Set nullables on an array
 * @param vals [12, 15, 22, 34, 8]
 * @param nullables [0, 1, 1, 0, 1]
 * @param offsets []
 * @returns [NULL, 15, 22, NULL, 8]
 */
const setNullables = (values, nullables, offsets) => __awaiter(void 0, void 0, void 0, function* () {
    // If values have offsets we group values together by offset
    if (offsets.length) {
        const groupedValues = (yield groupValuesByOffsetBytes_1.default(values, offsets));
        return groupedValues.map((val, i) => (nullables[i] ? val : null));
    }
    // We explicitly set as NULL index where nullable array is 0
    return values.map((val, i) => (nullables[i] ? val : null));
});
exports.default = setNullables;
//# sourceMappingURL=setNullables.js.map