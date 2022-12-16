import { ThenableWebDriver } from 'selenium-webdriver';

import { saveFile } from '../libs/systems';

const processFile = './ssfAnswerCreate.ts';

export const main = async (driver: ThenableWebDriver) => {
  const process = await import(processFile);

  console.log(process.getUrl());

  await driver.get(process.getUrl());

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
