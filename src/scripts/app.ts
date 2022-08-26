import Modal from '@tools/modal';
import Navigation from '@components/navigation';
import { onChange, onClick } from '@helpers/events';
import { useState } from '@hooks/useState';
import { useEffect } from '@hooks/useEffect';

const modules = [Navigation];

const init = () => {
  const [getCount, setCounter] = useState(0);

  const values: HTMLElement | null = document.getElementById('counter-value');

  const pasteValue = () => {
    values!.innerText = getCount().toString();
  };

  pasteValue();

  onChange('#test-input', (target) => {
    setCounter(target.value);
    pasteValue();
  });

  const count = getCount();

  useEffect(() => {
    console.log('%c mount', 'color: white; background-color: #33bf26;');

    return () => {
      console.log('%c unmount', 'color: white; background-color: #bf2626;');
    };
  }, [count]);

  onClick('#open-modal', () => {
    console.log('click open-modal');

    Modal.open('example', {
      name: 'example name',
      data: [{ name: 'item 111' }, { name: 'item 222' }, { name: 'item 444' }],
    });
  });

  onClick('#counter-increase', () => {
    console.log('click increase');

    setCounter((prevCount) => Number(prevCount) + 1);
    pasteValue();
  });

  onClick('#counter-decrease', () => {
    console.log('click decrease');

    setCounter((prevCount) => Number(prevCount) - 1);
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
