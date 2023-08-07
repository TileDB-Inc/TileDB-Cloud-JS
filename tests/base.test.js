const base = require('../lib/v1/api');
const baseV2 = require('../lib/v2/api');

test('exported BASE_PATH is correct', () => {
  expect(base.BASE_PATH).toBe('https://api.tiledb.com/v1');
  expect(baseV2.BASE_PATH).toBe('https://api.tiledb.com/v2');
});
