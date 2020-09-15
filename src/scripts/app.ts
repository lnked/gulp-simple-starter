import * as utils from 'utils/math';
import Navigation from 'components/navigation';

const terminate = () => {
  Navigation.terminate();
};

window.addEventListener('load', () => {
  Navigation.init();
  console.log('init scripts: ', utils);
});

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
