import puppeteer, { Browser, WaitForOptions } from 'puppeteer';

const EXAMPLE_PAGE_URL = 'https://www.google.com/';
const WAIT_TIL_LOAD: WaitForOptions = { waitUntil: 'load' };

const initBrowserWithExtension = async (extensionPath: string) => await puppeteer.launch({
  headless: false,
  devtools: false,
  args: [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ],
});

const getExamplePage = async (browser: Browser) => {
  const examplePage = await browser.newPage();

  await examplePage.goto(EXAMPLE_PAGE_URL, WAIT_TIL_LOAD);

  return examplePage;
}

const getExtensionPage = async (browser: Browser) => {
  const targets = browser.targets();
  const extensionTarget = targets.find(target => target.type() === 'service_worker');

  // @ts-ignore
  const partialExtensionUrl = extensionTarget._targetInfo.url || '';
  const [,, extensionId] = partialExtensionUrl.split('/');

  const extensionPage = await browser.newPage();
  const extensionUrl = `chrome-extension://${extensionId}/popup.html`;
  await extensionPage.goto(extensionUrl, WAIT_TIL_LOAD);

  return extensionPage;
}

export async function bootstrap() {
  const browser = await initBrowserWithExtension(process.env.EXTENSION_PATH || './dist');

  const examplePage = await getExamplePage(browser);
  const extensionPage = await getExtensionPage(browser);

  return { browser, examplePage, extensionPage };
}