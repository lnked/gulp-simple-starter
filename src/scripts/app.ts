import { useState } from '@hooks/useState';
import Navigation from '@components/navigation';

const modules = [Navigation];

const init = () => {
  const [getCounter, setCounter] = useState(2);

  const button = document.getElementById('counter');
  const values: HTMLElement | null = document.getElementById('counter-value');

  const pasteValue = () => {
    const next = getCounter();
    values!.innerText = next.toString();
  };

  pasteValue();

  button?.addEventListener('click', () => {
    setCounter(Math.random() * 11);
    setCounter(count => count + 1);
    pasteValue();
  });
};

window.addEventListener('load', () => {
  init();
  modules?.forEach(module => module?.init());
});

const terminate = () => {
  modules?.forEach(module => module?.terminate());
};

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
window.addEventListener('beforeunload', terminate);
