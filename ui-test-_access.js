const kDefaultRoute = 'file://' + __dirname + '/index.html';

describe('DCInvite_Access', () => {

  before(() => DCVisit(kDefaultRoute));

  it('shows logo', () => expect(page.locator('.logo')).toBeVisible());

  it('shows logo-image', () => expect(page.locator('.logo img')).toBeVisible());

  it('shows logo-text', () => expect(page.locator('.logo-text')).toBeVisible());

  context('without info', () => {

    it('shows form', () => expect(page.locator('form')).toBeVisible());

    it('shows form-blurb', () => expect(page.locator('.form-blurb')).toBeVisible());

    it('shows step-code', () => expect(page.locator('.step-code')).toBeVisible());

    it('shows step-paste', () => expect(page.locator('.step-paste')).toBeVisible());

    it('shows textarea', () => expect(page.locator('textarea')).toBeVisible());

    it('shows step-share', () => expect(page.locator('.step-share')).toBeVisible());

    it('shows share-link', () => expect(page.locator('.share-link')).toBeHidden());

    it('hides section', () => expect(page.locator('.section')).toBeHidden());

    context('enter info', () => {

      before(() => page.getByRole('textbox').fill('OPENPGP4FPR:alfa#a=bravo%40charlie.delta&n=echo&i=foxtrot&s=golf'));

      it('shows share-link', () => expect(page.locator('.share-link')).toBeVisible());

    });

  });

  context('with info', () => {

    before(() => DCVisit(kDefaultRoute + '#&a=alfa&g=bravo&n=' + Math.random().toString()));

    it('hides form', () => expect(page.locator('form')).toBeHidden());

    it('shows section', () => expect(page.locator('section')).toBeVisible());

    it('shows #join', () => expect(page.locator('#join')).toBeVisible());
    it('shows #name', () => expect(page.locator('#name')).toBeVisible());

    it('shows .download', () => expect(page.locator('.download')).toBeVisible());
    
    it('shows #dc-link', () => expect(page.locator('#dc-link')).toBeVisible());

  });

});
