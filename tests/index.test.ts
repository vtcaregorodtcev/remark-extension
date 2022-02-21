import { Browser, Page } from "puppeteer";
import { bootstrap } from "./lib/bootstrap";
import { API_KEY, API_PATH, mockAPI } from "./lib/mock-api";
import { pause } from "./lib/pause";
import { ApiConfigPageObject } from "./page-objects/api-form.po";

describe('Remark extension', () => {
  let browser: Browser, examplePage: Page, extensionPage: Page, apiConfPO: ApiConfigPageObject;

  beforeAll(async () => {
    const context = await bootstrap();

    browser = context.browser;
    examplePage = context.examplePage;
    extensionPage = context.extensionPage;

    await extensionPage.setRequestInterception(true);

    extensionPage.on('request', (interceptedRequest) => {
      if (interceptedRequest.isInterceptResolutionHandled()) return;

      if (interceptedRequest.url().startsWith(API_PATH))
        mockAPI(interceptedRequest)
      else interceptedRequest.continue();
    });

    apiConfPO = new ApiConfigPageObject(extensionPage);
  });

  it('should show api config screen when open', async () => {
    /** Focus extension page */
    await extensionPage.bringToFront();

    const apiPathInput = await apiConfPO.apiPathInput();
    const apiXkeyInput = await apiConfPO.apiXKeyInput();
    const apiConfSubmitBtn = await apiConfPO.submitApiConfBtn();

    expect(apiPathInput).toBeTruthy();
    expect(apiXkeyInput).toBeTruthy();
    expect(apiConfSubmitBtn).toBeTruthy();
  });

  it('should POST: /bookmarks with xkey provided in headers by submitting config', async () => {
    const mockFn = jest.fn();

    extensionPage.on('request', (request) => {
      if (request.url().endsWith('/bookmarks') && request.method() === 'POST') {
        mockFn(request.headers()['x-api-key']);
      }
    });

    await apiConfPO.submitConfig();
    await pause(100);

    expect(mockFn).toBeCalledWith(API_KEY);
  });

  describe('when API config provided', () => {
    it('should create bookmark and show temp bookmark page', async () => {
      // TODO: add test
    });
  });

  afterAll(async () => {
    await examplePage.close();
    await extensionPage.close();

    await browser.close();
  });
});