const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(__dirname, 'vip-group-icon.html'));
  await page.waitForTimeout(300);
  await (await page.$('#icon')).screenshot({ path: path.join(__dirname, 'vip-group-icon.png') });
  await browser.close();
})();
