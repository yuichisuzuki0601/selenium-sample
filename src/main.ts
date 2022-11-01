import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

// const URL = 'http://localhost:8080/conversion-nbh-cws/cws/cws';
const URL = 'https://tmeva-develop-cws.company.lab.works-hi.com/self-workflow/cws/cws';
const USERID = 'cws0001';
const PASSWORD = '';

const processFile = './fillOver20Qualifications.ts';

export const main = async (driver: ThenableWebDriver) => {
  await driver.get(URL);
  await driver.findElement(By.name('uid')).sendKeys(USERID);
  await driver.findElement(By.name('pwd')).sendKeys(PASSWORD, Key.ENTER);

  const process = await import(processFile);
  const result = await process.execute(driver);

  if (result) {
    await driver.quit();
  }
};

export default main;
