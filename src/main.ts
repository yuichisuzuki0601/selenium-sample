import { By, Key, ThenableWebDriver, until } from 'selenium-webdriver';

import { sleep } from '../libs/systems';

const sikCds = [
  '115970002',
  '115970003',
  '115980000',
  '121080001',
  '121080002',
  '125300010',
  '125300020',
  '125301130',
  '125301140',
  '125310001',
  '125310002',
  '125310010',
  '125310011',
  '125310012',
  '125310013',
  '125310014',
  '125310015',
  '125310021',
  '125310022',
  '125310023',
  '125310024',
  '125310025',
  '125310026',
  '125310027',
  '125330001',
];

export const main = async (driver: ThenableWebDriver) => {
  // ↓↓↓ any process you wants.
  await driver.get(`http://localhost:8080/conversion-nbh-cws/cws/cws`);

  await driver.findElement(By.name('uid')).sendKeys('cws0001', Key.ENTER);
  await driver.findElement(By.partialLinkText('技能資格申請')).click();
  await driver.findElement(By.partialLinkText('技能資格申請')).click();

  await sleep(1);

  for (let i = 0; i < sikCds.length; ++i) {
    await driver.findElement(By.css('input[name="@SUB.ADD."')).click();
    await driver.findElement(By.name('sikaku_sik_cd')).sendKeys(sikCds[i]);
    await driver.findElement(By.css('input[name="@SUB.NEXT.null"')).click();
    await driver.findElement(By.css('input[name="@SUB.DECIDE."')).click();
  }

  // await driver.quit();
  // ↑↑↑ any process you wants.
};

export default main;
