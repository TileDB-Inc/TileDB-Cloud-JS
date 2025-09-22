import { Configuration } from '../../v1';
import { Querytype } from '../../v2';
import arrayFetchFromConfig from './arrayFetchFromConfig';
import { describe, it, expect } from 'vitest';

describe('arrayFetchFromConfig()', () => {
  it('Should should add token', () => {
    const config = new Configuration({ accessToken: 'non_existent_token' });
    const result = arrayFetchFromConfig(config, Querytype.Read);
    const expectedResult = {
      config: {
        entries: [
          { key: 'rest.use_refactored_array_open', value: 'true' },
          {
            key: 'rest.use_refactored_array_open_and_query_submit',
            value: 'false'
          },
          { key: 'rest.load_metadata_on_array_open', value: 'true' },
          { key: 'rest.load_non_empty_domain_on_array_open', value: 'true' },
          { key: 'rest.token', value: 'non_existent_token' }
        ]
      },
      queryType: 'READ'
    };

    expect(expectedResult).toEqual(result);
  });

  it('Should should add username', () => {
    const config = new Configuration({ username: 'random_username' });
    const result = arrayFetchFromConfig(config, Querytype.Read);
    const expectedResult = {
      config: {
        entries: [
          { key: 'rest.use_refactored_array_open', value: 'true' },
          {
            key: 'rest.use_refactored_array_open_and_query_submit',
            value: 'false'
          },
          { key: 'rest.load_metadata_on_array_open', value: 'true' },
          { key: 'rest.load_non_empty_domain_on_array_open', value: 'true' },
          { key: 'rest.username', value: 'random_username' }
        ]
      },
      queryType: 'READ'
    };

    expect(expectedResult).toEqual(result);
  });

  it('Should should add password', () => {
    const config = new Configuration({ password: 'not_a_pass' });
    const result = arrayFetchFromConfig(config, Querytype.Read);
    const expectedResult = {
      config: {
        entries: [
          { key: 'rest.use_refactored_array_open', value: 'true' },
          {
            key: 'rest.use_refactored_array_open_and_query_submit',
            value: 'false'
          },
          { key: 'rest.load_metadata_on_array_open', value: 'true' },
          { key: 'rest.load_non_empty_domain_on_array_open', value: 'true' },
          { key: 'rest.password', value: 'not_a_pass' }
        ]
      },
      queryType: 'READ'
    };

    expect(expectedResult).toEqual(result);
  });
});
