import './components/svgSprites';
import 'lazysizes';

import './components/tabs';
import slider from './components/slider';
import './components/fancybox';
import './components/dotdot';
import './components/dropdown';
import './components/phoneMask';
import successSend from './components/successSend';

window.successSend = successSend;

document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg');
  if (bg) {
    e.target.style.backgroundImage = 'url(' + bg + ')';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  slider();
});
