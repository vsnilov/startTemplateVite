module.exports = {
  multipass : true, // boolean. false by default
  // datauri: 'enc', // 'base64' (default), 'enc' or 'unenc'.
  js2svg : {
      indent : 2, // string with spaces or number of spaces. 4 by default
      pretty : true, // boolean, false by default
  },
  plugins : [
      {
          name : 'preset-default',
          params : {
              overrides : {

              }
          },
      },
      {
          name : 'removeAttrs',
          params : {
              attrs : '(width|height|style|color|fill|stroke)',
          },
      },
  ],
};
