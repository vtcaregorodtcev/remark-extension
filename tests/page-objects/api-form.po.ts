import { API_PATH_INPUT, API_XKEY_INPUT, SUBMIT_API_CONFIG } from "@tests/testids";
import { Page } from "puppeteer";

export const ApiConfigPage = {
  async apiPathInput(page: Page) {
    return await page.$(`[data-testid="${API_PATH_INPUT}"]`);
  },

  async apiXKeyInput(page: Page) {
    return await page.$(`[data-testid="${API_XKEY_INPUT}"]`);
  },

  async submitApiConfBtn(page: Page) {
    return await page.$(`[data-testid="${SUBMIT_API_CONFIG}"]`);
  }
};