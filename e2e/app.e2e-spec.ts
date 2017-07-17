import { BusinessCardEditorPage } from './app.po';

describe('business-card-editor App', () => {
  let page: BusinessCardEditorPage;

  beforeEach(() => {
    page = new BusinessCardEditorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
