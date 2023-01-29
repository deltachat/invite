const kDefaultRoute = 'file://' + __dirname + '/index.html';

const { test, expect } = require('@playwright/test');

test.describe('DCInvite_Misc', () => {

  test.describe('no values', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute);
    });

    test('removes placeholder', async ({ page }) => {
      await expect(page.locator('#name')).toHaveText('');
    });

    test('sets input autofocus', async ({ page }) => {
      await expect(page.locator('textarea')).toHaveAttribute('autofocus', '');
    });

    test.describe('enter info', () => {

      test('sets share-link attributes', async ({ page }) => {
        await page.getByRole('textbox').fill('OPENPGP4FPR:F085B63BE151EF3B8ACCE5D677B218ED4BCB8DCB#a=alfa%40bravo.charlie&n=delta&i=echo&s=foxtrot')
        await expect(page.locator('.share-link')).toHaveAttribute('target', '_blank');
        await expect(page.locator('.share-link')).toHaveAttribute('href', '#F085B63BE151EF3B8ACCE5D677B218ED4BCB8DCB&a=alfa%40bravo.charlie&n=delta&i=echo&s=foxtrot');
      });

    });

  });

  test.describe('address', () => {

    const address = Math.random().toString();

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute + '#&a=' + address);
    });

    test('binds address', async ({ page }) => {
      await expect(page.locator('#name')).toHaveText(address);
    });

  });

  test.describe('name', () => {

    const name = Math.random().toString();

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute + '#&a=alfa&g=bravo&n=' + name);
    });

    test('binds name', async ({ page }) => {
      await expect(page.locator('#name')).toHaveText(name);
    });

  });

  test.describe('group', () => {

    const group = Math.random().toString();

    test.beforeEach(async ({ page }) => {
      await page.goto(kDefaultRoute + '#&a=alfa&g=' + group);
    });

    test('binds group', async ({ page }) => {
      await expect(page.locator('#name')).toHaveText(group);
    });

  });

});