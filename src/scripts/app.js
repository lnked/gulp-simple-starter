import * as utils from 'utils/math';
import Navigation from 'components/navigation';

window.addEventListener('load', () => {
  Navigation.init();

  alert(utils.randomInteger(1, 5));
});

window.addEventListener('popstate', () => {
  Navigation.terminate();
});

window.addEventListener('unload', () => {
  Navigation.terminate();
});
