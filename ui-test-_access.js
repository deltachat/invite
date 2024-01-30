const kDefaultRoute = 'file://' + __dirname + '/index.html';

describe('DCInvite_Access', () => {

  before(() => DCVisit(kDefaultRoute));

  it('shows logo', () => expect(page.locator('.logo')).toBeVisible());

  it('shows logo-image', () => expect(page.locator('.logo img')).toBeVisible());

  it('shows logo-text', () => expect(page.locator('.logo-text')).toBeVisible());

});
