import { expect, test } from 'vitest';
import { v1 as base, v2 as baseV2 } from '../lib/tiledb-cloud';

test('exported BASE_PATH is correct', () => {
  expect(base.BASE_PATH).toBe('http://localhost/v1');
  expect(baseV2.BASE_PATH).toBe('http://localhost/v2');
});
