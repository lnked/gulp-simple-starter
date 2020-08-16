import Template7 from 'template7';

export const template = (id, data, precompile) => {
  if (typeof precompile === 'undefined') {
    precompile = false;
  }

  const element = document.getElementById(id);

  if (element !== null && typeof element !== 'undefined') {
    const pattern = element.innerHTML;

    if (precompile) {
      if (!window.precompiledT7) {
        window.precompiledT7 = Template7.compile(pattern);
      }

      return window.precompiledT7(data || {});
    }

    return Template7.compile(pattern)(data || {});
  }

  return '';
};
