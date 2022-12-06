import Dotdotdot from 'dotdotdot-js';

const mouseenterHandler = (e) => {
  const $el = e.target.querySelector('[data-dot-full]');
  if (!$el) {
    return;
  }

  if (!$el.dataset.dotShort) {
    $el.dataset.dotShort = $el.textContent;
  }

  $el.textContent = $el.dataset.dotFull;
};

const mouseleaveHandler = (e) => {
  const $el = e.target.querySelector('[data-dot-full]');
  if (!$el) {
    return;
  }

  $el.textContent = $el.dataset.dotShort;
};

document.addEventListener('DOMContentLoaded', () => {
  const $items = [...document.querySelectorAll('[data-dot]')];
  if (!$items) {
    return;
  }

  $items.forEach(($item) => {
    const rows = parseInt($item.dataset.dot, 10) || 2;
    const height = parseInt(window.getComputedStyle($item).lineHeight, 10) * rows;

    $item.style.minHeight = `${height}px`;
    $item.dataset.dotFull = $item.textContent;

    new Dotdotdot($item, {
      ellipsis: '...',
      height: height + 1,
      truncate: rows === 1 ? 'letter' : 'word',
      watch: 'window',
    });

    if ($item.dataset.dotFull === $item.textContent) {
      $item.removeAttribute('aria-label');
    }

    const $wrap = $item.closest('[data-dot-hover]');
    if ($wrap) {
      $wrap.addEventListener('mouseenter', mouseenterHandler);
      $wrap.addEventListener('mouseleave', mouseleaveHandler);
    }
  });
});
