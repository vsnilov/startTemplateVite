import {createApp} from 'vue';
import Test from './components/test.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#test')) {
    const test = createApp({});
    test.component('app-test', Test);
    test.mount('#test');
  }
});
