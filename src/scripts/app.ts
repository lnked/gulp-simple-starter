import Navigation from '@components/navigation';

const modules = [Navigation];

window.addEventListener('load', () => {
  modules?.forEach(module => module?.init());
});

const terminate = () => {
  modules?.forEach(module => module?.terminate());
};

window.addEventListener('unload', terminate);
window.addEventListener('popstate', terminate);
window.addEventListener('beforeunload', terminate);
