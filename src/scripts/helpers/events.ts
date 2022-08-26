type CallbackType = (event?: Event) => void;
type ResponseCallbackType = (target: HTMLInputElement) => void;
type SelectorType = HTMLElement | string | null;
type SupportedEventsType = 'click' | 'change' | 'input';

const getElement = (selector: string) => {
  const isSingleElement = selector.substring(0, 1) === '#';

  if (isSingleElement) {
    return document.querySelector(selector);
  }

  return document.querySelectorAll(selector);
};

const addListener = (
  event: SupportedEventsType,
  node: NodeListOf<Element> | Element | null,
  callback: CallbackType,
) => {
  if (node === null) {
    return;
  }

  if (node instanceof NodeList) {
    for (const element of node) {
      element.addEventListener(event, callback);
    }
  } else {
    node?.addEventListener(event, callback);
  }
};

export const onClick = (selector: SelectorType, callback: CallbackType) => {
  if (typeof selector === 'string') {
    addListener('click', getElement(selector), callback);
  } else if (typeof selector === 'object' && selector !== null) {
    addListener('click', selector, callback);
  }
};

export const onChange = (selector: SelectorType, callback: ResponseCallbackType) => {
  const listener = (event?: Event) => {
    if (event?.target instanceof HTMLInputElement) {
      callback(event.target);
    }
  };

  if (typeof selector === 'string') {
    addListener('input', getElement(selector), listener);
  } else if (typeof selector === 'object' && selector !== null) {
    addListener('input', selector, listener);
  }
};
