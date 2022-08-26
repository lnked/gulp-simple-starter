type CallbackType = () => void;

const getElement = (selector: string) => {
  const isSingleElement = selector.substring(0, 1) === '#';

  if (isSingleElement) {
    return document.querySelector(selector);
  }

  return document.querySelectorAll(selector);
};

const addListener = (node: NodeListOf<Element> | Element | null, callback: CallbackType) => {
  if (node === null) {
    return;
  }

  if (node instanceof NodeList) {
    for (const element of node) {
      element.addEventListener('click', callback);
    }
  } else {
    node?.addEventListener('click', callback);
  }
};

export const onClick = (selector: HTMLElement | string | null, callback: CallbackType) => {
  if (typeof selector === 'string') {
    addListener(getElement(selector), callback);
  }

  if (typeof selector === 'object' && selector !== null) {
    addListener(selector, callback);
  }
};
