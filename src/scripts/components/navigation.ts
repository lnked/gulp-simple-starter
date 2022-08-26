import QueryState from 'querystate';

const Navigation = (() => {
  const state = QueryState();
  // const state = QueryState({ autoApply: false });

  const elements = document.querySelectorAll('.j-nav');

  state.set('color', 'red');
  state.get('color');
  state.get('wizard', 'Merlin');

  // state.remove('c');
  // state.toQueryString();

  // state.apply();

  console.log(state.all());

  const listener = function (event) {
    console.log({ event });
  };

  return {
    terminate: () => {
      elements.forEach((target) => target.removeEventListener('click', listener, false));
    },
    init: () => {
      elements.forEach((target) => target.addEventListener('click', listener, false));
    },
  };
})();

export default Navigation;
