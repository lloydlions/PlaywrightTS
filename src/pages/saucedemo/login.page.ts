import { Page } from '@playwright/test';
require('dotenv').config();

export class SauceDemoLoginPage {
  private page: Page;

  private usernameInputSelector = '#user-name';
  private passwordInputSelector = '#password';
  private loginButtonSelector = '#login-button';
  private errorMessageSelector = 'h3[data-test="error"]';
  private productsSelector = '.inventory_item';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInputSelector, username);
    await this.page.fill(this.passwordInputSelector, password);
    await this.page.click(this.loginButtonSelector);
    await this.page.waitForTimeout(5000)
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessageSelector);
  }

  async areProductsDisplayed() {
    return await this.page.isVisible(this.productsSelector);
  }
}
