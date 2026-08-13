import { test, expect } from '@playwright/test';

test.describe('Automated E2E Test Suite - Portfolio & Dashboard', () => {

  test('1. Test Public Home Page & Project Navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/Portfolio/);

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    await page.screenshot({ path: 'screenshots/test-e2e-home.png' });

    await page.click('a[href="/projects"]');
    await expect(page).toHaveURL('http://localhost:3000/projects');
    await page.screenshot({ path: 'screenshots/test-e2e-projects-public.png' });
  });

  test('2. Test Login Flow & Auth Session Cookie', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.fill('input[name="password"]', 'superpassword123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL('http://localhost:3000/dashboard');

    await expect(page.locator('text=ONLINE')).toBeVisible();
    await page.screenshot({ path: 'screenshots/test-e2e-dashboard-overview.png' });
  });

  test('3. Test Dashboard CRUD Operations & Sonner Toast Confirmation', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.fill('input[name="password"]', 'superpassword123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    // Test Skills Page CRUD
    await page.goto('http://localhost:3000/dashboard/skills');
    await expect(page.locator('h1')).toContainText('Skills');

    await page.click('button:has-text("Tambah Kelompok Skill")');
    await page.fill('input[placeholder*="Nama Kelompok Baru"]', 'Automated Test Stack');
    await page.click('button:has-text("Simpan Group")');

    await expect(page.locator('text=Automated Test Stack').first()).toBeVisible();
    await page.screenshot({ path: 'screenshots/test-e2e-skills-created.png' });

    // Test Learning Tracks Page
    await page.goto('http://localhost:3000/dashboard/learning-tracks');
    await page.click('button:has-text("Tambah Track")');
    await page.fill('input[placeholder*="Web Engine Fundamentals"]', 'E2E Testing Track');
    await page.fill('input[placeholder*="Self-taught / Dicoding"]', 'Playwright Automated Test');
    await page.click('button:has-text("Simpan Track")');

    await expect(page.getByRole('heading', { name: 'E2E Testing Track' })).toBeVisible();
    await page.screenshot({ path: 'screenshots/test-e2e-tracks-created.png' });

    // Test Sonner Custom Confirm Modal on Delete
    const deleteButton = page.locator('button[aria-label*="Hapus track E2E Testing Track"]');
    await deleteButton.click();

    await expect(page.locator('text=Hapus Learning Track?')).toBeVisible();
    await page.screenshot({ path: 'screenshots/test-e2e-sonner-confirm-modal.png' });

    await page.click('button:has-text("Ya, Hapus")');

    // Verify track heading is deleted from the page list
    await expect(page.getByRole('heading', { name: 'E2E Testing Track' })).not.toBeVisible();
    await page.screenshot({ path: 'screenshots/test-e2e-track-deleted.png' });
  });

  test('4. Test Logout Flow & Sonner Toast Alert', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.fill('input[name="password"]', 'superpassword123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    await page.click('button:has-text("Logout")');

    await expect(page.locator('text=Berhasil Keluar (Logout)')).toBeVisible();
    await page.screenshot({ path: 'screenshots/test-e2e-logout-toast.png' });

    await page.waitForURL('**/login');
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

});
