const kDefaultRoute = 'file://' + __dirname + '/index.html';

const i18next = require('i18next');
const t = i18next.t;

Object.entries(require('fs').readdirSync(require('path').join(__dirname, 'i18n')).filter(function (e) {
  return e.match(/^[a-z]+\.js/i);
}).reduce(function (coll, item) {
  return Object.assign(coll, {
    [item.match(/(\w+)\.js/i).pop()]: require(require('path').join(__dirname, 'i18n', item)).i18n,
  });
}, {})).forEach(function ([lang, values]) {

  describe('DCInvite_Localize-' + lang, () => {

    before(() => i18next.init({
      lng: lang,
      resources: {
        [lang]: {
          translation: values[lang],
        },
      },
    }));

    before(() => DCVisit(kDefaultRoute + '?lang=' + lang));

    it('localizes title', () => expect(page).toHaveTitle(t('TitleText')));

    it('localizes description', () => expect(page.locator('meta[name="description"]')).toHaveAttribute('content', t('DescriptionText')));

    it('localizes logo', () => expect(page.locator('.logo-text')).toHaveText('Delta Chat'));

    context('without info', () => {

      it('localizes form-blurb', () => expect(page.locator('.form-blurb')).toHaveText(t('FormBlurbText')));

      it('localizes step-code', async () => expect(await page.evaluate(() => {
          return document.querySelector('.step-code').innerHTML
        })).toEqual(t('StepCodeText')));

      it('localizes step-paste', () => expect(page.locator('.step-paste')).toHaveText(t('StepPasteText')));

      it('localizes step-share', () => expect(page.locator('.step-share')).toHaveText(t('StepShareText')));

      it('localizes share-link', () => expect(page.locator('.share-link')).toHaveText(t('ShareLinkText')));

    });

    context('with info', () => {

      before(() => DCVisit(kDefaultRoute + '?lang=' + lang + '#&a=alfa&n=' + Math.random().toString()));

      it('localizes join', () => expect(page.locator('#join')).toHaveText(t('JoinText')));

      it('localizes download', () => expect(page.locator('.download')).toHaveText(t('DownloadText')));

      it('localizes chat', () => expect(page.locator('#dc-link')).toHaveText(t('ChatText')));

    });

    context('with info (group)', () => {

      before(() => DCVisit(kDefaultRoute + '?lang=' + lang + '#&g=' + Math.random().toString()));

      it('localizes group join', () => expect(page.locator('#join')).toHaveText(t('JoinGroupText')));

    });

  });

});
