import Navigation from '@components/navigation';

const modules = [Navigation];

window.addEventListener('load', () => {
  modules?.forEach(module => Object.prototype.hasOwnProperty.call(module, 'init') && module.init());
});

const terminate = () => {
  modules?.forEach(module => Object.prototype.hasOwnProperty.call(module, 'terminate') && module.terminate());
};

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
window.addEventListener('beforeunload', terminate);
