import { Fancybox } from '@fancyapps/ui';
import svgSprite from './svgSprite';

const successSend = async () => {
  const icon = await svgSprite('check');
  const successPopup = `
    <div class="">
      ${icon}
      <div class="g-modal__title">Заявка отправлена</div>
    </div>
`;

  Fancybox.close();
  Fancybox.show(
    [
      {
        src: successPopup,
        type: 'html',
      },
    ],
    { mainClass: 'modal' },
  );
};

export default successSend;
