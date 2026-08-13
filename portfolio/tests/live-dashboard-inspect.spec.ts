import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1366, height: 768 },
});

test.describe('Live Dashboard Inspection', () => {

  test('Direct Interactive Inspection on /dashboard', async ({ page }) => {
    // Set timeout lebih longgar untuk inspeksi live
    page.setDefaultTimeout(60000);

    // 1. Auto login agar bisa masuk ke /dashboard
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.fill('input[name="password"]', 'superpassword123');
    await page.click('button[type="submit"]');

    // 2. Tiba di /dashboard
    await page.waitForURL('**/dashboard');
    console.log('Tiba di /dashboard. Membuka inspeksi live...');

    // 3. Tahan browser Chrome tetap terbuka selama 45 detik agar bigboss bisa melihat langsung tampilan dashboard
    await page.waitForTimeout(45000);
  });

});
