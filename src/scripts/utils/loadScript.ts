export function loadScript(src, callback) {
  let r = false;
  const s = document.createElement('script');
  const t = document.getElementsByTagName('script')[0];

  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function() {
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true;
      callback();
    }
  };
  t.parentNode.insertBefore(s, t);
}
