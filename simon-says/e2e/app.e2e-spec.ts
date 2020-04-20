import { SimonSaysPage } from './app.po';

describe('simon-says App', () => {
  let page: SimonSaysPage;

  beforeEach(() => {
    page = new SimonSaysPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
