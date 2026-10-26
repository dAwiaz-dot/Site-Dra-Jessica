const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 700 } });
  await page.goto('file://' + path.join(__dirname, 'logo.html'));
  await page.waitForTimeout(300);

  const emblem = await page.$('#emblem');
  await emblem.screenshot({ path: path.join(__dirname, 'resincode-emblem-transparente.png'), omitBackground: true });

  const dark = await page.$('#lockup-dark');
  await dark.screenshot({ path: path.join(__dirname, 'resincode-logo-preto.png') });

  const light = await page.$('#lockup-light');
  await light.screenshot({ path: path.join(__dirname, 'resincode-logo-branco.png') });

  await browser.close();
  console.log('done');
})();
