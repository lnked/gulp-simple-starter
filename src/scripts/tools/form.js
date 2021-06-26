import axios from 'axios';

const sendMail = ({ name, phone }) => {
  const instance = axios.create({
    baseUrl: '/server/api',
  });

  instance.post('/', {
    name,
    phone,
  });
};

function toJSON(form) {
  const data = {};
  const elements = form.querySelectorAll('input, select, textarea');

  elements.forEach(e => {
    const name = e.name;
    const value = e.value;

    if (name) {
      data[name] = value;
    }
  });

  return data;
}

const feedback = () => {
  const form = document.getElementById('feedback');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const json = toJSON(e.target);

    const { name = '', phone = '' } = json;

    console.log({ name, phone }, json);

    sendMail({
      name,
      phone,
    });

    return false;
  });
};

export default feedback;
