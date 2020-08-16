import * as utils from 'utils/math';
import Modal from 'components/modal';
import Navigation from 'components/navigation';

const terminate = () => {
  Modal.terminate();
  Navigation.terminate();
};

window.addEventListener('load', () => {
  Modal.init({});
  Navigation.init();
  console.log('init scripts: ', utils);
});

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
