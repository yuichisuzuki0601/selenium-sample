import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

import { sleep } from '../libs/systems';

const URL = 'http://192.168.186.184/cws/cws';

const USERID = 'cws0001';
const PASSWORD = '';

const sikCds = [...Array(25)].map(() => 'AWSCSAA');

export const getUrl = () => {
  return URL;
};

export const execute = async (driver: ThenableWebDriver) => {
  await driver.findElement(By.name('uid')).sendKeys(USERID);
  await driver.findElement(By.name('pwd')).sendKeys(PASSWORD, Key.ENTER);

  await driver.findElement(By.partialLinkText('閉じる')).click();
  await driver.findElement(By.linkText('技能資格を取得・更新・喪失した場合')).click();
  await driver.findElement(By.partialLinkText('技能資格申請1')).click();

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
