import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1366, height: 768 },
});

test.describe('Slow Motion Live Chrome Test - Dashboard CMS', () => {

  test('Interactive Live Test with Slow Motion', async ({ page }) => {
    // Jalankan dengan jeda 1.2 detik per tindakan agar pergerakan terlihat di layar
    page.setDefaultTimeout(15000);

    // 1. Login
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(1200);

    await page.fill('input[name="email"]', 'owner@example.com');
    await page.waitForTimeout(800);

    await page.fill('input[name="password"]', 'superpassword123');
    await page.waitForTimeout(800);

    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(1500);

    // 2. Navigasi ke Profile
    await page.click('a[href="/dashboard/profile"]');
    await page.waitForURL('**/dashboard/profile');
    await page.waitForTimeout(1500);

    // 3. Navigasi ke Skills & Tambah Group
    await page.click('a[href="/dashboard/skills"]');
    await page.waitForURL('**/dashboard/skills');
    await page.waitForTimeout(1000);

    await page.click('button:has-text("Tambah Kelompok Skill")');
    await page.waitForTimeout(800);
    await page.fill('input[placeholder*="Nama Kelompok Baru"]', 'Slow Motion Skill Group');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Simpan Group")');
    await page.waitForTimeout(1500);

    // 4. Navigasi ke Learning Tracks & Trigger Sonner Modal
    await page.click('a[href="/dashboard/learning-tracks"]');
    await page.waitForURL('**/dashboard/learning-tracks');
    await page.waitForTimeout(1000);

    await page.click('button:has-text("Tambah Track")');
    await page.waitForTimeout(800);
    await page.fill('input[placeholder*="Web Engine Fundamentals"]', 'Slow Motion Track');
    await page.fill('input[placeholder*="Self-taught / Dicoding"]', 'Live Slow Test');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Simpan Track")');
    await page.waitForTimeout(1500);

    // Trigger Sonner Modal Hapus
    await page.click('button[aria-label*="Hapus track Slow Motion Track"]');
    await page.waitForTimeout(2000); // Tahan modal agar terlihat di layar
    await page.click('button:has-text("Ya, Hapus")');
    await page.waitForTimeout(1500);

    // 5. Navigasi ke Projects
    await page.click('a[href="/dashboard/projects"]');
    await page.waitForURL('**/dashboard/projects');
    await page.waitForTimeout(1500);

    // 6. Logout
    await page.click('button:has-text("Logout")');
    await page.waitForTimeout(2000); // Tahan toast logout agar terlihat
  });

});
