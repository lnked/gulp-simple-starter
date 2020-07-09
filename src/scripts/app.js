import test from 'components/test';
import scrollTarget from 'components/scroll-target';
import Navigation from 'components/navigation';

window.onload = () => {
  test();

  scrollTarget({
    trigger: '.j-nav-link',
  });

  Navigation.init({});
};
