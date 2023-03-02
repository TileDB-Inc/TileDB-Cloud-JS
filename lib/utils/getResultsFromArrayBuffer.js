"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getResultsFromArrayBuffer = void 0;
const getAttributeSizeInBytes_1 = __importDefault(require("./getAttributeSizeInBytes"));
const getAttributeSchema_1 = __importDefault(require("./getAttributeSchema"));
const bufferToData_1 = __importStar(require("./bufferToData"));
const getByteLengthOfDatatype_1 = __importDefault(require("./getByteLengthOfDatatype"));
const setNullables_1 = __importDefault(require("./setNullables"));
const groupValuesByOffsetBytes_1 = __importDefault(require("./groupValuesByOffsetBytes"));
const concatChars_1 = __importDefault(require("./concatChars"));
const convertToArray_1 = __importDefault(require("./convertToArray"));
/**
 * Convert an ArrayBuffer to a map of attributes with their results
 * @param arrayBuffer The slice ArrayBuffer that contains the results
 * @param attributes
 * @param attributesSchema
 * @returns A map of attribute names with the results of every attribute
 */
const getResultsFromArrayBuffer = (arrayBuffer, attributeBufferHeaders, attributesSchema, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {};
    /**
     * We start from the last attribute which is at the end of the buffer
     */
    yield attributeBufferHeaders
        .reverse()
        .reduce((offsetPromise, attribute) => __awaiter(void 0, void 0, void 0, function* () {
        const totalNumberOfBytesOfAttribute = (0, getAttributeSizeInBytes_1.default)(attribute);
        const offset = yield offsetPromise;
        if (!totalNumberOfBytesOfAttribute) {
            if (options.returnRawBuffers) {
                data[attribute.name] = new ArrayBuffer(0);
            }
            else {
                data[attribute.name] = [];
            }
            return offset;
        }
        // If there are validityLenBufferSizeInBytes the attribute is nullable
        const isNullable = !!attribute.validityLenBufferSizeInBytes;
        // If there are varLenBufferSizeInBytes the attribute is varLengthSized
        const isVarLengthSized = !!attribute.varLenBufferSizeInBytes;
        const selectedAttributeSchema = (0, getAttributeSchema_1.default)(attribute.name, attributesSchema);
        const negativeOffset = -1 * offset;
        /**
         * If attribute is varLengthSized, we ignore the first N bytes (where N = fixedLenBufferSizeInBytes)
         * These first N bytes contain the offsets of the attribute, which is a uint64 array.
         */
        const start = negativeOffset -
            totalNumberOfBytesOfAttribute +
            (isVarLengthSized ? attribute.fixedLenBufferSizeInBytes : 0);
        /**
         * If attribute is isNullable we ignore the last N bytes (where N = validityLenBufferSizeInBytes)
         * These last N bytes contain a uint8 array of zeros and ones, where every zero represents
         * that in that index the attribute is null.
         */
        const ending = negativeOffset -
            (isNullable ? attribute.validityLenBufferSizeInBytes : 0);
        const end = ending ? ending : undefined;
        if (options.returnRawBuffers) {
            data[attribute.name] = arrayBuffer.slice(start, end);
            return offset + totalNumberOfBytesOfAttribute;
        }
        let result = (0, bufferToData_1.default)(arrayBuffer.slice(start, end), selectedAttributeSchema.type);
        let offsets = [];
        if (isVarLengthSized && !options.ignoreOffsets) {
            const BYTE_PER_ELEMENT = (0, getByteLengthOfDatatype_1.default)(selectedAttributeSchema.type);
            const startOfBuffer = negativeOffset - totalNumberOfBytesOfAttribute;
            const offsetsBuffer = arrayBuffer.slice(startOfBuffer, startOfBuffer + attribute.fixedLenBufferSizeInBytes);
            /**
             * Offsets are Uint64 numbers, buffer contains byte offsets though,
             * e.g. if type of the attribute is an INT32 (4 bytes per number) and the offsets are [0, 3, 4]
             * the buffer contains the offsets * bytes of the element instead of just the offsets [0, 3 * 4, 4 * 4] = [0, 12, 16]
             */
            const byteOffsets = Array.from(new BigUint64Array(offsetsBuffer));
            // Convert byte offsets to offsets
            offsets = byteOffsets.map((o) => Number(o / BigInt(BYTE_PER_ELEMENT)));
            const isString = typeof result === "string";
            const groupedValues = yield (0, groupValuesByOffsetBytes_1.default)((0, convertToArray_1.default)(result), offsets);
            // If it's a string we concat all the characters to create array of strings
            result = isString
                ? (0, concatChars_1.default)(groupedValues)
                : groupedValues;
        }
        if (isNullable && !options.ignoreNullables) {
            /**
             * If attribute is Nullable, we get the last N bytes, cast it to uint8 array to get
             * what is null.
             */
            const nullableArrayEnd = ending + attribute.validityLenBufferSizeInBytes;
            const nullableArrayBuffer = arrayBuffer.slice(ending, nullableArrayEnd ? nullableArrayEnd : undefined);
            const nullablesTypedArray = (0, bufferToData_1.bufferToInt8)(nullableArrayBuffer);
            /**
             * nullablesArray should be an array of zeros and ones (e.g. [0, 1, 1, 0])
             * Every zero represents that in that specific index the attribute is NULL
             */
            const nullablesArray = Array.from(nullablesTypedArray);
            const values = (0, convertToArray_1.default)(result);
            result = (yield (0, setNullables_1.default)(values, nullablesArray));
        }
        data[attribute.name] = result;
        return offset + totalNumberOfBytesOfAttribute;
    }), Promise.resolve(0));
    return data;
});
exports.getResultsFromArrayBuffer = getResultsFromArrayBuffer;
exports.default = exports.getResultsFromArrayBuffer;
//# sourceMappingURL=getResultsFromArrayBuffer.js.map