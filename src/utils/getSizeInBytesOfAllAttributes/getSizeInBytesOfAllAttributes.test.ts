import { nullableVarLengthAttrBufferHeaders } from '../../fixtures/attributeBufferHeaders';
import getSizeInBytesOfAllAttributes from './getSizeInBytesOfAllAttributes';
import { describe, it, expect } from 'vitest';

describe('getSizeInBytesOfAllAttributes()', () => {
  it('Should return total buffer size of all attribute buffer headers', () => {
    const result = getSizeInBytesOfAllAttributes(
      nullableVarLengthAttrBufferHeaders
    );

    expect(result).toEqual(172);
  });
});
