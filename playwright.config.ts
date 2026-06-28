import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.TEST_ENV || 'qa';
const isCI = Boolean(process.env.CI);
dotenv.config({ path: path.resolve(__dirname, `env/.env.${envName}`) });

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  retries: isCI ? 1 : 0,
  reporter: isCI
    ? [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/e2e-junit-results.xml' }],
      ]
    : [
        ['html', { outputFolder: 'playwright-report' }],
        ['junit', { outputFile: 'test-results/e2e-junit-results.xml' }],
      ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost',
    headless: isCI,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
  },
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'Chromium',
      dependencies: ['setup'],
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        storageState: 'playwright/.auth/UserSession.json',
      },
    },
  ],
});
