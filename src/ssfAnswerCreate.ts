import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

import { sleep } from '../libs/systems';

const URL = 'http://localhost:3000';

export const getUrl = () => {
  return URL;
};

export const execute = async (driver: ThenableWebDriver) => {
  const text = async (sectionIndex: number, fieldIndex: number, value: string) => {
    const xpath = `//*[@id="sections[${sectionIndex}].fields[${fieldIndex}].value"]`;
    await driver.findElement(By.xpath(xpath)).sendKeys(value);
  };

  const email = text;

  const textarea = text;

  const date = async (sectionIndex: number, fieldIndex: number, year: number, month: number, day: number) => {
    const xpath = `//*[@id="sections[${sectionIndex}].fields[${fieldIndex}].value"]`;
    const element = driver.findElement(By.xpath(xpath));
    await element.click();
    await element.sendKeys(String(year));
    await element.sendKeys(Key.TAB);
    await element.sendKeys(String(month));
    if (month === 1) {
      await element.sendKeys(Key.TAB);
    }
    await element.sendKeys(String(day));
  };

  const singleSelect = async (sectionIndex: number, fieldIndex: number, itemIndex: number) => {
    const selectXpath = `//*[@id="sections[${sectionIndex}].fields[${fieldIndex}].value"]`;
    await driver.findElement(By.xpath(selectXpath)).click();
    await sleep(100);
    const itemXpath = `//*[@id="menu-sections[${sectionIndex}].fields[${fieldIndex}].value"]/div[3]/ul/li[${itemIndex}]`;
    await driver.findElement(By.xpath(itemXpath)).click();
  };

  const multiSelect = async (sectionIndex: number, fieldIndex: number, itemIndexList: number[]) => {
    const elements = await driver.findElements(By.css(`label[for*="sections[${sectionIndex}].fields[${fieldIndex}].valueIds_"]`));
    elements.forEach((element, index) => {
      if (itemIndexList.includes(index + 1)) {
        element.click();
      }
    });
  };

  // やっつけ
  const structMultiSelect = async (sectionIndex: number, fieldIndex: number) => {
    await driver.findElement(By.xpath('//*[@id="mui-5"]/div[6]/span/input')).click();
  };

  const serialCode = async (sectionIndex: number, fieldIndex: number, blockIndex: number, value: string) => {
    const xpath = `//*[@id="sections[${sectionIndex}].fields[${fieldIndex}].blocks[${blockIndex}].value"]`;
    await driver.findElement(By.xpath(xpath)).sendKeys(value);
  };

  const range = async (sectionIndex: number, fieldIndex: number, minIndex: number, maxIndex: number) => {
    const input = async (type: 'min' | 'max', itemIndex: number) => {
      await driver.findElement(By.xpath(`//*[@id="sections[${sectionIndex}].fields[${fieldIndex}].${type}Value"]`)).click();
      await sleep(100);
      await driver
        .findElement(
          By.xpath(`//*[@id="menu-sections[${sectionIndex}].fields[${fieldIndex}].${type}Value"]/div[3]/ul/li[${itemIndex + 1}]`)
        )
        .click();
    };
    await input('min', minIndex);
    await input('max', maxIndex);
  };

  // start

  await sleep(3000);

  // login
  await driver.findElement(By.id('username')).sendKeys('stones-55');
  await driver.findElement(By.id('password')).sendKeys('Wd2!rWSVz+YP');
  await driver.findElement(By.id('kc-login')).click();

  // send page
  await driver.get(URL + '/#/answers/create');

  await sleep(4000);

  // select form
  await driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/div/div')).click();
  await sleep(100);
  await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]')).click();

  // fill form step1
  await text(0, 0, '田中');
  await text(0, 1, '太郎');
  await text(1, 0, 'タナカ');
  await text(1, 1, 'タロウ');
  await serialCode(2, 0, 0, '2130002');
  await singleSelect(3, 0, 15);
  await text(3, 1, '川崎市高津区二子5-9-1');
  await serialCode(4, 0, 0, '08012345678');
  await email(5, 0, 'stones_taro@gmail.com');
  await date(6, 0, 1980, 10, 10);
  await singleSelect(7, 0, 2);

  // fill form step2
  await singleSelect(8, 0, 2);
  await multiSelect(9, 0, [1, 2]);

  // fill form step3
  await singleSelect(10, 0, 2);
  await singleSelect(10, 1, 3);
  await singleSelect(10, 2, 2);
  await singleSelect(10, 3, 2);
  await singleSelect(11, 0, 2);
  await singleSelect(12, 0, 2);
  await multiSelect(13, 0, [1, 2]); // 間取り
  await multiSelect(14, 0, [1, 2]); // 建物種別
  await structMultiSelect(15, 0); // 沿線/駅
  await singleSelect(16, 0, 2);
  await singleSelect(17, 0, 2);
  await singleSelect(18, 0, 2);
  await singleSelect(19, 0, 2);
  await singleSelect(20, 0, 2);
  await multiSelect(21, 0, [1, 2]);
  await multiSelect(22, 0, [1, 2]);
  await multiSelect(23, 0, [1, 2]);

  await range(24, 0, 2, 3); // 賃料2
  await singleSelect(24, 1, 2);

  // fill form confirm
  await singleSelect(25, 0, 2);
  await singleSelect(26, 0, 2);
  await singleSelect(27, 0, 2);
  await text(28, 0, '川崎アパート101号');
  await textarea(29, 0, 'メモメモ');

  return false; // ブラウザを閉じないようにする
};

export default execute;
