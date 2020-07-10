import Navigation from 'components/navigation';

window.addEventListener('load', () => {
  Navigation.init();
});

window.addEventListener('popstate', () => {
  Navigation.terminate();
});

window.addEventListener('unload', () => {
  Navigation.terminate();
});
