// Helpers de composición para la presentación (LAYOUT_WIDE 13.333" x 7.5").
const pptxgen = require('pptxgenjs');

const THEME = {
  name: 'IPSS Desarrollo de Software',
  headFontFace: 'Cambria',
  bodyFontFace: 'Calibri',
  colors: {
    dk1: '1B2433', lt1: 'FFFFFF', dk2: '14213D', lt2: 'EEF2F8',
    accent1: 'E63946', accent2: '2A9D8F', accent3: 'E9A23B', accent4: '457B9D',
    accent5: '6B7385', accent6: '7B6CB0', hlink: '457B9D', folHlink: '7B6CB0',
  },
};
const HEX = THEME.colors;

const W = 13.333, MX = 0.6, CW = W - 2 * MX, Y0 = 1.62, YEND = 6.75;

function crear() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = 'Desarrollo de Software II · IPSS';
  pres.title = 'Desarrollo de software: teoría, práctica y proyecto Kanban';
  const C = pres.SchemeColor;

  pres.defineSlideMaster({
    title: 'PORTADA',
    background: { color: HEX.dk2 },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', x: MX, y: 1.5, w: CW, h: 0.45, fontSize: 16, bold: true, color: C.accent1, charSpacing: 2 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', x: MX, y: 2.05, w: 9.4, h: 1.9, fontSize: 54, bold: true, color: C.background1, valign: 'top', align: 'left' }, text: '' } },
      { placeholder: { options: { name: 'body', type: 'body', x: MX, y: 4.1, w: 10.5, h: 1.6, fontSize: 22, color: 'D6DEEA', valign: 'top' }, text: '' } },
    ],
  });

  pres.defineSlideMaster({
    title: 'SECCION',
    background: { color: HEX.dk2 },
    objects: [
      { placeholder: { options: { name: 'num', type: 'body', x: MX, y: 1.45, w: 4, h: 1.3, fontSize: 80, bold: true, color: C.accent1 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', x: MX, y: 2.85, w: CW, h: 1.1, fontSize: 44, bold: true, color: C.background1, valign: 'top', align: 'left' }, text: '' } },
      { placeholder: { options: { name: 'body', type: 'body', x: MX, y: 4.1, w: 10.8, h: 2.2, fontSize: 20, color: 'D6DEEA', valign: 'top' }, text: '' } },
    ],
    slideNumber: { x: 12.15, y: 6.95, w: 0.6, h: 0.35, fontSize: 10, color: 'A9B4C8', align: 'right' },
  });

  pres.defineSlideMaster({
    title: 'CONTENIDO',
    background: { color: HEX.lt1 },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', x: MX, y: 0.32, w: CW, h: 0.32, fontSize: 12, bold: true, color: C.accent1, charSpacing: 1, margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'title', type: 'title', x: MX, y: 0.62, w: CW, h: 0.82, fontSize: 34, bold: true, color: C.text2, valign: 'top', align: 'left', margin: 0 }, text: '' } },
      { text: { text: 'Desarrollo de Software II · IPSS', options: { x: MX, y: 6.98, w: 6, h: 0.3, fontSize: 10, color: HEX.accent5, margin: 0 } } },
    ],
    slideNumber: { x: 12.15, y: 6.95, w: 0.6, h: 0.35, fontSize: 10, color: HEX.accent5, align: 'right' },
  });
  return { pres, C };
}

/** Estado del documento: sección actual para pres.addSection. */
function Deck() {
  const { pres, C } = crear();
  let seccion = 'Portada';
  let n = 0;
  const nombre = (p) => `${p}-${++n}`;

  const deck = {
    pres, C,
    seccion(titulo) { seccion = titulo; pres.addSection({ title: titulo }); },

    portada(kicker, titulo, cuerpo, notas) {
      const s = pres.addSlide({ masterName: 'PORTADA', sectionTitle: seccion });
      s.addText(kicker, { placeholder: 'kicker' });
      s.addText(titulo, { placeholder: 'title' });
      s.addText(cuerpo, { placeholder: 'body' });
      // motivo: tres "columnas" de tablero en la esquina
      [0, 1, 2].forEach((i) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 10.35 + i * 0.85, y: 0.6, w: 0.7, h: 1.9 - i * 0.45, rectRadius: 0.08,
        fill: { color: [C.accent1, C.accent2, C.accent3][i] }, line: { type: 'none' }, objectName: nombre('motivo'),
      }));
      if (notas) s.addNotes(notas);
      return s;
    },

    divisor(num, titulo, cuerpo, notas) {
      const s = pres.addSlide({ masterName: 'SECCION', sectionTitle: seccion });
      s.addText(num, { placeholder: 'num' });
      s.addText(titulo, { placeholder: 'title' });
      s.addText(cuerpo, { placeholder: 'body' });
      if (notas) s.addNotes(notas);
      return s;
    },

    slide(kicker, titulo, notas) {
      const s = pres.addSlide({ masterName: 'CONTENIDO', sectionTitle: seccion });
      s.addText(kicker.toUpperCase(), { placeholder: 'kicker' });
      s.addText(titulo, { placeholder: 'title' });
      if (notas) s.addNotes(notas);
      return s;
    },

    texto(s, text, o) {
      s.addText(text, Object.assign({ isTextBox: true, fontSize: 16, color: C.text1, valign: 'top', margin: 0, objectName: nombre('texto') }, o));
    },

    /** Lista con viñetas. items: string[] */
    bullets(s, items, o) {
      const runs = items.map((t, i) => ({ text: t, options: { bullet: { indent: 18 }, breakLine: i < items.length - 1 } }));
      s.addText(runs, Object.assign({ isTextBox: true, fontSize: 16, color: C.text1, valign: 'top', paraSpaceAfter: 8, margin: 0, objectName: nombre('lista') }, o));
    },

    /** Grilla de tarjetas con número en círculo. items: {t, d, c?} */
    cards(s, items, o = {}) {
      const cols = o.cols || Math.min(items.length, 3);
      const gap = o.gap ?? 0.3;
      const y = o.y ?? Y0;
      const x0 = o.x ?? MX;
      const w = o.w ?? CW;
      const rows = Math.ceil(items.length / cols);
      const cw = (w - gap * (cols - 1)) / cols;
      const ch = o.h ?? Math.min(2.6, ((o.yEnd ?? YEND) - y - gap * (rows - 1)) / rows);
      const dSize = o.dSize ?? (cols >= 5 ? 14 : cols === 4 ? 15 : 16);
      items.forEach((it, i) => {
        const cx = x0 + (i % cols) * (cw + gap);
        const cy = y + Math.floor(i / cols) * (ch + gap);
        const color = it.c ? C[it.c] : C.accent1;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.1, fill: { color: o.fill ? C[o.fill] : C.background2 }, line: { type: 'none' }, objectName: nombre('tarjeta') });
        let tx = cx + 0.25;
        if (o.numbered !== false) {
          s.addShape(pres.shapes.OVAL, { x: cx + 0.22, y: cy + 0.22, w: 0.48, h: 0.48, fill: { color }, line: { type: 'none' }, objectName: nombre('circulo') });
          s.addText(it.n ?? String(i + 1), { isTextBox: true, x: cx + 0.22, y: cy + 0.22, w: 0.48, h: 0.48, fontSize: 14, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, objectName: nombre('num') });
          tx = cx + 0.85;
        }
        s.addText(it.t, { isTextBox: true, x: tx, y: cy + 0.2, w: cx + cw - tx - 0.2, h: 0.52, fontSize: o.tSize ?? 17, bold: true, color: C.text2, valign: 'middle', margin: 0, fit: 'shrink', objectName: nombre('titulo') });
        if (it.d) {
          s.addText(it.d, { isTextBox: true, x: cx + 0.25, y: cy + 0.86, w: cw - 0.5, h: ch - 1.0, fontSize: dSize, color: C.text1, valign: 'top', margin: 0, objectName: nombre('desc') });
        }
      });
    },

    /** Tabla con cabecera oscura. */
    tabla(s, headers, rows, o = {}) {
      const fs = o.fontSize ?? 14;
      const head = headers.map((h) => ({ text: h, options: { bold: true, color: C.background1, fill: { color: C.text2 }, fontSize: fs, valign: 'middle' } }));
      const body = rows.map((r, ri) => r.map((cell, ci) => ({
        text: cell,
        options: { color: C.text1, fill: { color: ri % 2 ? C.background1 : C.background2 }, fontSize: fs, bold: ci === 0 && o.boldFirst !== false, valign: 'middle' },
      })));
      s.addTable([head, ...body], {
        x: o.x ?? MX, y: o.y ?? Y0, w: o.w ?? CW, colW: o.colW, rowH: o.rowH ?? 0.5,
        border: { type: 'solid', pt: 0.75, color: 'D5DBE6' }, margin: [0.05, 0.12, 0.05, 0.12], objectName: nombre('tabla'),
      });
    },

    /** Proceso horizontal: cajas con flecha entre ellas y descripción debajo. */
    flujo(s, pasos, o = {}) {
      const n = pasos.length;
      const gap = o.gap ?? 0.42;
      const x0 = o.x ?? MX, w = o.w ?? CW, y = o.y ?? Y0 + 0.2;
      const bw = (w - gap * (n - 1)) / n;
      const bh = o.bh ?? 0.9;
      pasos.forEach((p, i) => {
        const x = x0 + i * (bw + gap);
        const color = p.c ? C[p.c] : (i === n - 1 && o.ultimoAcento ? C.accent1 : C.text2);
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: bw, h: bh, rectRadius: 0.1, fill: { color }, line: { type: 'none' }, objectName: nombre('paso') });
        s.addText(p.t, { isTextBox: true, x: x + 0.08, y, w: bw - 0.16, h: bh, fontSize: o.tSize ?? 16, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, fit: 'shrink', objectName: nombre('paso-t') });
        if (i < n - 1) {
          s.addShape(pres.shapes.RIGHT_ARROW, { x: x + bw + 0.07, y: y + bh / 2 - 0.13, w: gap - 0.14, h: 0.26, fill: { color: C.accent5 }, line: { type: 'none' }, objectName: nombre('flecha') });
        }
        if (p.d) {
          s.addText(p.d, { isTextBox: true, x, y: y + bh + 0.2, w: bw, h: o.dh ?? 1.8, fontSize: o.dSize ?? 14, color: C.text1, valign: 'top', margin: 0, objectName: nombre('paso-d') });
        }
      });
      return y + bh;
    },

    /** Bloque de código oscuro. */
    codigo(s, code, o = {}) {
      const x = o.x ?? MX, y = o.y ?? Y0, w = o.w ?? 6.6, h = o.h ?? (YEND - Y0);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: C.text2 }, line: { type: 'none' }, objectName: nombre('codigo-fondo') });
      if (o.etiqueta) {
        s.addText(o.etiqueta, { isTextBox: true, x: x + 0.3, y: y + 0.18, w: w - 0.6, h: 0.3, fontSize: 11, bold: true, color: C.accent3, margin: 0, objectName: nombre('codigo-etq') });
      }
      s.addText(code, { isTextBox: true, x: x + 0.3, y: y + (o.etiqueta ? 0.55 : 0.25), w: w - 0.6, h: h - (o.etiqueta ? 0.75 : 0.45), fontFace: 'Courier New', fontSize: o.fontSize ?? 13, color: 'E8EDF5', valign: 'top', margin: 0, objectName: nombre('codigo') });
    },

    /** Panel con título y lista (para comparaciones de dos columnas). */
    panel(s, titulo, items, o) {
      const { x, y = Y0, w, h = YEND - Y0, color = 'text2', fill = 'background2' } = o;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: C[fill] }, line: { type: 'none' }, objectName: nombre('panel') });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: y + 0.25, w: w - 0.5, h: 0.6, rectRadius: 0.08, fill: { color: C[color] }, line: { type: 'none' }, objectName: nombre('panel-cab') });
      s.addText(titulo, { isTextBox: true, x: x + 0.35, y: y + 0.25, w: w - 0.7, h: 0.6, fontSize: 18, bold: true, color: C.background1, valign: 'middle', margin: 0, objectName: nombre('panel-t') });
      deck.bullets(s, items, { x: x + 0.35, y: y + 1.05, w: w - 0.7, h: h - 1.25, fontSize: o.fontSize ?? 16, paraSpaceAfter: o.paraSpaceAfter ?? 8 });
    },

    /** Diagrama de secuencia simple. parts: nombres; msgs: {de, a, t, ret?} */
    secuencia(s, parts, msgs, o = {}) {
      const x0 = o.x ?? MX, w = o.w ?? CW, y = o.y ?? Y0;
      const n = parts.length;
      const pw = Math.min(2.2, (w - 0.3 * (n - 1)) / n);
      const step = (w - pw) / (n - 1);
      const cx = parts.map((_, i) => x0 + pw / 2 + i * step);
      const yEnd = o.yEnd ?? YEND;
      parts.forEach((p, i) => {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx[i] - pw / 2, y, w: pw, h: 0.55, rectRadius: 0.08, fill: { color: C.text2 }, line: { type: 'none' }, objectName: nombre('part') });
        s.addText(p, { isTextBox: true, x: cx[i] - pw / 2, y, w: pw, h: 0.55, fontSize: 14, bold: true, color: C.background1, align: 'center', valign: 'middle', margin: 0, objectName: nombre('part-t') });
        s.addShape(pres.shapes.LINE, { x: cx[i], y: y + 0.55, w: 0, h: yEnd - y - 0.55, line: { color: 'B8C1D1', width: 1, dashType: 'dash' }, objectName: nombre('vida') });
      });
      const dy = o.dy ?? 0.5;
      msgs.forEach((m, k) => {
        const yy = y + 0.95 + k * dy;
        const a = cx[m.de], b = cx[m.a];
        const color = m.error ? C.accent1 : (m.ret ? C.accent5 : C.text2);
        if (a === b) {
          s.addText(m.t, { isTextBox: true, x: a + 0.12, y: yy - 0.3, w: step - 0.2, h: 0.3, fontSize: 12, italic: true, color, margin: 0, objectName: nombre('msg-t') });
          return;
        }
        s.addShape(pres.shapes.LINE, { x: Math.min(a, b), y: yy, w: Math.abs(b - a), h: 0, flipH: b < a, line: { color, width: 1.5, dashType: m.ret ? 'dash' : 'solid', endArrowType: 'triangle' }, objectName: nombre('msg') });
        s.addText(m.t, { isTextBox: true, x: Math.min(a, b) + 0.1, y: yy - 0.32, w: Math.abs(b - a) - 0.2, h: 0.3, fontSize: 12, color, align: 'center', margin: 0, bold: !!m.error, objectName: nombre('msg-t') });
      });
    },

    /** Caja con texto destacado (frase clave). */
    destacado(s, text, o = {}) {
      const x = o.x ?? MX, y = o.y ?? 6.05, w = o.w ?? CW, h = o.h ?? 0.62;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: o.fill ? C[o.fill] : C.text2 }, line: { type: 'none' }, objectName: nombre('destacado') });
      s.addText(text, { isTextBox: true, x: x + 0.3, y, w: w - 0.6, h, fontSize: o.fontSize ?? 16, color: C.background1, valign: 'middle', margin: 0, objectName: nombre('destacado-t') });
    },

    /** Número grande con etiqueta. */
    cifra(s, valor, etiqueta, o) {
      const { x, y = Y0, w = 2.8, color = 'accent1' } = o;
      s.addText(valor, { isTextBox: true, x, y, w, h: 1.1, fontSize: 60, bold: true, color: C[color], margin: 0, objectName: nombre('cifra') });
      s.addText(etiqueta, { isTextBox: true, x, y: y + 1.1, w, h: 0.9, fontSize: 15, color: C.text1, valign: 'top', margin: 0, objectName: nombre('cifra-t') });
    },

    caja(s, text, o) {
      const { x, y, w, h, fill = 'text2', color = 'background1', fontSize = 15, bold = true, align = 'center' } = o;
      s.addShape(o.forma ?? pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: C[fill] }, line: o.borde ? { color: C[o.borde], width: 1.5 } : { type: 'none' }, objectName: nombre('caja') });
      s.addText(text, { isTextBox: true, x: x + 0.1, y, w: w - 0.2, h, fontSize, bold, color: C[color], align, valign: 'middle', margin: 0, objectName: nombre('caja-t') });
    },

    /** Línea con punta desde (x, y) hasta (x + w, y + h). Ancho/alto negativos se normalizan con flip
     *  (PowerPoint 2010 no abre archivos con dimensiones negativas). */
    flecha(s, x, y, w, h, o = {}) {
      const flipH = w < 0, flipV = h < 0;
      if (flipH) { x += w; w = -w; }
      if (flipV) { y += h; h = -h; }
      s.addShape(pres.shapes.LINE, { x, y, w, h, flipH, flipV, line: { color: o.color ? C[o.color] : C.accent5, width: o.width ?? 1.75, dashType: o.dash ? 'dash' : 'solid', endArrowType: 'triangle', beginArrowType: o.doble ? 'triangle' : undefined }, objectName: nombre('linea') });
    },

    etiqueta(s, text, o) {
      s.addText(text, Object.assign({ isTextBox: true, fontSize: 12, color: C.accent5, margin: 0, align: 'center', objectName: nombre('etq') }, o));
    },
  };
  return deck;
}

module.exports = { Deck, THEME, MX, CW, Y0, YEND, W };
