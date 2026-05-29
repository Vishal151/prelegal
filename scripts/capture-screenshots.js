/**
 * Capture screenshots for README using Playwright.
 * Run from the repo root: node scripts/capture-screenshots.js
 *
 * Requires: backend on :8001, frontend dev server on :3000
 */

const { chromium } = require("playwright");
const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.join(__dirname, "..", "docs", "screenshots");
const GIF_OUT = path.join(__dirname, "..", "docs", "demo.gif");

const TEST_EMAIL = `demo_${Date.now()}@prelegal.test`;
const TEST_PASSWORD = "DemoPass123!";
const TEST_NAME = "Demo User";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function takeScreenshot(page, name, waitMs = 800) {
  await sleep(waitMs);
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  saved: ${name}.png`);
  return file;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  const files = [];

  // 1. Login page
  console.log("1. Login page");
  await page.goto(BASE_URL);
  await page.waitForSelector("form");
  files.push(await takeScreenshot(page, "01-login"));

  // 2. Sign up
  console.log("2. Sign up");
  await page.click("button:has-text('Create an account')");
  await sleep(400);
  await page.fill('input[type="text"]', TEST_NAME);
  await page.fill('input[type="email"]', TEST_EMAIL);
  const pwFields = await page.$$('input[type="password"]');
  await pwFields[0].fill(TEST_PASSWORD);
  if (pwFields[1]) await pwFields[1].fill(TEST_PASSWORD);
  files.push(await takeScreenshot(page, "02-signup", 300));
  await page.click('button[type="submit"]');

  // 3. Chat page (document selection)
  console.log("3. Chat — document selection");
  await page.waitForURL(`${BASE_URL}/chat`, { timeout: 10000 });
  await page.waitForSelector("textarea, input[type='text']", { timeout: 8000 });
  files.push(await takeScreenshot(page, "03-chat-select", 1000));

  // 4. Type a message to select NDA
  console.log("4. Chat — select NDA");
  const chatInput = page.locator("input[placeholder='Type a message...']").first();
  await chatInput.fill("I need a mutual NDA between two companies");
  files.push(await takeScreenshot(page, "04-chat-typing", 400));
  await page.keyboard.press("Enter");
  await sleep(5000);
  files.push(await takeScreenshot(page, "05-chat-response", 500));

  // 5. Navigate to NDA page directly
  console.log("5. NDA document creator");
  await page.goto(`${BASE_URL}/nda`);
  // Wait for either the doc creator layout or a redirect to login
  await page.waitForSelector("button, input, header", { timeout: 10000 });
  // If redirected to login, re-authenticate
  if (page.url().includes("localhost:3000") && !page.url().includes("/nda")) {
    console.log("  (re-authenticating...)");
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await sleep(2000);
    await page.goto(`${BASE_URL}/nda`);
    await page.waitForSelector("button, input", { timeout: 10000 });
  }
  files.push(await takeScreenshot(page, "06-nda-creator", 1500));

  // 6. Fill some NDA fields via chat
  console.log("6. NDA — chat interaction");
  const ndaInput = page.locator("input[placeholder='Type a message...']").first();
  if (await ndaInput.isVisible({ timeout: 3000 }).catch(() => false)) {
    await ndaInput.fill("Party A is Acme Corp based in Delaware, Party B is StartupCo based in California");
    await page.keyboard.press("Enter");
    await sleep(5000);
    files.push(await takeScreenshot(page, "07-nda-filled", 500));
  }

  // 7. Switch to Form tab
  console.log("7. NDA form tab");
  const formTab = page.locator("button:has-text('Form')").first();
  if (await formTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await formTab.click();
    await sleep(800);
    files.push(await takeScreenshot(page, "08-nda-form", 400));
  }

  // 8. Switch back to AI Chat to show filled preview side
  console.log("8. NDA AI Chat tab");
  const chatTab = page.locator("button:has-text('AI Chat')").first();
  if (await chatTab.isVisible({ timeout: 3000 }).catch(() => false)) {
    await chatTab.click();
    await sleep(600);
    files.push(await takeScreenshot(page, "09-nda-chat-filled", 400));
  }

  await browser.close();

  // Create GIF from screenshots using ffmpeg
  console.log("\nCreating GIF...");
  const fileList = files.join(" ");

  // Use ImageMagick convert for GIF: 1.5s per frame
  const imArgs = files.flatMap((f) => ["-delay", "150", f]);
  const result = spawnSync(
    "convert",
    ["-loop", "0", "-resize", "1280x800", ...imArgs, GIF_OUT],
    { stdio: "inherit" }
  );
  if (result.status !== 0) throw new Error(`convert exited with ${result.status}`);

  console.log(`\nDone. Screenshots in: docs/screenshots/`);
  console.log(`GIF: docs/demo.gif`);
  console.log(`\nFiles captured:`);
  files.forEach((f) => console.log(`  ${path.basename(f)}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
