import { Page } from '@playwright/test';

export class SauceDemoProductsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  elements = {
    inventoryList: '.inventory_list',
    inventoryItem: '.inventory_item',
    inventoryName: '.inventory_item_name',
    inventoryDesc: '.inventory_item_desc',
    inventoryPrice: '.inventory_item_price'
  }

  async getProductInfoByPriceCondition(range: 'less than' | 'greater than' | 'equal', price: number) {
    await this.page.waitForSelector(this.elements.inventoryList);

    const inventoryItems = await this.page.$$(this.elements.inventoryItem);

    const results = [];
    for (const item of inventoryItems) {
      const priceElement = await item.$(this.elements.inventoryPrice);
      const priceText = await priceElement?.innerText();
      const itemPrice = parseFloat(priceText?.replace('$', '') || '0');

      let conditionMet = false;
      switch (range) {
        case 'less than':
          conditionMet = itemPrice < Number(price);
          break;
        case 'greater than':
          conditionMet = itemPrice > Number(price);
          break;
        case 'equal':
          conditionMet = itemPrice === Number(price);
          break;
      }

      if (conditionMet) {
        const nameElement = await item.$(this.elements.inventoryName);
        const descriptionElement = await item.$(this.elements.inventoryDesc);

        const name = await nameElement?.innerText();
        const description = await descriptionElement?.innerText();

        results.push({
          name,
          description,
          price: priceText
        });
      }
    }

    return results;
  }
}
