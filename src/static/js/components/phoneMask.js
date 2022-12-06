import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.i18n';

const selector = '[data-mask="phone"]';
let count = 1;

function cleveInit($input) {
  const cleave = new Cleave($input, {
    phone : true,
    prefix : '+',
    noImmediatePrefix : true,
    phoneRegionCode : 'RU',
  });

  $input.addEventListener(
    'blur',
    function () {
      if (cleave.getRawValue() === '+') {
        cleave.setRawValue('');
      }
      if (cleave.getRawValue().length < 10) {
        cleave.setRawValue('');
      }
    },
    true
  );

  return cleave;
}

const handle = (e) => {
  const $input = e.target.closest(selector);
  const id = $input?.dataset.maskId;

  if ($input && $input.value.length < 2) {
    $input.selectionStart = $input.value.length;
  }

  if ($input && !id) {
    // eslint-disable-next-line no-plusplus
    $input.dataset.maskId = `phone${count++}`;
    cleveInit($input);

    $input.blur();
    $input.focus();
  }
};

document.addEventListener('click', handle);
document.addEventListener('focusin', handle);
