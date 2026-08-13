import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1366, height: 768 },
});

test.describe('Live Chrome Browser Test - Dashboard CMS Only', () => {

  test('Interactive Live Test - Dashboard Flows & All UI Buttons', async ({ page }) => {
    // 1. Buka halaman login & masukan kredensial
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.fill('input[name="password"]', 'superpassword123');
    await page.click('button[type="submit"]');

    // 2. Tunggu masuk ke Dashboard Overview
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1')).toContainText('Ruang kerja portfolio');
    await page.screenshot({ path: 'screenshots/live-chrome-01-overview.png' });

    // 3. Tes Navigasi ke Halaman Profile
    await page.click('a[href="/dashboard/profile"]');
    await page.waitForURL('**/dashboard/profile');
    await expect(page.locator('h1')).toContainText('Profile dan kontak');
    await page.screenshot({ path: 'screenshots/live-chrome-02-profile.png' });

    // 4. Tes Navigasi ke Halaman Skills & Tambah Group
    await page.click('a[href="/dashboard/skills"]');
    await page.waitForURL('**/dashboard/skills');
    await page.click('button:has-text("Tambah Kelompok Skill")');
    await page.fill('input[placeholder*="Nama Kelompok Baru"]', 'Chrome Live Test Group');
    await page.click('button:has-text("Simpan Group")');
    await expect(page.locator('text=Chrome Live Test Group')).toBeVisible();
    await page.screenshot({ path: 'screenshots/live-chrome-03-skills.png' });

    // 5. Tes Navigasi ke Halaman Learning Tracks & Sonner Modal
    await page.click('a[href="/dashboard/learning-tracks"]');
    await page.waitForURL('**/dashboard/learning-tracks');
    await page.click('button:has-text("Tambah Track")');
    await page.fill('input[placeholder*="Web Engine Fundamentals"]', 'Chrome Live Track');
    await page.fill('input[placeholder*="Self-taught / Dicoding"]', 'Live Chrome Extension');
    await page.click('button:has-text("Simpan Track")');
    await expect(page.getByRole('heading', { name: 'Chrome Live Track' })).toBeVisible();

    // Hapus track untuk menguji Sonner Toast Modal
    await page.click('button[aria-label*="Hapus track Chrome Live Track"]');
    await expect(page.locator('text=Hapus Learning Track?')).toBeVisible();
    await page.screenshot({ path: 'screenshots/live-chrome-04-sonner-modal.png' });
    await page.click('button:has-text("Ya, Hapus")');
    await expect(page.getByRole('heading', { name: 'Chrome Live Track' })).not.toBeVisible();

    // 6. Tes Halaman Projects & Form Tambah Project
    await page.click('a[href="/dashboard/projects"]');
    await page.waitForURL('**/dashboard/projects');
    await page.screenshot({ path: 'screenshots/live-chrome-05-projects.png' });

    // 7. Tes Logout & Notifikasi Toast
    await page.click('button:has-text("Logout")');
    await expect(page.locator('text=Berhasil Keluar (Logout)')).toBeVisible();
    await page.screenshot({ path: 'screenshots/live-chrome-06-logout.png' });
  });

});
