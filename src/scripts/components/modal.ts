import { template } from './template';

const Modal = ((w, d, b) => {
  let settings = {
    close: '.j-close-modal',
    trigger: '.j-open-modal',
    timeout: 400
  };

  function _clean(s) {
    if (s.substr(0, 1) === '#') {
      s = s.substr(1);
    }

    return s;
  }

  function _render(t) {
    const div = document.createElement('div');
    div.innerHTML = t.trim();
    return div.firstChild;
  }

  function _callback(c) {
    if (typeof c === 'function') {
      c.call(null);
    }
  }

  function _valid(s) {
    if (d.getElementById(s)) {
      return s;
    }

    if (d.getElementById(`tpl-${s}`)) {
      return `tpl-${s}`;
    }

    if (d.getElementById(`tmpl-${s}`)) {
      return `tmpl-${s}`;
    }

    return false;
  }

  function _close(modal, callback, remove) {
    modal.classList.remove('is-animated');
    modal.classList.remove('is-open');
    b.classList.remove('modal-open');

    setTimeout(() => {
      modal.classList.add('is-hidden');

      if (remove) {
        modal.parentNode.removeChild(modal);
      }

      _callback(callback);
    }, settings.timeout);
  }

  function _focus(modal) {
    modal.focus();

    const button = d.createElement('button');

    button.style =
        'position:absolute;width:1px;height:1px;opacity:0;right:0px;bottom:0px;background-color:#f00;outline:0;';

    modal.appendChild(button);

    button.onfocus = () => {
      modal.focus();
    };
  }

  function _show(modal) {
    modal.classList.remove('is-hidden');
    b.classList.add('modal-open');

    setTimeout(() => {
      modal.classList.add('is-animated');
      modal.classList.add('is-open');
    }, 16);

    _focus(modal);
  }

  return {
    hooks() {
      w.onkeydown = (e) => {
        if ((e.which || e.keyCode) === 27) {
          this.close(d.querySelectorAll('.modal.is-open'));
        }
      };
    },

    open(target) {
      let selector = '';

      if (target.getAttribute('href')) {
        selector = _clean(target.getAttribute('href'));
      }

      if (target.dataset.modal) {
        selector = _clean(target.dataset.modal);
      }

      if ((selector = _valid(selector))) {
        this.show(selector);
        Mask.init({});
      }
    },

    bind(modal) {
      const close = modal.querySelectorAll(settings.close);

      if (close.length) {
        for (let i = close.length - 1; i >= 0; i--) {
          close[i].onclick = (e) => {
            e.preventDefault();
            this.close(e.target);
          };
        }
      }
    },

    show(selector, data) {
      if (typeof (data) === 'undefined') {
        data = {};
      }

      const modal = _render(template(selector, data));

      this.bind(modal);

      this.close(d.querySelectorAll('.modal.is-open'), () => {
        modal.classList.add('is-temp');

        modal.setAttribute('aria-hidden', false);

        b.appendChild(modal);

        _show(modal);
      });
    },

    close(element, callback) {
      if (element.length) {
        for (let i = element.length - 1; i >= 0; i--) {
          _close(element[i], callback, true);
        }
      } else if (
        typeof element.dataset !== 'undefined' &&
        element.dataset.target
      ) {
        _close(d.querySelector(element.dataset.target), callback, true);
      } else {
        _callback(callback);
      }
    },

    terminate: () => {
      // const selectors = d.querySelectorAll(settings.trigger);

      // if (selectors.length) {
      //   for (let i = selectors.length - 1; i >= 0; i--) {
      //     selectors[i].onclick = (e) => {
      //       e.preventDefault();
      //       this.open(e.target);
      //       return false;
      //     };
      //   }
      // }
    },

    events: () => {
      const selectors = d.querySelectorAll(settings.trigger);

      if (selectors.length) {
        for (let i = selectors.length - 1; i >= 0; i--) {
          selectors[i].onclick = (e) => {
            e.preventDefault();
            this.open(e.target);
            return false;
          };
        }
      }
    },

    init: options => {
      settings = { ...settings, ...options };

      this.events();
      this.hooks();
    }
  };
})(window, document, document.body);

export default Modal;
