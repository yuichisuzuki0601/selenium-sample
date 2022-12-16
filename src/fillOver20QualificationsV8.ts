import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

import { sleep } from '../libs/systems';

const URL = 'https://tmeva-develop-cws.company.lab.works-hi.com/self-workflow/cws/cws';

const USERID = 'cws0001';
const PASSWORD = '';

const sikCds = [...Array(25)].map(() => 'gsika1');

export const getUrl = () => {
  return URL;
};

export const execute = async (driver: ThenableWebDriver) => {
  await driver.findElement(By.name('uid')).sendKeys(USERID);
  await driver.findElement(By.name('pwd')).sendKeys(PASSWORD, Key.ENTER);

  await driver.findElement(By.partialLinkText('技能資格申請')).click();
  await driver.findElement(By.partialLinkText('技能資格申請')).click();

  await sleep(1000);

  for (let i = 0; i < sikCds.length; ++i) {
    await driver.findElement(By.css('input[name="@SUB.ADD."')).click();
    await driver.findElement(By.name('sikaku_sik_cd')).sendKeys(sikCds[i]);
    await driver.findElement(By.name('gsibik01')).sendKeys(i + 1);
    await driver.findElement(By.css('input[name="@SUB.NEXT.null"')).click();
    await driver.findElement(By.css('input[name="@SUB.DECIDE."')).click();
  }

  return false; // ブラウザを閉じないようにする
};

export default execute;
