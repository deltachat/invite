const kDefaultRoute = 'file://' + __dirname + '/index.html';

const { test, expect } = require('@playwright/test');

const i18next = require('i18next');
const t = i18next.t;

Object.entries(require('fs').readdirSync(require('path').join(__dirname, 'i18n')).reduce(function (coll, item) {
  return Object.assign(coll, {
    [item.match(/(\w+)\.js/i).pop()]: require(require('path').join(__dirname, 'i18n', item)).i18n,
  });
}, {})).forEach(function ([lang, values]) {

  test.describe('DCInvite_Localize-' + lang, () => {

    test.beforeEach(async ({ page }) => {
      i18next.init({
        lng: lang,
        resources: {
          [lang]: {
            translation: values[lang],
          },
        },
      });

      await page.goto(kDefaultRoute + '?lang=' + lang);
    });

    test('localizes title', async ({ page }) => {
      await expect(page).toHaveTitle(t('TitleText'));
    });

    test('localizes description', async ({ page }) => {
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', t('DescriptionText'));
    });

    test('localizes logo', async ({ page }) => {
      await expect(page.locator('.logo-text')).toHaveText('Delta Chat');
    });

    test('localizes join', async ({ page }) => {
      await expect(page.locator('#join')).toHaveText(t('JoinText'));
    });

    test.skip('localizes name', async ({ page }) => {
      await expect(page.locator('#name')).toHaveText('NAME');
    });

    test('localizes download', async ({ page }) => {
      await expect(page.locator('.download')).toHaveText(t('DownloadText'));
    });

    test('localizes chat', async ({ page }) => {
      await expect(page.locator('#dc-link')).toHaveText(t('ChatText'));
    });

    test.skip('localizes group join', async ({ page }) => {
      await page.goto(kDefaultRoute + '?lang=' + lang + '#&g=' + Math.random().toString());
      await expect(page.locator('#join')).toHaveText(t('JoinGroupText'));
    });

  });

});
