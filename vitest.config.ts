import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "Node",
          include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)', './tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
        }
      },
      {
        test: {
          name: "Browser",
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
              { browser: "chromium" }
            ],
          },
          include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)', './tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: [
            './src/utils/convertToArrayBufferIfNodeBuffer/convertToArrayBufferIfNodeBuffer.test.ts',
            './src/utils/isNodeBuffer/isNodeBuffer.test.ts'
          ]
        }
      }
    ],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
      enabled: true,
    },
  },
})