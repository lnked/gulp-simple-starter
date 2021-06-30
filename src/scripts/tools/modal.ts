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

  const getModalTemplate = name => {
    const rendered = getRenderedModal(name);

    if (rendered) {
      return rendered;
    }

    const template = document.querySelector(`#tmpl-modal-${name}`);

    // var temp = document.getElementsByTagName("template")[0];
    // const clon = temp.content.cloneNode(true);
    // document.body.appendChild(clon)

    if (template) {
      document.body.innerHTML += template?.innerHTML;
    }

    return getRenderedModal(name);
  };

  // function unMountClose() {
  //   // const buttons = document.querySelectorAll('.j-modal-close');
  //   // buttons.forEach(element => element.removeEventListener('click', handleClose));
  // }

  const _close = (withBody = true) => {
    // unMountClose();

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

  const _open = (name: string, withBody = true) => {
    const element = getModalTemplate(name);

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
      // unMountClose();
    },
    open: name => _open(name),
    close: () => _close(),
  };
})();

export default Modal;
