const kDefaultRoute = 'file://' + __dirname + '/index.html';

describe('DCInvite_Misc', () => {

  before(() => DCVisit(kDefaultRoute));

  it('removes placeholder', () => expect(page.locator('#name')).toHaveText(''));

  it('sets input autofocus', () => expect(page.locator('textarea')).toHaveAttribute('autofocus', ''));

  context('enter info', () => {

    before(() => page.getByRole('textbox').fill('OPENPGP4FPR:F085B63BE151EF3B8ACCE5D677B218ED4BCB8DCB#a=alfa%40bravo.charlie&n=delta&i=echo&s=foxtrot'));

    it('sets share-link target', () => expect(page.locator('.share-link')).toHaveAttribute('target', '_blank'));
    
    it('sets share-link href', () => expect(page.locator('.share-link')).toHaveAttribute('href', '#F085B63BE151EF3B8ACCE5D677B218ED4BCB8DCB&a=alfa%40bravo.charlie&n=delta&i=echo&s=foxtrot'));

  });

  context('address', () => {

    const address = Math.random().toString();

    before(() => DCVisit(kDefaultRoute + '#&a=' + address));

    it('binds address', () => expect(page.locator('#name')).toHaveText(address));

  });

  context('name', () => {

    const name = Math.random().toString();

    before(() => DCVisit(kDefaultRoute + '#&a=alfa&n=' + name));

    it('binds name', () => expect(page.locator('#name')).toHaveText(name));

  });

  context('group', () => {

    const group = Math.random().toString();

    before(() => DCVisit(kDefaultRoute + '#&a=alfa&n=username&g=' + group));

    it('binds group over name', () => expect(page.locator('#name')).toHaveText(group));

  });

  context('broadcast', () => {

    const broadcast = Math.random().toString();

    before(() => DCVisit(kDefaultRoute + '#&a=alfa&n=username&b=' + broadcast));

    it('binds broadcast over name', () => expect(page.locator('#name')).toHaveText(broadcast));

  });

});
