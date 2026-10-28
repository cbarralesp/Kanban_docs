const path = require('path');
const { Deck, THEME } = require('./lib');
const { applyTheme } = require('./apply_theme.js');

(async () => {
  const salida = process.argv[2];
  const d = Deck();
  require('./parte1')(d);
  require('./parte2')(d);
  await d.pres.writeFile({ fileName: salida });
  await applyTheme(salida, THEME);
  console.log('ok', path.resolve(salida));
})().catch((e) => { console.error(e); process.exit(1); });
