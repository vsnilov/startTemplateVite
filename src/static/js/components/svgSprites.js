const importAll = (r) => r.keys().map(r);
importAll(require.context('../../img/svg', false, /\.svg$/));
