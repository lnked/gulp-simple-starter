type CallbackType = (nextValue: any) => any;
type SetValueProps = (callback: any | CallbackType) => void;
type useStateResponse = [() => any, SetValueProps];

export const useState = (defaultValue: any): useStateResponse => {
  let current = defaultValue;

  function getValue() {
    return current;
  }

  function setValue(callback: any) {
    current = typeof callback === 'function' ? callback(getValue()) : callback;
  }

  return [getValue, setValue];
};
