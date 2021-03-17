const base = require('../lib/base');

test('exported BASE_PATH is correct', () => {
  expect(base.BASE_PATH).toBe('https://api.tiledb.com/v1')
});
