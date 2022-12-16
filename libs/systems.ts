import * as fs from 'fs';

export const sleep = (millis: number) => {
  return new Promise<void>((resolve) => {
    const sleeping = () => console.log('sleeping...');
    sleeping();
    const intervalId = setInterval(sleeping, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      resolve();
    }, millis);
  });
};

export const simplePath = () => {
  const tmp = location.pathname.split('/');
  return tmp[tmp.length - 1];
};

export const saveFile = (path: string, fileName: string, file: any) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  fs.writeFileSync(`${path}/${fileName}`, file, 'base64');
};
