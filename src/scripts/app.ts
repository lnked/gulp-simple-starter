import Modal from '@tools/modal';
import Navigation from '@components/navigation';
import { useState } from '@hooks/useState';

const modules = [Navigation];

const init = () => {
  const [count, setCounter] = useState(2);

  Modal.open('example', {
    name: 'example name',
    data: [{ name: 'item 111' }, { name: 'item 222' }, { name: 'item 444' }],
  });

  const button = document.getElementById('counter');
  const values: HTMLElement | null = document.getElementById('counter-value');

  const pasteValue = () => {
    values!.innerText = count.toString();
  };

  pasteValue();

  button?.addEventListener('click', () => {
    setCounter(Math.random() * 11);
    setCounter((prevCount) => Number(prevCount) + 1);
    pasteValue();
  });
};

window.addEventListener('load', () => {
  init();
  modules?.forEach((module) => module?.init());
});

const terminate = () => {
  modules?.forEach((module) => module?.terminate());
};

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
window.addEventListener('beforeunload', terminate);
