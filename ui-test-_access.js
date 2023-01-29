const kDefaultRoute = 'file://' + __dirname + '/index.html';

const { test, expect } = require('@playwright/test');

test.describe('DCInvite_Access', () => {

  test.describe('general', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute);
    });

    test('shows logo', async ({ page }) => {
      await expect(page.locator('.logo')).toBeVisible();
      await expect(page.locator('.logo img')).toBeVisible();
      await expect(page.locator('.logo-text')).toBeVisible();
    });

  });

  test.describe('without info', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute);
    });

    test('shows form', async ({ page }) => {
      await expect(page.locator('form')).toBeVisible();
      
      await expect(page.locator('.form-blurb')).toBeVisible();
      await expect(page.locator('.step-code')).toBeVisible();
      await expect(page.locator('.step-paste')).toBeVisible();
      await expect(page.locator('input')).toBeVisible();
      await expect(page.locator('.step-share')).toBeVisible();
      await expect(page.locator('.share-link')).toBeHidden();
    });

    test('hides section', async ({ page }) => {
      await expect(page.locator('section')).toBeHidden();
    });

    test.describe('enter info', () => {

      test('shows share-link', async ({ page }) => {
        await page.getByRole('textbox').fill('OPENPGP4FPR:F085B63BE151EF3B8ACCE5D677B218ED4BCB8DCB#a=alfa%40bravo.charlie&n=delta&i=echo&s=foxtrot')
        await expect(page.locator('.share-link')).toBeVisible();
      });

    });

  });

  test.describe('with info', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute + '#&a=alfa&g=bravo&n=' + Math.random().toString());
    });

    test('hides form', async ({ page }) => {
      await expect(page.locator('form')).toBeHidden();
    });

    test('shows section', async ({ page }) => {
      await expect(page.locator('section')).toBeVisible();

      await expect(page.locator('#join')).toBeVisible();
      await expect(page.locator('#name')).toBeVisible();

      await expect(page.locator('.download')).toBeVisible();
      
      await expect(page.locator('#dc-link')).toBeVisible();
    });

  });

});
