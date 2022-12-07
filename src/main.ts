import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

import { saveFile } from '../libs/systems';

const USERID = 'cws0001';
const PASSWORD = '';

const processFile = './fillOver20Qualifications.ts';

export const main = async (driver: ThenableWebDriver) => {
  const process = await import(processFile);

  console.log(process.getUrl());

  await driver.get(process.getUrl());
  await driver.findElement(By.name('uid')).sendKeys(USERID);
  await driver.findElement(By.name('pwd')).sendKeys(PASSWORD, Key.ENTER);

  let result = false;

  try {
    const process = await import(processFile);
    result = await process.execute(driver);
  } catch (e) {
    console.error(e);
    const img = await driver.takeScreenshot();
    saveFile('evidence', 'evicence.png', img);
  }

  if (result) {
    await driver.quit();
  }
};

export default main;
