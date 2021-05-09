type getStateProps = () => any;
type setStateProps = (value: any) => void;

type useStateResponse = [getStateProps, setStateProps];

export const useState = (value: any): useStateResponse => {
  let current = value;

  function getValue() {
    return current;
  }

  function setValue(callback) {
    current = typeof callback === 'function' ? callback(getValue()) : callback;
  }

  return [getValue, setValue];
};
