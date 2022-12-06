import Swiper, {
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  Controller,
  EffectFade,
  Grid,
} from 'swiper';
import { isDesktop } from './device';

Swiper.use([Navigation, Pagination, Thumbs, Autoplay, Controller, EffectFade, Grid]);

export default () => {
  const sliders = Slider();
  const slidersThumbs = sliders.filter((slider) => [...slider.el.classList].includes('js-swiper-thumbs-nav'));

  if (!slidersThumbs.length) {
    return;
  }

  const slidersThumbsNavIndex = sliders.findIndex((slider) => [...slider.el.classList].includes('js-swiper-thumbs-nav'));

  const slidersThumbsDetailIndex = sliders.findIndex((slider) => [...slider.el.classList].includes('js-swiper-thumbs-detail'));

  if (slidersThumbsNavIndex !== -1 && slidersThumbsDetailIndex !== -1) {
    sliders[slidersThumbsNavIndex].controller.control = sliders[slidersThumbsDetailIndex];
    sliders[slidersThumbsDetailIndex].controller.control = sliders[slidersThumbsNavIndex];
  }
};

function progressBar($wrap, autoplayDelay) {
  const $elem = $wrap.querySelector('.js-swiper-progressbar');
  let width = 1;
  const autoplayTime = autoplayDelay / 100;
  const id = setInterval(frame, autoplayTime);

  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width += 1;
      $elem.style.width = `${width}%`;
    }
  }

  return id;
}

function Slider(className = '.swiper') {

  const $sliderTablets = document.querySelectorAll('.swiper--tablet');
  if ($sliderTablets.length && !isDesktop) {
    [...$sliderTablets].forEach(($sliderTablet) => {
      $sliderTablet.classList.add('swiper');
    });
  }

  const $wrap = document.querySelectorAll(className);

  if (!$wrap.length) {
    return [];
  }
  const sliders = [];
  $wrap.forEach((slider) => {

    const settingsCustom = slider.dataset.settings ? JSON.parse(slider.dataset.settings) : null;

    const settingsDefault = {
      loop: true,
      loopedSlides: 3,
      slidesPerView: 'auto',
      speed: 1000,
      navigation: {
        nextEl: slider.querySelector('.swiper-button-next'),
        prevEl: slider.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        clickable: true,
        type: 'bullets',
      },
    };

    const settings = Object.assign(settingsDefault, settingsCustom);

    let autoplayDelay = 5000;
    if (slider.dataset.settings) {
      const dataSetting = JSON.parse(slider.dataset.settings);
      autoplayDelay = dataSetting?.autoplay?.delay || autoplayDelay;
    }

    const { counter } = slider.dataset;
    if (counter) {
      settings.pagination = {
        ...settings.pagination,
        type: 'custom',
        renderCustom: (swiper, current, total) => `
          <div class="swiper-counter swiper-counter--current">${
  current >= 10 ? current : '0' + current
}</div>
          <div class="swiper-progressbar"><div class="swiper-progressbar__line js-swiper-progressbar"></div>
          </div><div class="swiper-counter swiper-counter--total">${
  total >= 10 ? total : '0' + total
}</div>`,
      };
    }

    const sliderSwiper = new Swiper(slider, settings);

    if (counter) {
      let idInterval = progressBar(slider, autoplayDelay);
      sliderSwiper.on('slideChangeTransitionEnd', () => {
        clearInterval(idInterval);
        idInterval = progressBar(slider, autoplayDelay);
      });
    }

    sliders.push(sliderSwiper);
  });

  return sliders;
}
