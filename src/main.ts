import { By, Key, ThenableWebDriver, until } from 'selenium-webdriver';

import { sleep } from '../libs/systems';

export const main = async (driver: ThenableWebDriver) => {
  // ↓↓↓ any process you wants.
  await driver.get(`file:///${process.cwd()}/pages/page-1.html`);

  await driver.findElement(By.id('input-data')).sendKeys('hoge', Key.ENTER);
  await driver.findElement(By.id('button-alert')).click();
  await driver.wait(until.alertIsPresent());
  await sleep(3);
  await driver.switchTo().alert().accept();
  await driver.findElement(By.id('link-next')).click();
  await sleep(3);
  await driver.findElement(By.id('link-back')).click();

  // await driver.quit();
  // ↑↑↑ any process you wants.
};

export default main;
