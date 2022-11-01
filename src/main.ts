import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

// const URL = 'http://localhost:8080/conversion-nbh-cws/cws/cws';
const URL = 'https://tmeva-develop-cws.company.lab.works-hi.com/self-workflow/cws/cws';
const USERID = 'cws0001';

const processFile = './fillOver20Qualifications.ts';

export const main = async (driver: ThenableWebDriver) => {
  // ↓↓↓ any process you wants.
  await driver.get(URL);
  await driver.findElement(By.name('uid')).sendKeys(USERID, Key.ENTER);

  const process = await import(processFile);
  await process.execute(driver);

  // await driver.quit();
  // ↑↑↑ any process you wants.
};

export default main;
