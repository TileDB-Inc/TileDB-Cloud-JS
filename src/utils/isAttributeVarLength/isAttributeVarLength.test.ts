import {
  fixedLenAttributesSchema,
  varLenNullableAttributesSchema
} from '../../fixtures/attributes';
import isAttributeVarLength from './isAttributeVarLength';
import { describe, it, expect } from 'vitest';

describe('isAttributeVarLength()', () => {
  it('Should return false if attribute is fixed length', () => {
    expect(isAttributeVarLength(fixedLenAttributesSchema[0])).toEqual(false);
  });

  it('Should return true if attribute is var length', () => {
    expect(isAttributeVarLength(varLenNullableAttributesSchema[3])).toEqual(
      true
    );
  });
});
