import { test, expect } from '@playwright/test';

test.describe('Live Extension Test - Dashboard', () => {

  test('Direct Chrome Extension Inspection on /dashboard', async ({ page }) => {
    page.setDefaultTimeout(60000);

    // 1. Buka login
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(1000);

    // 2. Isi form
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.waitForTimeout(700);
    await page.fill('input[name="password"]', 'superpassword123');
    await page.waitForTimeout(700);

    // 3. Click login
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(1500);

    // 4. Klik menu Profile di Chrome Extension
    await page.click('a[href="/dashboard/profile"]');
    await page.waitForURL('**/dashboard/profile');
    await page.waitForTimeout(2000);

    // 5. Klik menu Skills di Chrome Extension
    await page.click('a[href="/dashboard/skills"]');
    await page.waitForURL('**/dashboard/skills');
    await page.waitForTimeout(2000);

    // 6. Klik menu Learning Tracks di Chrome Extension
    await page.click('a[href="/dashboard/learning-tracks"]');
    await page.waitForURL('**/dashboard/learning-tracks');
    await page.waitForTimeout(2000);

    // 7. Klik menu Projects di Chrome Extension
    await page.click('a[href="/dashboard/projects"]');
    await page.waitForURL('**/dashboard/projects');
    await page.waitForTimeout(2000);
  });

});
