const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 700 }, deviceScaleFactor: 4 });
  await page.goto('file://' + path.join(__dirname, 'banner.html'));
  await page.waitForTimeout(300);

  await (await page.$('#banner-1200')).screenshot({ path: path.join(__dirname, 'resincode-banner-1200x240@4x.png') });
  await (await page.$('#banner-720')).screenshot({ path: path.join(__dirname, 'resincode-banner-720x320@4x.png') });

  await browser.close();
  console.log('done');
})();
