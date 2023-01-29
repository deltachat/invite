const kDefaultRoute = 'file://' + __dirname + '/index.html';

const { test, expect } = require('@playwright/test');

const i18next = require('i18next');

Object.entries(require('fs').readdirSync(require('path').join(__dirname, 'i18n')).reduce(function (coll, item) {
  return Object.assign(coll, {
    [item.match(/(\w+)\.js/i).pop()]: require(require('path').join(__dirname, 'i18n', item)).i18n,
  });
}, {})).forEach(function ([lang, values]) {

  i18next.init({
    lng: lang,
    resources: {
      [lang]: {
        translation: values[lang],
      },
    },
  });

  const t = i18next.t;

  test.beforeEach(async ({ page }) => {
    await page.goto(kDefaultRoute + '?lang=' + lang);
  });

  test.describe('DCInvite_Localize-' + lang, () => {

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

    test('localizes ChatButton', async ({ page }) => {
      await expect(page.locator('#dc-link')).toHaveText(t('ChatButtonText'));
    });

    test('localizes DownloadBlurb', async ({ page }) => {
      await expect(page.locator('.download-text')).toHaveText(t('DownloadBlurbText'));
    });

    test('localizes DownloadLink', async ({ page }) => {
      await expect(page.locator('.download a')).toHaveText(t('DownloadLinkText'));
    });

  });

});
