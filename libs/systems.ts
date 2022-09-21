export const sleep = (sec: number) => {
  return new Promise<void>((resolve) => {
    const intervalId = setInterval(() => console.log('sleeping...'), 1000);
    setTimeout(() => {
      clearInterval(intervalId);
      resolve();
    }, sec * 1000);
  });
};

export const simplePath = () => {
  const tmp = location.pathname.split('/');
  return tmp[tmp.length - 1];
};
