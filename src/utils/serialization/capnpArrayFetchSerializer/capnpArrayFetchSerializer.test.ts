import { ArrayFetch } from '../../../v2';
import capnpArrayFetchDeserializer from '../../deserialization/capnpArrayFetchDeserializer/capnpArrayFetchDeserializer';
import capnpArrayFetchSerializer from './capnpArrayFetchSerializer';
import { describe, it, expect } from 'vitest';

describe('capnpArrayFetchSerializer()', () => {
  it('Should serialize ArrayFetch object to capnp', () => {
    const arrayFetch = {
      config: {
        entries: [
          { key: 'config.env_var_prefix', value: 'TILEDB_' },
          { key: 'config.logging_format', value: 'DEFAULT' }
        ]
      },
      queryType: 'WRITE'
    };
    const result = capnpArrayFetchSerializer(arrayFetch as ArrayFetch);
    const deserialized = capnpArrayFetchDeserializer(result);
    expect(deserialized.queryType).toBe('WRITE');
    expect(result.byteLength).toBe(152);
  });
});
