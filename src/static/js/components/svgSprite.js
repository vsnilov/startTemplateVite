export default async (id, css, className = '') => {
  const svg = await import(`../../img/svg/${id}.svg`);
  const { viewBox } = await svg.default;

  const $svg = `
    <svg class="svg-sprite-icon svg-sprite-icon-${id} ${className}" viewbox="${viewBox}">
      <use xlink:href="#icon-${id}"></use>
    </svg>
  `;

  if (css) {
    $svg.css(css);
  }

  return $svg;
};
