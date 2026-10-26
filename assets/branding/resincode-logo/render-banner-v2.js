const { chromium } = require('playwright');
const path = require('path');
const { execSync } = require('child_process');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 700 }, deviceScaleFactor: 4 });
  await page.goto('file://' + path.join(__dirname, 'banner-v2.html'));
  await page.waitForTimeout(300);

  await (await page.$('#banner-1200')).screenshot({ path: path.join(__dirname, 'v2-1200x240@4x.png') });
  await (await page.$('#banner-720')).screenshot({ path: path.join(__dirname, 'v2-720x320@4x.png') });

  await browser.close();
})();
