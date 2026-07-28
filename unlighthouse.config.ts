import { defineConfig } from "unlighthouse";
import { rmSync, existsSync } from "fs";

// Clean previous session so there's no "browser already running" conflict
const sessionDir = "./.unlighthouse-session";
if (existsSync(sessionDir)) {
  rmSync(sessionDir, { recursive: true, force: true });
}

export default defineConfig({
  site: "http://localhost:3000",
  hooks: {
    async authenticate(page) {
      const email = process.env.LIGHTHOUSE_EMAIL;
      const password = process.env.LIGHTHOUSE_PASSWORD;
      if (!email || !password) {
        throw new Error(
          "LIGHTHOUSE_EMAIL and LIGHTHOUSE_PASSWORD must be set in .env",
        );
      }
      await page.goto("http://localhost:3000/auth/Login", {
        waitUntil: "networkidle0",
      });
      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', password);
      await page.keyboard.press("Enter");
      await new Promise((r) => setTimeout(r, 8000));
      await page.goto("http://localhost:3000/workspaces", {
        waitUntil: "networkidle0",
      });
    },
  },
  puppeteerOptions: {
    userDataDir: sessionDir,
  },
  lighthouseOptions: {
    disableStorageReset: true,
    skipAboutBlank: true,
  },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
});
