export const input = (selector: string, value: string) => {
  const elm = document.querySelector(selector) as HTMLInputElement;
  if (elm) {
    elm.value = value;
  }
};

export const click = (selector: string) => {
  const elm = document.querySelector(selector) as HTMLLinkElement | HTMLButtonElement;
  if (elm) {
    elm.click();
  }
};
