type ValueType = string | number;
type CallbackType = (nextValue: ValueType) => ValueType;
type SetValueProps = (callback: ValueType | CallbackType) => void;
type useStateResponse = [ValueType, SetValueProps];

export const useState = (defaultValue: ValueType): useStateResponse => {
  let current = defaultValue;

  function getValue() {
    return current;
  }

  function setValue(callback: unknown) {
    current = typeof callback === 'function' ? callback(getValue()) : callback;
  }

  return [current, setValue];
};
