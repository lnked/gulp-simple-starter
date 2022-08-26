type UnMountType = () => void;
type CallbackType = () => UnMountType | void;

export const useEffect = (callback: CallbackType, _dependencies: unknown[]) => {
  const unmount = callback();

  const onUnMount = () => {
    if (typeof unmount === 'function') {
      unmount();
    }
  };

  window.addEventListener('unload', onUnMount);
  window.addEventListener('popstate', onUnMount);
};
