const kDefaultRoute = 'file://' + __dirname + '/index.html';

const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto(kDefaultRoute);
});

test.describe('DCInvite_Access', () => {

  test('shows logo', async ({ page }) => {
    await expect(page.locator('.logo')).toHaveCount(1);
    await expect(page.locator('.logo img')).toHaveCount(1);
    await expect(page.locator('.logo-text')).toHaveCount(1);
  });

  test('shows join', async ({ page }) => {
    await expect(page.locator('#join')).toHaveCount(1);
    await expect(page.locator('#name')).toHaveCount(1);
  });

  test('shows ChatButton', async ({ page }) => {
    await expect(page.locator('#dc-link')).toHaveCount(1);
  });

  test('shows download', async ({ page }) => {
    await expect(page.locator('.download-text')).toHaveCount(1);
    await expect(page.locator('.download a')).toHaveCount(1);
  });

});
