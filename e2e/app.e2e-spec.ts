import { AkanoidPage } from './app.po';

describe('akanoid App', () => {
  let page: AkanoidPage;

  beforeEach(() => {
    page = new AkanoidPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
