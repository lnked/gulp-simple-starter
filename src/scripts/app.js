import * as utils from 'utils/math';
import Navigation from 'components/navigation';

const terminate = () => {
  Navigation.terminate();
};

window.addEventListener('load', () => {
  Navigation.init();

  console.log(utils.randomInteger(1, 5));
});

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
