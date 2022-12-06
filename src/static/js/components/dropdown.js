document.addEventListener('DOMContentLoaded', () => {
  const $dropdowns = document.querySelectorAll('.g-dropdown');

  if (!$dropdowns.length) {
    return;
  }

  document.querySelector('body').addEventListener('click', (evt) => {
    if (!evt.target.closest('.g-dropdown__title')) {
      return;
    }

    if (evt.target.closest('.g-dropdown').classList.contains('is-active')) {
      evt.target.closest('.g-dropdown').classList.remove('is-active');
    } else {
      [...$dropdowns].forEach(($dropdown) => {
        $dropdown.classList.remove('is-active');
      });

      evt.target.closest('.g-dropdown').classList.add('is-active');
    }
  });
});
