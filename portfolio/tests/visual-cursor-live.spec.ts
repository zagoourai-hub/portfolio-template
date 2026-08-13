import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1366, height: 768 },
});

test.describe('Visual Cursor Live Test', () => {

  test('Visible Mouse Movement & Clicking on User Screen', async ({ page }) => {
    page.setDefaultTimeout(60000);

    await page.goto('http://localhost:3000/login');
    
    const injectCursor = async () => {
      await page.evaluate(() => {
        if (!document.getElementById('playwright-visual-cursor')) {
          const cursor = document.createElement('div');
          cursor.id = 'playwright-visual-cursor';
          cursor.style.position = 'fixed';
          cursor.style.top = '0';
          cursor.style.left = '0';
          cursor.style.width = '24px';
          cursor.style.height = '24px';
          cursor.style.backgroundColor = '#00e599';
          cursor.style.border = '3px solid #ffffff';
          cursor.style.borderRadius = '50%';
          cursor.style.boxShadow = '0 0 20px #00e599, 0 0 40px #00e599';
          cursor.style.zIndex = '999999';
          cursor.style.pointerEvents = 'none';
          cursor.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          document.body.appendChild(cursor);
        }
      });
    };

    const moveCursorAndClick = async (locatorStr: string) => {
      await injectCursor();
      const element = page.locator(locatorStr).first();
      const box = await element.boundingBox();
      if (box) {
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await page.evaluate(({ x, y }) => {
          const cursor = document.getElementById('playwright-visual-cursor');
          if (cursor) {
            cursor.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
          }
        }, { x, y });
        await page.waitForTimeout(800);
      }
      await element.click();
    };

    // 1. Move to email input
    await moveCursorAndClick('input[name="email"]');
    await page.fill('input[name="email"]', 'owner@example.com');
    await page.waitForTimeout(1000);

    // 2. Move to password input
    await moveCursorAndClick('input[name="password"]');
    await page.fill('input[name="password"]', 'superpassword123');
    await page.waitForTimeout(1000);

    // 3. Move to submit button
    await moveCursorAndClick('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(2000);

    // 4. Move to Profile link in sidebar
    await moveCursorAndClick('aside nav a[href="/dashboard/profile"]');
    await page.waitForURL('**/dashboard/profile');
    await page.waitForTimeout(2000);

    // 5. Move to Skills link in sidebar
    await moveCursorAndClick('aside nav a[href="/dashboard/skills"]');
    await page.waitForURL('**/dashboard/skills');
    await page.waitForTimeout(2000);

    // 6. Move to Learning Tracks link in sidebar
    await moveCursorAndClick('aside nav a[href="/dashboard/learning-tracks"]');
    await page.waitForURL('**/dashboard/learning-tracks');
    await page.waitForTimeout(2000);

    // 7. Move to Projects link in sidebar
    await moveCursorAndClick('aside nav a[href="/dashboard/projects"]');
    await page.waitForURL('**/dashboard/projects');
    await page.waitForTimeout(2000);

    // 8. Move to Logout button
    await moveCursorAndClick('button:has-text("Logout")');
    await page.waitForTimeout(2500);
  });

});
