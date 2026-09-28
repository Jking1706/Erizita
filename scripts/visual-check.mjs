import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const targetUrl = process.env.VISUAL_URL ?? 'http://127.0.0.1:5173';
const outputDir = process.env.VISUAL_OUT ?? join(process.env.TEMP ?? '.', 'opencode', 'caro-visual');
const consoleMessages = [];
const captureUrl = new URL(targetUrl);

captureUrl.searchParams.set('clean', '1');

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  desktop.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push(`[${message.type()}] ${message.text()}`);
    }
  });
  desktop.on('pageerror', (error) => consoleMessages.push(`[pageerror] ${error.message}`));

  await desktop.goto(captureUrl.href, { waitUntil: 'networkidle', timeout: 60000 });
  await desktop.waitForTimeout(3500);
  await desktop.screenshot({ path: join(outputDir, 'desktop-initial.png'), fullPage: true });

  await desktop.locator('canvas').first().click({ position: { x: 720, y: 450 } });
  await desktop.keyboard.down('ArrowUp');
  await desktop.waitForTimeout(1300);
  await desktop.keyboard.up('ArrowUp');
  await desktop.keyboard.press('KeyE');
  await desktop.waitForTimeout(1200);
  await desktop.screenshot({ path: join(outputDir, 'desktop-after-input.png'), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
  await mobile.goto(captureUrl.href, { waitUntil: 'networkidle', timeout: 60000 });
  await mobile.waitForTimeout(3500);
  await mobile.screenshot({ path: join(outputDir, 'mobile.png'), fullPage: true });

  console.log(`Visual captures saved to: ${outputDir}`);
  if (consoleMessages.length) {
    console.log('Browser warnings/errors:');
    consoleMessages.forEach((message) => console.log(`- ${message}`));
  }
} finally {
  await browser.close();
}

process.exit(0);
