import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

import { main } from './src/main';
import { profilePath } from './src/profilePath';

const options = new Options();
options.addArguments(`--user-data-dir=${profilePath}`);
if (process.env.MODE === 'attach') {
  options.debuggerAddress('localhost:9222');
}
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

(async () => {
  try {
    await main(driver);
  } catch (e) {
    console.error(e);
    await driver.quit();
  }
})();
