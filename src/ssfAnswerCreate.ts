import { By, Key, ThenableWebDriver } from 'selenium-webdriver';

import { sleep } from '../libs/systems';

const URL = 'http://localhost:3000';
const username = 'stones-55';
const password = 'Wd2!rWSVz+YP';

// const URL = 'https://staging.ssf-admin.stones-service.com';
// const username = 'test-admin';
// const password = 'tG9hQdBpSwaT';

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
    const buttonXpath = `//*[@name="sections[${sectionIndex}].fields[${fieldIndex}].value"]/following-sibling::div[2]/button`;
    const buttonElement = driver.findElement(By.xpath(buttonXpath));
    await buttonElement.click();

    const yearButtonElements = await driver.findElements(By.className('PrivatePickersYear-yearButton'));
    yearButtonElements.forEach(async (yearButtonElement) => {
      const yearText = (await yearButtonElement.getText()).toString();
      if (yearText === String(year)) {
        await yearButtonElement.click();
      }
    });

    await sleep(3000);

    const monthButtonElements = await driver.findElements(By.className('PrivatePickersMonth-root'));
    monthButtonElements.forEach(async (monthButtonElement) => {
      const monthText = (await monthButtonElement.getText()).toString();
      if (monthText === String(`${month}月`)) {
        await monthButtonElement.click();
      }
    });

    await sleep(3000);

    if (day < 0) {
      return;
    }

    const dayButtonElements = await driver.findElements(By.className('MuiPickersDay-root'));
    dayButtonElements.forEach(async (dayButtonElement) => {
      const dayText = (await dayButtonElement.getText()).toString();
      if (dayText === String(day)) {
        await dayButtonElement.click();
      }
    });

    await sleep(3000);
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
    await driver.findElement(By.xpath('//*[@id="mui-6"]/div[6]/span/input')).click();
    await driver.findElement(By.xpath('//*[@id="sections[15].fields[0].additionalValue"]')).sendKeys('JR京浜東北線鶴見駅');
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
        .findElement(By.xpath(`//*[@id="menu-sections[${sectionIndex}].fields[${fieldIndex}].${type}Value"]/div[3]/ul/li[${itemIndex}]`))
        .click();
    };
    await input('min', minIndex);
    await input('max', maxIndex);
  };

  // start

  await sleep(3000);

  // login
  await driver.findElement(By.id('username')).sendKeys(username);
  await driver.findElement(By.id('password')).sendKeys(password);
  await driver.findElement(By.id('kc-login')).click();

  // send page
  await driver.get(URL + '/answers/create');

  await sleep(4000);

  // select form
  await driver.findElement(By.xpath('//*[@id="main-content"]/div/div[1]/div/div')).click();
  await sleep(1000);
  await driver.findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[1]')).click();

  let sectionIndex = 0;

  // fill form step1
  await text(sectionIndex, 0, '田中');
  await text(sectionIndex, 1, '太郎');
  await text(++sectionIndex, 0, 'タナカ');
  await text(sectionIndex, 1, 'タロウ');
  await serialCode(++sectionIndex, 0, 0, '2130002');
  await singleSelect(++sectionIndex, 0, 15);
  await text(sectionIndex, 1, '川崎市高津区二子5-9-1');
  await serialCode(++sectionIndex, 0, 0, '08012345678');
  await email(++sectionIndex, 0, 'stones_taro@gmail.com');
  await date(++sectionIndex, 0, 1980, 10, 10);
  await singleSelect(++sectionIndex, 0, 2);

  // fill form step2
  await singleSelect(++sectionIndex, 0, 2);
  await multiSelect(++sectionIndex, 0, [1, 2]);

  // fill form step3
  await singleSelect(++sectionIndex, 0, 2); // 入居者構成
  await singleSelect(sectionIndex, 1, 3);
  await singleSelect(sectionIndex, 2, 2);
  await singleSelect(sectionIndex, 3, 2);
  await singleSelect(++sectionIndex, 0, 2); // ペット飼育有無
  await singleSelect(++sectionIndex, 0, 2); // 広さ
  await multiSelect(++sectionIndex, 0, [1, 2]); // 間取り
  await multiSelect(++sectionIndex, 0, [1, 2]); // 建物種別
  await structMultiSelect(++sectionIndex, 0); // 沿線/駅
  await singleSelect(++sectionIndex, 0, 2); // 駅徒歩分
  await range(++sectionIndex, 0, 1, 5); // 賃料
  await singleSelect(sectionIndex, 1, 2);
  await singleSelect(++sectionIndex, 0, 2); // 築年数
  await singleSelect(++sectionIndex, 0, 2); // お引っ越し理由
  // await singleSelect(++sectionIndex, 0, 2); // お引っ越し希望時期
  await date(++sectionIndex, 0, 2023, 6, -1); // お引っ越し希望時期
  await multiSelect(++sectionIndex, 0, [1, 2]); // 室内設備条件
  await multiSelect(++sectionIndex, 0, [1, 2]); // 建物設備条件
  await multiSelect(++sectionIndex, 0, [1, 2]); // 入居・その他条件

  // fill form confirm
  await singleSelect(++sectionIndex, 0, 2);
  await singleSelect(++sectionIndex, 0, 2);
  await singleSelect(++sectionIndex, 0, 2);
  await text(++sectionIndex, 0, '川崎アパート101号');
  await textarea(++sectionIndex, 0, 'メモメモ');

  return false; // ブラウザを閉じないようにする
};

export default execute;
