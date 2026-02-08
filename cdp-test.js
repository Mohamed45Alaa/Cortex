process.env.HOME = process.env.USERPROFILE;
process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.USERPROFILE + '\\pw-browsers';

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const context = browser.contexts()[0];
  const page = context.pages()[0];

  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  const result = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('video, iframe'));
    return videos.map(v => ({
      tag: v.tagName,
      src: v.src || v.getAttribute('src'),
      visible: !!(v.offsetWidth || v.offsetHeight),
      playing: v.tagName === 'VIDEO' ? !v.paused : true
    }));
  });

  console.log('VIDEO TEST RESULT:');
  console.log(JSON.stringify(result, null, 2));

  await page.screenshot({ path: 'video-check.png' });

  await page.waitForTimeout(5000);
})();
