process.env.HOME = process.env.USERPROFILE || 'C:\\Users\\Firefox';
process.env.PLAYWRIGHT_BROWSERS_PATH = (process.env.USERPROFILE || 'C:\\Users\\Firefox') + '\\pw-browsers';

import { test } from '@playwright/test';

test('open', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(8000);
});
