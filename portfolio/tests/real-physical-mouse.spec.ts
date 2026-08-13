import { test, expect } from '@playwright/test';

test.use({
  headless: false,
  viewport: { width: 1280, height: 720 },
});

test.describe('Real Physical Mouse Test', () => {

  test('Physical Mouse Movement and Click', async ({ page }) => {
    // 1. Buka halaman login
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(2000);

    // 2. Gerakkan kursor fisik mouse ke koordinat input email dan klik
    const emailInput = page.locator('input[name="email"]');
    const emailBox = await emailInput.boundingBox();
    if (emailBox) {
      await page.mouse.move(emailBox.x + emailBox.width / 2, emailBox.y + emailBox.height / 2, { steps: 25 });
      await page.mouse.click(emailBox.x + emailBox.width / 2, emailBox.y + emailBox.height / 2);
      await page.keyboard.type('owner@example.com', { delay: 100 });
    }
    await page.waitForTimeout(1000);

    // 3. Gerakkan kursor fisik mouse ke input password dan klik
    const passwordInput = page.locator('input[name="password"]');
    const passBox = await passwordInput.boundingBox();
    if (passBox) {
      await page.mouse.move(passBox.x + passBox.width / 2, passBox.y + passBox.height / 2, { steps: 25 });
      await page.mouse.click(passBox.x + passBox.width / 2, passBox.y + passBox.height / 2);
      await page.keyboard.type('superpassword123', { delay: 100 });
    }
    await page.waitForTimeout(1000);

    // 4. Gerakkan kursor fisik mouse ke tombol Submit dan klik
    const submitBtn = page.locator('button[type="submit"]');
    const submitBox = await submitBtn.boundingBox();
    if (submitBox) {
      await page.mouse.move(submitBox.x + submitBox.width / 2, submitBox.y + submitBox.height / 2, { steps: 25 });
      await page.mouse.click(submitBox.x + submitBox.width / 2, submitBox.y + submitBox.height / 2);
    }

    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(2000);

    // 5. Gerakkan mouse ke menu Profile
    const profileLink = page.locator('aside nav a[href="/dashboard/profile"]');
    const profBox = await profileLink.boundingBox();
    if (profBox) {
      await page.mouse.move(profBox.x + profBox.width / 2, profBox.y + profBox.height / 2, { steps: 25 });
      await page.mouse.click(profBox.x + profBox.width / 2, profBox.y + profBox.height / 2);
    }
    await page.waitForTimeout(3000);

    // 6. Gerakkan mouse ke menu Skills
    const skillsLink = page.locator('aside nav a[href="/dashboard/skills"]');
    const skillBox = await skillsLink.boundingBox();
    if (skillBox) {
      await page.mouse.move(skillBox.x + skillBox.width / 2, skillBox.y + skillBox.height / 2, { steps: 25 });
      await page.mouse.click(skillBox.x + skillBox.width / 2, skillBox.y + skillBox.height / 2);
    }
    await page.waitForTimeout(3000);
  });

});
