import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173/';
const OUTPUT_DIR = path.resolve('assets/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching Chrome via puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop Hero Screenshot
  console.log('Capturing Desktop Hero...');
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.waitForTimeout ? page.waitForTimeout(1500) : new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'hero-desktop.png'),
    clip: { x: 0, y: 0, width: 1600, height: 1000 }
  });

  // 2. Portfolio Showcase Grid Screenshot
  console.log('Capturing Portfolio Showcase...');
  const showcaseElement = await page.$('#showcase');
  if (showcaseElement) {
    await showcaseElement.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'portfolio-showcase.png'),
      clip: { x: 0, y: 70, width: 1600, height: 1100 }
    });
  }

  // 3. Quick-View Modal Screenshot
  console.log('Capturing Quick-View Modal...');
  const firstCard = await page.$('.property-card');
  if (firstCard) {
    await firstCard.click();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'quick-view-modal.png')
    });
    // Close modal
    const closeBtn = await page.$('#modalInternalClose');
    if (closeBtn) await closeBtn.click();
  }

  // 4. Mobile Viewport Screenshot (with compression bar)
  console.log('Capturing Mobile Viewport...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  // Scroll slightly to demonstrate sticky compressed filter bar over portfolio
  await page.evaluate(() => window.scrollTo(0, 750));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(OUTPUT_DIR, 'mobile-compressed-filter.png')
  });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
