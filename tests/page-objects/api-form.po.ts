import { API_KEY, API_PATH } from "@tests/lib/mock-api";
import { API_PATH_INPUT, API_XKEY_INPUT, DOTS_MENU, DOTS_MENU_CLEAR_CONFIG, SUBMIT_API_CONFIG } from "@tests/lib/testids";
import { Page } from "puppeteer";

export class ApiConfigPageObject {
  #extensionPage: Page;

  constructor(extensionPage: Page) {
    this.#extensionPage = extensionPage;
  }

  async apiPathInput() {
    return await this.#extensionPage.$(`[data-testid="${API_PATH_INPUT}"]`);
  }

  async apiXKeyInput() {
    return await this.#extensionPage.$(`[data-testid="${API_XKEY_INPUT}"]`);
  }

  async submitApiConfBtn() {
    return await this.#extensionPage.$(`[data-testid="${SUBMIT_API_CONFIG}"]`);
  }

  async dotsMenu() {
    return await this.#extensionPage.$(`[data-testid="${DOTS_MENU}"]`);
  }

  async dotsMenuClearConfigBtn() {
    return await this.#extensionPage.$(`[data-testid="${DOTS_MENU_CLEAR_CONFIG}"]`);
  }

  async submitConfig() {
    await this.#extensionPage.bringToFront();

    const apiPathInput = await this.apiPathInput();
    const apiXkeyInput = await this.apiXKeyInput();
    const apiConfSubmitBtn = await this.submitApiConfBtn();

    await apiPathInput.type(API_PATH);
    await apiXkeyInput.type(API_KEY);

    await apiConfSubmitBtn.click();
  }

  async clearConfig() {
    await this.#extensionPage.bringToFront();

    const dotsMenu = await this.dotsMenu();

    await dotsMenu.click();

    const clearConfigBtn = await this.dotsMenuClearConfigBtn();

    await clearConfigBtn.click();
  }
};