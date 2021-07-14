const base = require('../lib/v1/base');
const baseV2 = require('../lib/v2/base');

test('exported BASE_PATH is correct', () => {
  expect(base.BASE_PATH).toBe('https://api.tiledb.com/v1');
  expect(baseV2.BASE_PATH).toBe('https://api.tiledb.com/v2');
});
