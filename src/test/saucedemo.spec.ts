//tools/utilitys/libraries
import { test, expect, chromium, Browser } from '@playwright/test';
import { readCSV } from '../utility/csv-utility';

//page objects
import { SauceDemoLoginPage } from '../pages/saucedemo/login.page';
import { SauceDemoProductsPage } from '../pages/saucedemo/products.page';



test.describe('Sauce Demo Login', () => {
  let sauceDemoPage: SauceDemoLoginPage;
  let sauceDemoProductsPage: SauceDemoProductsPage;
  let browser: Browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    sauceDemoPage = new SauceDemoLoginPage(page);
    sauceDemoProductsPage = new SauceDemoProductsPage(page);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('should login with valid credentials', async () => {
    const testData = await readCSV('../testdata/saucedemo/login.data.csv');
    await sauceDemoPage.goto();
    for(const data of testData ){
      await sauceDemoPage.login(data.username, data.password);
    }
    expect(await sauceDemoPage.areProductsDisplayed()).toBe(true);
  });

  test('display selected products', async () => {
    const testData = await readCSV('../testdata/saucedemo/products.data.csv');
    for(const data of testData ){
      const productMatched = await sauceDemoProductsPage.getProductInfoByPriceCondition(data.range, data.price);
      console.log('Products Matched :: ', productMatched);
    }
  });
});
