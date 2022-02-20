import { Browser, Page } from "puppeteer";
import { bootstrap } from "./bootstrap";
import { ApiConfigPage } from "./page-objects/api-form.po";

describe('Remark extension', () => {
  let browser: Browser, examplePage: Page, extensionPage: Page;

  beforeAll(async () => {
    const context = await bootstrap();

    browser = context.browser;
    examplePage = context.examplePage;
    extensionPage = context.extensionPage;
  });

  it('should show api config screen when open', async () => {
    /** Focus extension page */
    extensionPage.bringToFront();

    const apiPathInput = await ApiConfigPage.apiPathInput(extensionPage);
    const apiXkeyInput = await ApiConfigPage.apiXKeyInput(extensionPage);
    const apiConfSubmitBtn = await ApiConfigPage.submitApiConfBtn(extensionPage);
    
    expect(apiPathInput).toBeDefined();
    expect(apiXkeyInput).toBeDefined();
    expect(apiConfSubmitBtn).toBeDefined();
  });

  afterAll(async () => {
    await browser.close();
  });
});