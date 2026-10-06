import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",

  timeout: 60_000,

  fullyParallel: false,
  workers: 1,

  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,

  expect: {
    timeout: 20_000,
  },

  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL,

    navigationTimeout: 30_000,

    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  webServer: {
    command: `pnpm exec next dev -H 127.0.0.1 -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
