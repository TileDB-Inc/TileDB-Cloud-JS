import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          include: [
            './src/**/*.{test,spec}.?(c|m)[jt]s?(x)',
            './tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
          ]
        }
      },
      {
        test: {
          name: 'browser',
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
            headless: true
          },
          include: [
            './src/**/*.{test,spec}.?(c|m)[jt]s?(x)',
            './tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'
          ],
          exclude: [
            './src/utils/getResultsFromArrayBuffer/getResultsFromArrayBuffer.test.ts',
            './src/utils/convertToArrayBufferIfNodeBuffer/convertToArrayBufferIfNodeBuffer.test.ts',
            './src/utils/isNodeBuffer/isNodeBuffer.test.ts'
          ]
        }
      }
    ]
  }
});
