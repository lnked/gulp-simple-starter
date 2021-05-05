import animate from '@tools/animate';

const scrollTarget = ({ trigger }) => {
  const elements = document.querySelectorAll(trigger);

  const handleClick = element => e => {
    e.preventDefault();

    const item = element.getAttribute('href') || element.getAttribute('target');
    const target = document.getElementById(item);

    animate(
      document.scrollingElement || document.documentElement,
      'scrollTop',
      '',
      document.documentElement.scrollTop,
      target?.offsetTop || 0,
      200,
      true,
    );
  };

  elements.forEach(element => element.addEventListener('click', handleClick(element)));
};

export default scrollTarget;
