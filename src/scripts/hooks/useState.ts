type setStateProps = (value: unknown, callback: (nextValue: unknown) => void) => void;

type useStateResponse = [unknown, setStateProps];

export const useState = (defaultValue: unknown): useStateResponse => {
  let current = defaultValue;

  function getValue() {
    return current;
  }

  function setValue(value, callback) {
    current = value;

    if (typeof callback === 'function') {
      callback(getValue());
    }
  }

  return [current, setValue];
};
