import Mustache from 'mustache';

const Modal = (() => {
  const bodyTag = document.body;

  const elements = document.querySelectorAll('.j-modal');

  const getRenderedModal = name => {
    const prerender = document.querySelector(`#modal-${name}`);

    if (prerender) {
      return prerender;
    }

    return null;
  };

  const getModalTemplate = (name, data) => {
    const rendered = getRenderedModal(name);

    if (rendered) {
      return rendered;
    }

    const template = document.getElementById(`tmpl-modal-${name}`);

    if (template?.tagName.toLowerCase() === 'template') {
      document.body.insertAdjacentHTML('beforeend', Mustache.render(template.innerHTML, data));
    } else if (template) {
      document.body.insertAdjacentHTML('beforeend', template.innerHTML);
    }

    return getRenderedModal(name);
  };

  const _close = (withBody = true) => {
    const opened = document.querySelector('.modal.is-open');

    if (withBody) {
      bodyTag.classList.remove('overflow-hidden');
    }

    opened?.classList.remove('is-animate');

    setTimeout(() => {
      opened?.classList.remove('is-open');
    }, 280);
  };

  const handleClose = () => _close();

  const initClose = wrapper => {
    const buttons = wrapper.querySelectorAll('.j-modal-close');
    buttons.forEach(element => element.addEventListener('click', handleClose));
  };

  const _open = (name: string, data = {}, withBody = true) => {
    const element = getModalTemplate(name, data);

    if (element) {
      element?.classList.add('is-open');

      initClose(element);

      if (withBody) {
        bodyTag.classList.add('overflow-hidden');
      }

      setTimeout(() => {
        element?.classList.add('is-animate');
      }, 16);
    }
  };

  const handleOpen = e => {
    e.preventDefault();

    const name = e.target.getAttribute('href') || e.target.getAttribute('data-target');

    _open(name);

    return false;
  };

  return {
    init: () => {
      elements.forEach(node => node.addEventListener('click', handleOpen));
      initClose(document);
    },
    terminate: () => {
      elements.forEach(node => node.removeEventListener('click', handleOpen));
    },
    open: (name, data = {}) => _open(name, data),
    close: () => _close(),
  };
})();

export default Modal;
