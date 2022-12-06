import Tabby from 'tabbyjs';
import { isMobile } from '../components/device';

document.addEventListener('DOMContentLoaded', () => {
  if(!isMobile && document.querySelector('[data-tabs-not-mobile]')){
    new Tabby('[data-tabs-not-mobile]');
  }

  if (document.querySelector('[data-tabs]')) {
    new Tabby('[data-tabs]');
  }
});
