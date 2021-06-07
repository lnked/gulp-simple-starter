type getStateProps = () => any; // eslint-disable-line
type setStateProps = (value: unknown) => void;

type useStateResponse = [getStateProps, setStateProps];

export const useState = (value: unknown): useStateResponse => {
  let current = value;

  function getValue() {
    return current;
  }

  function setValue(callback) {
    current = typeof callback === 'function' ? callback(getValue()) : callback;
  }

  return [getValue, setValue];
};
