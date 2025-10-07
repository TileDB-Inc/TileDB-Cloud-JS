import { ArrayFetch } from '../../v2';
import { QueryType, Configuration } from '../../v3';

const arrayFetchFromConfig = (
  config: Configuration,
  queryType: QueryType
): ArrayFetch => {
  const arrayFetch = {
    config: {
      entries: [
        {
          key: 'rest.use_refactored_array_open',
          value: 'true'
        },
        {
          key: 'rest.use_refactored_array_open_and_query_submit',
          value: 'true'
        },
        {
          key: 'rest.load_metadata_on_array_open',
          value: 'true'
        },
        {
          key: 'rest.load_non_empty_domain_on_array_open',
          value: 'true'
        }
      ]
    },
    queryType: queryType
  };

  if (config.accessToken) {
    const entry = {
      key: 'rest.token',
      value: config.accessToken as string
    };
    arrayFetch.config.entries.push(entry);
  }

  if (config.username) {
    const entry = {
      key: 'rest.username',
      value: config.username
    };
    arrayFetch.config.entries.push(entry);
  }

  if (config.password) {
    const entry = {
      key: 'rest.password',
      value: config.password
    };
    arrayFetch.config.entries.push(entry);
  }

  return arrayFetch;
};

export default arrayFetchFromConfig;
