const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 700 }, deviceScaleFactor: 4 });
  await page.goto('file://' + path.join(__dirname, 'kirvano-banner.html'));
  await page.waitForTimeout(300);

  await (await page.$('#b1200')).screenshot({ path: path.join(__dirname, 'kirvano-1200x240@4x.png') });
  await (await page.$('#b720')).screenshot({ path: path.join(__dirname, 'kirvano-720x320@4x.png') });

  await browser.close();
})();
