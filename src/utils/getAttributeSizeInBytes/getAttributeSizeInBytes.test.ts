import { nullableVarLengthAttrBufferHeaders } from "../../fixtures/attributeBufferHeaders"
import getAttributeSizeInBytes from "./getAttributeSizeInBytes"
import { describe, it, expect } from 'vitest';

describe('getAttributeSizeInBytes()', () => {
    it('Should return total size of buffer size of an attribute', () => {
        const result = getAttributeSizeInBytes(nullableVarLengthAttrBufferHeaders[1]);

        expect(result).toEqual(52);
    })
})