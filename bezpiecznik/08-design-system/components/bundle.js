/* @ds-bundle: {"format":4,"namespace":"Bezpiecznik","components":[{"name":"Logo"},{"name":"Button"},{"name":"Checkbox"},{"name":"Switch"},{"name":"Segmented"},{"name":"ProgressBar"},{"name":"ChoiceChips"},{"name":"TextField"},{"name":"ListRow"},{"name":"SectionHeader"},{"name":"Notice"},{"name":"Toast"},{"name":"Dialog"},{"name":"Sheet"},{"name":"NavIsland"},{"name":"FloatingButton"},{"name":"SosButton"},{"name":"CprIndicator"},{"name":"Composer"},{"name":"Message"},{"name":"AnswerLabel"},{"name":"SourceChip"},{"name":"Thinking"},{"name":"QuickActions"},{"name":"JumpToLatest"},{"name":"NoSource"},{"name":"OfflineBadge"},{"name":"PanelCard"},{"name":"StepsPanel"},{"name":"Steps"},{"name":"BulletsPanel"},{"name":"QuotePanel"},{"name":"MapCard"},{"name":"CallPanel"},{"name":"Fallback112"},{"name":"SignalPanel"},{"name":"CprCard"},{"name":"CprPinned"},{"name":"AnimationPanel"},{"name":"MapMarker"},{"name":"UserDot"},{"name":"DetailIndicator"},{"name":"PointSheet"},{"name":"NearestList"},{"name":"LayersSheet"},{"name":"RouteBanner"},{"name":"RouteBar"},{"name":"CompassView"},{"name":"ChatDrawer"},{"name":"StepHeader"},{"name":"QuestionStep"},{"name":"PackageRow"}]} */
(function () {
  var React = window.React, h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useLayoutEffect = React.useLayoutEffect;
  var ICONS = {"arrow-up": "<path d=\"m5 12 7-7 7 7\"/><path d=\"M12 19V5\"/>", "plus": "<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>", "mic": "<path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\"/><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"/><line x1=\"12\" x2=\"12\" y1=\"19\" y2=\"22\"/>", "book-open": "<path d=\"M12 7v14\"/><path d=\"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z\"/>", "triangle-alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"/><path d=\"M12 9v4\"/><path d=\"M12 17h.01\"/>", "phone": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"/>", "wifi-off": "<path d=\"M12 20h.01\"/><path d=\"M8.5 16.429a5 5 0 0 1 7 0\"/><path d=\"M5 12.859a10 10 0 0 1 5.17-2.69\"/><path d=\"M19 12.859a10 10 0 0 0-2.007-1.523\"/><path d=\"M2 8.82a15 15 0 0 1 4.177-2.643\"/><path d=\"M22 8.82a15 15 0 0 0-11.288-3.764\"/><path d=\"m2 2 20 20\"/>", "plane": "<path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\"/>", "square": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/>", "menu": "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"/><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"/><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"/>", "map": "<path d=\"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z\"/><path d=\"M15 5.764v15\"/><path d=\"M9 3.236v15\"/>", "arrow-left": "<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>", "x": "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>", "chevron-right": "<path d=\"m9 18 6-6-6-6\"/>", "chevron-left": "<path d=\"m15 18-6-6 6-6\"/>", "chevron-down": "<path d=\"m6 9 6 6 6-6\"/>", "check": "<path d=\"M20 6 9 17l-5-5\"/>", "locate-fixed": "<line x1=\"2\" x2=\"5\" y1=\"12\" y2=\"12\"/><line x1=\"19\" x2=\"22\" y1=\"12\" y2=\"12\"/><line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"5\"/><line x1=\"12\" x2=\"12\" y1=\"19\" y2=\"22\"/><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "layers": "<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z\"/><path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\"/><path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\"/>", "compass": "<path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\"/><circle cx=\"12\" cy=\"12\" r=\"10\"/>", "volume-2": "<path d=\"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z\"/><path d=\"M16 9a5 5 0 0 1 0 6\"/><path d=\"M19.364 18.364a9 9 0 0 0 0-12.728\"/>", "flashlight": "<path d=\"M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z\"/><line x1=\"6\" x2=\"18\" y1=\"6\" y2=\"6\"/><line x1=\"12\" x2=\"12\" y1=\"12\" y2=\"12\"/>", "smartphone": "<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\"/><path d=\"M12 18h.01\"/>", "message-square-text": "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/><path d=\"M13 8H7\"/><path d=\"M17 12H7\"/>", "settings": "<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>", "play": "<polygon points=\"6 3 20 12 6 21 6 3\"/>", "pause": "<rect x=\"14\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"/><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"/>", "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>", "copy": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"/>", "shield": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/>", "hospital": "<path d=\"M12 6v4\"/><path d=\"M14 14h-4\"/><path d=\"M14 18h-4\"/><path d=\"M14 8h-4\"/><path d=\"M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2\"/><path d=\"M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18\"/>", "flame": "<path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\"/>", "droplet": "<path d=\"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z\"/>", "pill": "<path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\"/><path d=\"m8.5 8.5 7 7\"/>", "house": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/>", "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>", "battery": "<rect width=\"16\" height=\"10\" x=\"2\" y=\"7\" rx=\"2\" ry=\"2\"/><line x1=\"22\" x2=\"22\" y1=\"11\" y2=\"13\"/>", "battery-low": "<rect width=\"16\" height=\"10\" x=\"2\" y=\"7\" rx=\"2\" ry=\"2\"/><line x1=\"22\" x2=\"22\" y1=\"11\" y2=\"13\"/><line x1=\"6\" x2=\"6\" y1=\"11\" y2=\"13\"/>", "battery-warning": "<path d=\"M10 17h.01\"/><path d=\"M10 7v6\"/><path d=\"M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2\"/><path d=\"M22 11v2\"/><path d=\"M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\"/>", "crosshair": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"22\" x2=\"18\" y1=\"12\" y2=\"12\"/><line x1=\"6\" x2=\"2\" y1=\"12\" y2=\"12\"/><line x1=\"12\" x2=\"12\" y1=\"6\" y2=\"2\"/><line x1=\"12\" x2=\"12\" y1=\"22\" y2=\"18\"/>", "arrow-down": "<path d=\"M12 5v14\"/><path d=\"m19 12-7 7-7-7\"/>", "corner-up-right": "<polyline points=\"15 14 20 9 15 4\"/><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"/>", "corner-up-left": "<polyline points=\"9 14 4 9 9 4\"/><path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"/>", "arrow-up-right": "<path d=\"M7 7h10v10\"/><path d=\"M7 17 17 7\"/>", "arrow-up-left": "<path d=\"M7 17V7h10\"/><path d=\"M17 17 7 7\"/>", "maximize-2": "<polyline points=\"15 3 21 3 21 9\"/><polyline points=\"9 21 3 21 3 15\"/><line x1=\"21\" x2=\"14\" y1=\"3\" y2=\"10\"/><line x1=\"3\" x2=\"10\" y1=\"21\" y2=\"14\"/>", "heart-pulse": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/><path d=\"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27\"/>", "zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\"/>", "siren": "<path d=\"M7 18v-6a5 5 0 1 1 10 0v6\"/><path d=\"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z\"/><path d=\"M21 12h1\"/><path d=\"M18.5 4.5 18 5\"/><path d=\"M2 12h1\"/><path d=\"M12 2v1\"/><path d=\"m4.929 4.929.707.707\"/><path d=\"M12 12v6\"/>", "footprints": "<path d=\"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z\"/><path d=\"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z\"/><path d=\"M16 17h4\"/><path d=\"M4 13h4\"/>", "list": "<path d=\"M3 12h.01\"/><path d=\"M3 18h.01\"/><path d=\"M3 6h.01\"/><path d=\"M8 12h13\"/><path d=\"M8 18h13\"/><path d=\"M8 6h13\"/>", "rotate-ccw": "<path d=\"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8\"/><path d=\"M3 3v5h5\"/>", "wifi": "<path d=\"M12 20h.01\"/><path d=\"M2 8.82a15 15 0 0 1 20 0\"/><path d=\"M5 12.859a10 10 0 0 1 14 0\"/><path d=\"M8.5 16.429a5 5 0 0 1 7 0\"/>", "signal": "<path d=\"M2 20h.01\"/><path d=\"M7 20v-4\"/><path d=\"M12 20v-8\"/><path d=\"M17 20V8\"/><path d=\"M22 4v16\"/>", "trash-2": "<path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\"/><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\"/>", "download": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"/>", "square-pen": "<path d=\"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z\"/>", "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>"};

  /* ================= pomocnicze ================= */
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys) { var r = {}; for (var k in p) if (keys.indexOf(k) === -1) r[k] = p[k]; return r; }
  function useControlled(value, initial) {
    var s = useState(initial); var controlled = value !== undefined;
    return [controlled ? value : s[0], function (v) { if (!controlled) s[1](v); }];
  }
  function Icon(p) {
    return h('svg', { viewBox: '0 0 24 24', width: p.size || 20, height: p.size || 20, fill: 'none', stroke: 'currentColor', strokeWidth: p.stroke || 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', className: p.className, style: p.style, dangerouslySetInnerHTML: { __html: ICONS[p.name] || '' } });
  }
  function fmtDistance(m) {
    if (m == null) return null;
    if (m < 1000) return Math.round(m / 10) * 10 + ' m';
    return (Math.round(m / 100) / 10).toString().replace('.', ',') + ' km';
  }
  var CARDINALS = ['północ', 'północny wschód', 'wschód', 'południowy wschód', 'południe', 'południowy zachód', 'zachód', 'północny zachód'];
  function cardinal(deg) { return CARDINALS[Math.round(((deg % 360) + 360) % 360 / 45) % 8]; }
  function dms(v, pos, neg) {
    var a = Math.abs(v), d = Math.floor(a), mf = (a - d) * 60, m = Math.floor(mf), s = ((mf - m) * 60).toFixed(1);
    return d + '°' + m + "'" + s + '"' + (v >= 0 ? pos : neg);
  }
  function Arrow(p) {
    return h('span', { className: 'bz-arrow', style: { transform: 'rotate(' + (p.deg || 0) + 'deg)' }, 'aria-hidden': 'true' }, h(Icon, { name: 'arrow-up', size: p.size || 18 }));
  }

  /* ================= logo ================= */
  function Logo(p) {
    var size = p.size || 28;
    var mark = h('svg', { viewBox: '0 0 1024 1024', width: size, height: size, 'aria-hidden': p.wordmark ? 'true' : undefined, role: p.wordmark ? undefined : 'img', 'aria-label': p.wordmark ? undefined : 'Bezpiecznik', className: 'bz-logo__mark' },
      h('path', { d: 'm 95.21765,91.696941 h 631.15681 c 71.45612,0 194.74089,70.842779 194.74089,216.208439 0,126.65827 -111.01762,193.82089 -152.11256,202.40789 64.70919,11.04043 159.77956,76.97633 159.77956,202.40789 0,180.63371 -168.97992,219.5819 -190.14075,219.5819 H 95.21765 Z', fill: 'var(--ink-100)' }),
      h('path', { d: 'M 432.87444,270.38444 H 591.12558 V 432.87443 H 753.61557 V 591.12558 H 591.12558 V 753.61556 H 432.87444 V 591.12558 h -162.49 V 432.87443 h 162.49 z', fill: 'var(--signal)' }));
    if (!p.wordmark) return mark;
    return h('span', { className: cx('bz-logo', p.className) }, mark, h('span', { className: 'bz-logo__word' }, 'Bezpiecznik'));
  }

  /* ================= kontrolki ================= */
  var Button = React.forwardRef(function Button(props, ref) {
    var variant = props.variant || 'secondary', size = props.size || 'md', loading = !!props.loading;
    var children = props.children;
    var rest = omit(props, ['variant', 'size', 'icon', 'iconRight', 'loading', 'fullWidth', 'className', 'children', 'sub']);
    var iconOnly = children == null || children === false || children === '';
    if (iconOnly && !rest['aria-label'] && typeof console !== 'undefined') console.warn('Bezpiecznik.Button: przycisk z samą ikoną wymaga aria-label');
    return h('button', Object.assign({ type: 'button' }, rest, {
      ref: ref,
      className: cx('bz-btn', 'bz-btn--' + variant, 'bz-btn--' + size, iconOnly && 'bz-btn--icon', props.fullWidth && 'bz-btn--full', props.sub && 'bz-btn--stack', loading && 'is-loading', props.className),
      disabled: rest.disabled || loading, 'aria-busy': loading || undefined
    }),
      loading ? h('span', { className: 'bz-spinner', 'aria-hidden': 'true' }) : props.icon,
      iconOnly ? null : (props.sub ? h('span', { className: 'bz-btn__stack' }, h('span', { className: 'bz-btn__label' }, children), h('span', { className: 'bz-btn__sub' }, props.sub)) : h('span', { className: 'bz-btn__label' }, children)),
      iconOnly || loading ? null : props.iconRight);
  });

  function Checkbox(p) {
    var st = useControlled(p.checked, !!p.defaultChecked), on = st[0], set = st[1];
    return h('button', { type: 'button', role: 'checkbox', 'aria-checked': on, 'aria-label': p['aria-label'], disabled: p.disabled, className: cx('bz-check', on && 'is-on', p.className),
      onClick: function () { set(!on); if (p.onChange) p.onChange(!on); } },
      h('span', { className: 'bz-check__box' }, on ? h(Icon, { name: 'check', size: 16, stroke: 3 }) : null));
  }

  function Switch(p) {
    var st = useControlled(p.checked, !!p.defaultChecked), on = st[0], set = st[1];
    return h('button', { type: 'button', role: 'switch', 'aria-checked': on, 'aria-label': p['aria-label'], disabled: p.disabled, className: cx('bz-switch', on && 'is-on', p.className),
      onClick: function () { set(!on); if (p.onChange) p.onChange(!on); } }, h('span', { className: 'bz-switch__knob' }));
  }

  function Segmented(p) {
    var opts = p.options || [];
    var st = useControlled(p.value, p.defaultValue !== undefined ? p.defaultValue : (p.allowEmpty ? null : opts[0] && opts[0].id)), val = st[0], set = st[1];
    return h('div', { role: 'radiogroup', 'aria-label': p['aria-label'], className: cx('bz-seg', 'bz-seg--' + (p.size || 'md'), p.fullWidth && 'bz-seg--full', p.className) },
      opts.map(function (o) {
        var on = o.id === val;
        return h('button', { key: o.id, type: 'button', role: 'radio', 'aria-checked': on, className: cx('bz-seg__opt', on && 'is-on'),
          onClick: function () { var nv = on && p.allowEmpty ? null : o.id; set(nv); if (p.onChange) p.onChange(nv); } }, o.label);
      }));
  }

  function ProgressBar(p) {
    var v = Math.max(0, Math.min(100, p.value || 0));
    return h('div', { className: cx('bz-progress', p.className), role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': v, 'aria-label': p['aria-label'] },
      h('span', { className: 'bz-progress__fill', style: { width: v + '%' } }));
  }

  function ChoiceChips(p) {
    var multi = !!p.multiple, opts = p.options || [];
    var st = useControlled(p.value, p.defaultValue !== undefined ? p.defaultValue : (multi ? [] : null)), val = st[0], set = st[1];
    function isOn(id) { return multi ? (val || []).indexOf(id) > -1 : val === id; }
    function toggle(id) {
      var nv;
      if (multi) { var arr = (val || []).slice(); var i = arr.indexOf(id); if (i > -1) arr.splice(i, 1); else arr.push(id); nv = arr; }
      else nv = val === id ? null : id;
      set(nv); if (p.onChange) p.onChange(nv);
    }
    return h('div', { className: cx('bz-chips', p.className), role: multi ? 'group' : 'radiogroup', 'aria-label': p['aria-label'] },
      opts.map(function (o) {
        var on = isOn(o.id);
        return h('button', { key: o.id, type: 'button', role: multi ? 'checkbox' : 'radio', 'aria-checked': on, className: cx('bz-chip', on && 'is-on'), onClick: function () { toggle(o.id); } },
          multi && on ? h(Icon, { name: 'check', size: 16, stroke: 2.5 }) : null, o.label);
      }));
  }

  function TextField(p) {
    var id = useRef('bz-tf-' + Math.random().toString(36).slice(2)).current;
    var rest = omit(p, ['label', 'hint', 'error', 'suffix', 'className']);
    return h('div', { className: cx('bz-field', p.error && 'has-error', p.className) },
      p.label ? h('label', { className: 'bz-field__label', htmlFor: id }, p.label) : null,
      h('div', { className: 'bz-field__control' },
        h('input', Object.assign({ id: id, className: 'bz-field__input', 'aria-invalid': !!p.error || undefined, 'aria-describedby': (p.error || p.hint) ? id + '-d' : undefined }, rest)),
        p.suffix ? h('span', { className: 'bz-field__suffix' }, p.suffix) : null),
      p.error ? h('div', { className: 'bz-field__error', id: id + '-d' }, p.error) : (p.hint ? h('div', { className: 'bz-field__hint', id: id + '-d' }, p.hint) : null));
  }

  function ListRow(p) {
    var interactive = !!p.onClick;
    var inner = [
      p.icon ? h('span', { key: 'i', className: 'bz-row__icon' }, p.icon) : null,
      h('span', { key: 't', className: 'bz-row__text' }, h('span', { className: 'bz-row__label' }, p.label), p.sub ? h('span', { className: 'bz-row__sub' }, p.sub) : null),
      p.value != null ? h('span', { key: 'v', className: 'bz-row__value' }, p.value) : null,
      p.trailing ? h('span', { key: 'tr', className: 'bz-row__trailing' }, p.trailing) : null,
      p.chevron || (interactive && p.chevron !== false && !p.trailing) ? h(Icon, { key: 'c', name: 'chevron-right', size: 18, className: 'bz-row__chev' }) : null
    ];
    return h(interactive ? 'button' : 'div', { type: interactive ? 'button' : undefined, className: cx('bz-row', p.tone && 'bz-row--' + p.tone, interactive && 'is-interactive', p.className), onClick: p.onClick }, inner);
  }

  function SectionHeader(p) { return h('div', { className: cx('bz-sechead', p.className), role: 'heading', 'aria-level': 2 }, p.children); }

  function Notice(p) {
    var v = p.variant || 'bar';
    var icon = p.icon || (v === 'warning' ? 'triangle-alert' : v === 'error' ? 'triangle-alert' : 'info');
    return h('div', { className: cx('bz-notice', 'bz-notice--' + v, p.className), role: v === 'error' ? 'alert' : 'status', onClick: p.onClick },
      icon === false ? null : h(Icon, { name: icon, size: 18 }),
      h('div', { className: 'bz-notice__text' }, p.title ? h('strong', null, p.title) : null, p.children),
      p.action ? h('div', { className: 'bz-notice__action' }, p.action) : null);
  }

  function Toast(p) {
    return h('div', { className: cx('bz-toast bz-anim-enter', p.className), role: 'status', 'aria-live': 'polite' },
      h('span', { className: 'bz-toast__text' }, p.children),
      p.actionLabel ? h('button', { type: 'button', className: 'bz-toast__action', onClick: p.onAction }, p.actionLabel) : null);
  }

  function Dialog(p) {
    return h('div', { className: cx('bz-dialog bz-anim-pop', p.className), role: 'alertdialog', 'aria-modal': 'true', 'aria-label': p.title, style: { '--bz-origin': 'center' } },
      h('div', { className: 'bz-dialog__title' }, p.title),
      p.children ? h('div', { className: 'bz-dialog__body' }, p.children) : null,
      h('div', { className: 'bz-dialog__actions' },
        h(Button, { variant: 'ghost', onClick: p.onCancel }, p.cancelLabel || 'Anuluj'),
        h(Button, { variant: p.danger ? 'danger-solid' : 'primary', onClick: p.onConfirm }, p.confirmLabel || 'OK')));
  }

  function Sheet(p) {
    return h('section', { className: cx('bz-sheet', p.floating && 'bz-sheet--floating', p.className), role: 'dialog', 'aria-label': p.title, style: p.maxHeight ? { maxHeight: p.maxHeight } : undefined },
      h('div', { className: 'bz-sheet__grab', 'aria-hidden': 'true' }),
      (p.title || p.onClose) ? h('div', { className: 'bz-sheet__head' },
        p.onClose ? h(Button, { variant: 'ghost', icon: h(Icon, { name: 'x' }), 'aria-label': 'Zamknij', onClick: p.onClose, className: 'bz-sheet__close' }) : null,
        p.title ? h('div', { className: 'bz-sheet__title' }, p.title) : null) : null,
      h('div', { className: 'bz-sheet__body' }, p.children));
  }

  /* ================= elementy globalne ================= */
  function NavIsland(p) {
    return h('nav', { className: cx('bz-island', p.className), 'aria-label': 'Nawigacja' },
      h('button', { type: 'button', className: 'bz-island__btn', 'aria-label': 'Menu', onClick: p.onMenu }, h(Icon, { name: 'menu' })),
      h('span', { className: 'bz-island__sep', 'aria-hidden': 'true' }),
      h('button', { type: 'button', className: 'bz-island__btn', 'aria-label': 'Mapa', onClick: p.onMap }, h(Icon, { name: 'map' })));
  }

  function FloatingButton(p) {
    var icon = p.icon || (p.kind === 'close' ? 'x' : p.kind === 'locate' ? 'locate-fixed' : 'arrow-left');
    var label = p['aria-label'] || (p.kind === 'close' ? 'Zamknij' : p.kind === 'locate' ? 'Pokaż moją pozycję' : 'Wróć');
    return h('button', { type: 'button', className: cx('bz-fab', p.active && 'is-active', p.className), 'aria-label': label, onClick: p.onClick, disabled: p.disabled }, h(Icon, { name: icon }));
  }

  function SosButton(p) {
    var hold = p.holdMs || 800;
    var s = useState(false), pressing = s[0], setPressing = s[1];
    var timer = useRef(null), fired = useRef(false);
    function down() { fired.current = false; setPressing(true); timer.current = setTimeout(function () { fired.current = true; setPressing(false); if (navigator.vibrate) navigator.vibrate(60); if (p.onHold) p.onHold(); }, hold); }
    function up() { if (timer.current) clearTimeout(timer.current); if (pressing && !fired.current && p.onPress) p.onPress(); setPressing(false); }
    function cancel() { if (timer.current) clearTimeout(timer.current); setPressing(false); }
    var C = 2 * Math.PI * 30;
    return h('button', { type: 'button', className: cx('bz-sos', pressing && 'is-holding', p.className), style: { '--bz-hold': hold + 'ms' },
      'aria-label': 'SOS, kontakt ze służbami. Przytrzymaj, aby zadzwonić pod 112.',
      onPointerDown: down, onPointerUp: up, onPointerLeave: cancel, onContextMenu: function (e) { e.preventDefault(); },
      onKeyDown: function (e) { if ((e.key === 'Enter' || e.key === ' ') && p.onPress) { e.preventDefault(); p.onPress(); } } },
      h('svg', { className: 'bz-sos__ring', viewBox: '0 0 64 64', 'aria-hidden': 'true' },
        h('circle', { cx: 32, cy: 32, r: 30, style: { strokeDasharray: C, strokeDashoffset: pressing ? 0 : C } })),
      h('span', { className: 'bz-sos__label' }, 'SOS'));
  }

  function CprIndicator(p) {
    return h('button', { type: 'button', className: cx('bz-cprind', p.className), onClick: p.onClick, 'aria-label': 'Instruktor RKO działa, ' + p.time + '. Wróć do czatu.' },
      h(BeatDot, { rate: p.rate }), 'RKO ' + (p.time || '0:00') + ' · wróć');
  }

  /* ================= czat ================= */
  function Composer(props) {
    var st = useControlled(props.value, props.defaultValue || ''), value = st[0], setValue = st[1];
    var ref = useRef(null);
    var maxRows = props.maxRows || 4;
    useLayoutEffect(function () {
      var el = ref.current; if (!el) return;
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 12 + 24 * maxRows) + 'px';
    }, [value]);
    function change(e) { setValue(e.target.value); if (props.onChange) props.onChange(e.target.value); }
    function submit(e) {
      if (e) e.preventDefault();
      if (props.generating) { if (props.onStop) props.onStop(); return; }
      var v = (value || '').trim(); if (!v || props.disabled) return;
      if (props.onSubmit) props.onSubmit(v);
      if (props.value === undefined) setValue('');
    }
    function key(e) { if (props.enterToSend && e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) submit(e); }
    var empty = !(value || '').trim();
    return h('form', { className: cx('bz-composer', props.disabled && 'is-disabled', props.className), onSubmit: submit },
      props.onAttach ? h(Button, { variant: 'ghost', icon: h(Icon, { name: 'plus' }), 'aria-label': 'Dodaj', onClick: props.onAttach, disabled: props.disabled }) : null,
      h('textarea', { ref: ref, className: 'bz-composer__input', rows: 1, value: value, maxLength: props.maxLength || 1000, onChange: change, onKeyDown: key, placeholder: props.placeholder || 'Opisz sytuację…', disabled: props.disabled, 'aria-label': 'Wiadomość' }),
      props.onVoice ? h(Button, { variant: 'ghost', icon: h(Icon, { name: 'mic' }), 'aria-label': 'Dyktuj', onClick: props.onVoice, disabled: props.disabled }) : null,
      props.generating
        ? h(Button, { type: 'submit', variant: 'primary', icon: h('span', { className: 'bz-stopicon' }), 'aria-label': 'Zatrzymaj' })
        : h(Button, { type: 'submit', variant: 'primary', icon: h(Icon, { name: 'arrow-up' }), 'aria-label': 'Wyślij', disabled: empty || props.disabled }));
  }

  function Message(props) {
    var role = props.role || 'assistant';
    if (role === 'user') return h('div', { className: cx('bz-msg bz-msg--user', props.animate !== false && 'bz-anim-enter', props.className) }, h('div', { className: 'bz-msg__bubble' }, props.children));
    return h('div', { className: cx('bz-msg bz-msg--assistant', props.animate !== false && 'bz-anim-enter', props.className) },
      props.origin ? h(AnswerLabel, { origin: props.origin }) : null,
      h('div', { className: 'bz-msg__body' }, props.children),
      props.sources ? h('div', { className: 'bz-msg__sources' }, props.sources) : null,
      props.origin === 'rescue_card' ? h('div', { className: 'bz-msg__foot' }, 'Ta instrukcja nie zastępuje połączenia z 112.') : null,
      props.status === 'stopped' ? h('div', { className: 'bz-msg__foot' }, 'Przerwano.') : null,
      props.actions ? h('div', { className: 'bz-msg__actions' }, props.actions) : null);
  }

  var ORIGIN = {
    rescue_card: { label: 'Karta ratunkowa', icon: 'heart-pulse', tone: 'sos' },
    rules: { label: 'Z twojego profilu', icon: 'house', tone: 'signal' },
    no_ai: { label: 'Tryb bez AI: fragmenty źródeł', icon: 'book-open', tone: 'muted' }
  };
  function AnswerLabel(p) {
    var o = ORIGIN[p.origin]; if (!o) return null;
    return h('div', { className: cx('bz-origin', 'bz-origin--' + o.tone) }, h(Icon, { name: o.icon, size: 16 }), o.label);
  }

  function SourceChip(props) {
    var text = props.docShort ? (props.page != null ? props.docShort + ', s. ' + props.page : props.docShort) : [props.source, props.title, props.page != null ? 's. ' + props.page : null].filter(Boolean).join(' · ');
    var aria = props.docTitle ? 'Źródło: ' + props.docTitle + ', strona ' + props.page + '. Otwórz.' : undefined;
    var content = [h(Icon, { key: 'i', name: props.icon || 'book-open', size: 14 }), h('span', { key: 't' }, text)];
    var cls = cx('bz-source', props.tone === 'neutral' && 'bz-source--neutral', props.className);
    if (props.href) return h('a', { className: cls, href: props.href, 'aria-label': aria }, content);
    if (props.onClick) return h('button', { type: 'button', className: cls, onClick: props.onClick, 'aria-label': aria }, content);
    return h('span', { className: cls }, content);
  }

  function Thinking(props) {
    return h('div', { className: cx('bz-thinking-wrap bz-anim-fade', props.className), role: 'status', 'aria-live': 'polite' },
      h('div', { className: 'bz-thinking' },
        h('span', { className: 'bz-thinking__dot', 'aria-hidden': 'true' }),
        props.label === null ? null : h('span', { className: 'bz-shimmer' }, props.label || 'Szukam w źródłach…')),
      props.skeleton ? h('div', { className: 'bz-skeleton', 'aria-hidden': 'true' }, h('span', { style: { width: '92%' } }), h('span', { style: { width: '78%' } }), h('span', { style: { width: '54%' } })) : null);
  }

  function QuickActions(p) {
    var items = p.items || [
      { id: 'rko', label: 'Ktoś nie oddycha', icon: 'heart-pulse', urgent: true },
      { id: 'blackout', label: 'Brak prądu', icon: 'zap' },
      { id: 'alarm', label: 'Alarm / schron', icon: 'siren' },
      { id: 'evac', label: 'Ewakuacja', icon: 'footprints' }];
    return h('div', { className: cx('bz-quick', p.className) }, items.map(function (it) {
      return h('button', { key: it.id, type: 'button', className: cx('bz-quick__tile', it.urgent && 'is-urgent'), onClick: function () { if (p.onSelect) p.onSelect(it); } },
        h(Icon, { name: it.icon, size: 22 }), h('span', null, it.label));
    }));
  }

  function JumpToLatest(p) {
    return h('button', { type: 'button', className: cx('bz-jump bz-anim-pop', p.className), onClick: p.onClick, style: { '--bz-origin': 'bottom center' } }, h(Icon, { name: 'arrow-down', size: 16 }), p.children || 'Nowa odpowiedź');
  }

  function NoSource(props) {
    return h('div', { className: cx('bz-nosource bz-anim-enter', props.className), role: 'note' },
      h('div', { className: 'bz-nosource__head' }, h(Icon, { name: 'book-open', size: 18 }), h('span', null, props.title || 'Nie mam tego w oficjalnych źródłach')),
      h('div', { className: 'bz-nosource__text' }, props.children || 'Pobrane poradniki nie odpowiadają na to pytanie, więc nie będę zgadywać.'),
      props.suggestion ? h('div', { className: 'bz-nosource__tip' }, props.suggestion) : null,
      props.actions ? h('div', { className: 'bz-nosource__actions' }, props.actions) : null);
  }

  function OfflineBadge(props) {
    var mode = props.mode || 'offline';
    return h('span', { className: cx('bz-offline', props.className), role: 'status' },
      h(Icon, { name: mode === 'airplane' ? 'plane' : 'wifi-off', size: 14 }),
      h('span', null, props.children || (mode === 'airplane' ? 'Tryb samolotowy · działa' : 'Offline · działa')));
  }

  /* ================= szablony odpowiedzi ================= */
  function PanelCard(p) {
    return h('section', { className: cx('bz-panel', p.tone && 'bz-panel--' + p.tone, p.className), 'aria-label': typeof p.title === 'string' ? p.title : undefined },
      p.title ? h('header', { className: 'bz-panel__head' },
        p.icon ? h(Icon, { name: p.icon, size: 18 }) : null,
        h('span', { className: 'bz-panel__title' }, p.title),
        p.aside ? h('span', { className: 'bz-panel__aside' }, p.aside) : null) : null,
      h('div', { className: 'bz-panel__body' }, p.children),
      p.footer ? h('footer', { className: 'bz-panel__foot' }, p.footer) : null);
  }

  function StepsPanel(p) {
    var items = p.items || [];
    var dn = useControlled(p.done, p.defaultDone || []), done = dn[0], setDone = dn[1];
    var current = -1;
    for (var i = 0; i < items.length; i++) if (done.indexOf(i) === -1) { current = i; break; }
    var all = items.length > 0 && current === -1;
    function toggle(i) { var arr = done.slice(); var k = arr.indexOf(i); if (k > -1) arr.splice(k, 1); else arr.push(i); setDone(arr); if (p.onDoneChange) p.onDoneChange(arr); }
    return h(PanelCard, { title: all ? 'Wszystko zrobione' : (p.title || 'Teraz'), icon: all ? 'check' : null, tone: all ? 'done' : null,
      footer: p.readAloud ? h(Button, { fullWidth: true, icon: h(Icon, { name: p.reading ? 'pause' : 'volume-2' }), onClick: p.onReadAloud }, p.reading ? 'Zatrzymaj czytanie' : 'Czytaj na głos') : null },
      p.variants ? h(Segmented, { options: p.variants, value: p.variant, defaultValue: p.variants[0].id, onChange: p.onVariantChange, fullWidth: true, 'aria-label': 'Wariant', className: 'bz-steps__variants' }) : null,
      h('ol', { className: 'bz-steps' }, items.map(function (it, i) {
        var isDone = done.indexOf(i) > -1, isCur = i === current;
        return h('li', { key: i, className: cx('bz-steps__item', isDone && 'is-done', isCur && 'is-current') },
          h('span', { className: 'bz-steps__num', 'aria-hidden': 'true' }, isDone ? h(Icon, { name: 'check', size: 14, stroke: 3 }) : i + 1),
          h('div', { className: 'bz-steps__text' },
            h('div', { className: 'bz-steps__title' }, it.text || it.title),
            it.detail ? h('div', { className: 'bz-steps__detail' }, it.detail) : null,
            it.source ? h('div', { className: 'bz-steps__src' }, h(SourceChip, Object.assign({ onClick: it.onSource || p.onSource && function () { p.onSource(it.source); } }, it.source))) : null),
          h(Checkbox, { checked: isDone, onChange: function () { toggle(i); }, 'aria-label': (isDone ? 'Zrobione: ' : 'Oznacz jako zrobione: ') + (it.text || it.title) }));
      })));
  }
  /* wsteczna zgodność: Steps = lista bez karty i bez odhaczania */
  function Steps(props) {
    return h('ol', { className: cx('bz-steps bz-steps--plain', props.className) }, (props.items || []).map(function (it, i) {
      return h('li', { key: i, className: 'bz-steps__item' }, h('span', { className: 'bz-steps__num', 'aria-hidden': 'true' }, i + 1),
        h('div', { className: 'bz-steps__text' }, h('div', { className: 'bz-steps__title' }, it.title || it.text), it.detail ? h('div', { className: 'bz-steps__detail' }, it.detail) : null));
    }));
  }

  function BulletsPanel(p) {
    var items = p.items || [];
    var dn = useControlled(p.done, p.defaultDone || []), done = dn[0], setDone = dn[1];
    function toggle(i) { var arr = done.slice(); var k = arr.indexOf(i); if (k > -1) arr.splice(k, 1); else arr.push(i); setDone(arr); if (p.onDoneChange) p.onDoneChange(arr); }
    return h(PanelCard, { title: p.title, aside: p.checkable ? done.length + ' z ' + items.length : null },
      h('ul', { className: 'bz-bullets' }, items.map(function (it, i) {
        var isDone = done.indexOf(i) > -1;
        return h('li', { key: i, className: cx('bz-bullets__item', isDone && 'is-done') },
          h('span', { className: 'bz-bullets__dot', 'aria-hidden': 'true' }),
          h('div', { className: 'bz-bullets__text' }, h('div', null, it.text), it.source ? h('div', { className: 'bz-steps__src' }, h(SourceChip, it.source)) : null),
          p.checkable ? h(Checkbox, { checked: isDone, onChange: function () { toggle(i); }, 'aria-label': it.text }) : null);
      })));
  }

  function QuotePanel(p) {
    var page = p.imageSrc
      ? h('div', { className: 'bz-quote__page bz-quote__page--img' }, h('img', { src: p.imageSrc, alt: '' }),
          (p.rects || []).map(function (r, i) { return h('span', { key: i, className: 'bz-quote__rect', style: { left: r[0] * 100 + '%', top: r[1] * 100 + '%', width: r[2] * 100 + '%', height: r[3] * 100 + '%' } }); }))
      : h('div', { className: 'bz-quote__page', 'aria-label': p.highlight },
          p.before ? h('span', { className: 'bz-quote__ctx' }, p.before + ' ') : null,
          h('mark', { className: 'bz-quote__mark' }, p.highlight),
          p.after ? h('span', { className: 'bz-quote__ctx' }, ' ' + p.after) : null);
    return h(PanelCard, { title: p.title || 'Źródło', className: cx('bz-quote', p.full && 'bz-quote--full'),
      footer: p.onExpand ? h('div', { className: 'bz-quote__foot' }, h(Button, { size: 'sm', icon: h(Icon, { name: 'maximize-2', size: 16 }), onClick: p.onExpand }, 'Powiększ')) : null },
      h('div', { className: 'bz-quote__doc' }, h('div', { className: 'bz-quote__title' }, p.docTitle), h('div', { className: 'bz-quote__meta' }, 's. ' + p.pageLabel + ' · ' + [p.publisher, p.issued].filter(Boolean).join(' '))),
      h('button', { type: 'button', className: 'bz-quote__window', onClick: p.onExpand, 'aria-label': 'Powiększ źródło' }, page),
      p.missing ? h('div', { className: 'bz-quote__missing' }, 'Nie mogę otworzyć pliku PDF. Pokazuję tekst fragmentu.') : null);
  }

  function MiniMap(p) {
    return h('svg', { className: 'bz-minimap', viewBox: '0 0 320 140', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' },
      h('rect', { width: 320, height: 140, className: 'mm-ground' }),
      h('path', { d: 'M-10 112 C60 96 120 128 190 110 S300 92 340 104 L340 150 L-10 150Z', className: 'mm-water' }),
      h('path', { d: 'M0 40 L320 58 M40 0 L70 140 M150 0 L170 140 M250 0 L230 140 M0 86 L320 74', className: 'mm-road' }),
      h('path', { d: 'M110 30 L120 70 M200 20 L260 30 M20 64 L100 62', className: 'mm-road mm-road--minor' }),
      h('path', { d: 'M88 74 L232 40', className: 'mm-line' }),
      h('circle', { cx: 88, cy: 74, r: 13, className: 'mm-acc' }),
      h('circle', { cx: 88, cy: 74, r: 6, className: 'mm-me' }),
      h('g', { transform: 'translate(232 40)' }, h('circle', { r: 12, className: p.confirmed === false ? 'mm-target mm-target--unconf' : 'mm-target' }),
        h('text', { y: 4.5, textAnchor: 'middle', className: 'mm-glyph' }, p.glyph || 'S')));
  }

  var KINDS = {
    shelter: { glyph: 'S', label: 'Schron', group: 'shelter' },
    hiding_place: { glyph: 'U', label: 'Ukrycie', group: 'shelter' },
    emergency_shelter: { glyph: 'M', label: 'Miejsce doraźnego schronienia', group: 'shelter' },
    hospital: { icon: 'plus', label: 'Szpital', group: 'neutral' },
    fire_station: { icon: 'flame', label: 'Straż pożarna', group: 'neutral' },
    water: { icon: 'droplet', label: 'Punkt poboru wody', group: 'water' },
    pharmacy: { icon: 'pill', label: 'Apteka', group: 'neutral' }
  };

  function MapCard(p) {
    var k = KINDS[p.kind || 'shelter'];
    var dist = fmtDistance(p.distance);
    var line = p.noPosition ? 'Nie znam twojej pozycji.'
      : p.straightLine ? dist + ' w linii prostej · ok. ' + p.time + ' min'
      : dist + ' · ' + p.time + ' min pieszo';
    return h(PanelCard, { title: p.title || 'Najbliższy schron', className: 'bz-mapcard',
      footer: h(Button, { variant: 'primary', size: 'lg', fullWidth: true, icon: h(Icon, { name: p.noPosition ? 'map' : 'navigation' }), onClick: p.noPosition ? p.onOpenMap : p.onGuide }, p.noPosition ? 'Pokaż na mapie' : 'Prowadź') },
      h('button', { type: 'button', className: 'bz-mapcard__map', onClick: p.onOpenMap, 'aria-label': 'Otwórz mapę' }, h(MiniMap, { glyph: k.glyph, confirmed: p.confirmed })),
      h('div', { className: 'bz-mapcard__row' },
        h(MapMarker, { kind: p.kind || 'shelter', confirmed: p.confirmed, size: 'sm' }),
        h('div', { className: 'bz-mapcard__info' },
          h('div', { className: 'bz-mapcard__name' }, k.label + (p.name ? ' · ' + p.name : '')),
          h('div', { className: 'bz-mapcard__dist' }, line),
          p.lastKnown ? h('div', { className: 'bz-mapcard__note' }, 'Od ostatniej pozycji (' + p.lastKnown + ')') : null,
          p.confirmed === false ? h('div', { className: 'bz-mapcard__note' }, 'niepotwierdzony') : null,
          p.staleMonths ? h('div', { className: 'bz-mapcard__note' }, 'Dane sprzed ' + p.staleMonths + ' mies.') : null),
        !p.noPosition && p.bearing != null ? h(Arrow, { deg: p.bearing, size: 20 }) : null),
      p.source ? h('div', { className: 'bz-steps__src' }, h(SourceChip, { tone: 'neutral', icon: 'shield', docShort: p.source, page: null, className: 'bz-source--point' })) : null);
  }

  function CallPanel(p) {
    var v = p.variant || 'inline';
    var has = p.contacts && p.contacts.length;
    var call = h('a', { key: '112', className: 'bz-btn bz-btn--sos bz-btn--xl bz-btn--full bz-btn--stack bz-call__btn', href: 'tel:112', 'aria-label': 'Zadzwoń pod numer alarmowy 112', onClick: p.onCall && function (e) { e.preventDefault(); p.onCall('112'); } },
      h(Icon, { name: 'phone', size: 26 }), h('span', { className: 'bz-btn__stack' }, h('span', { className: 'bz-btn__label' }, 'Zadzwoń 112'), h('span', { className: 'bz-btn__sub' }, 'Pogotowie, straż, policja')));
    var sms = p.smsAvailable === false ? null : h('button', { key: 'sms', type: 'button', className: 'bz-btn bz-btn--secondary bz-btn--xl bz-btn--full bz-btn--stack bz-call__btn', onClick: has ? p.onSms : p.onEditContacts },
      h(Icon, { name: 'users', size: 24 }), h('span', { className: 'bz-btn__stack' }, h('span', { className: 'bz-btn__label' }, 'Powiadom bliskich'), h('span', { className: 'bz-btn__sub' }, has ? 'SMS z lokalizacją do: ' + p.contacts.join(', ') : 'Najpierw dodaj kontakty')));
    var body = h('div', { className: 'bz-call__btns' }, call, sms);
    if (v === 'sheet') return h('div', { className: 'bz-call bz-call--sheet' }, body);
    return h(PanelCard, { title: 'Wezwij pomoc', className: 'bz-call bz-call--inline', tone: 'sos' }, body);
  }
  /* wsteczna zgodność */
  function Fallback112(props) {
    return h('div', { className: cx('bz-112 bz-anim-enter', props.className), role: 'alert' },
      h('div', { className: 'bz-112__head' }, h(Icon, { name: 'triangle-alert', size: 20 }), h('span', null, props.title || 'Zadzwoń teraz pod 112')),
      h('div', { className: 'bz-112__text' }, props.children || 'To może być zagrożenie życia. Dyspozytor poprowadzi Cię krok po kroku przez telefon.'),
      props.hint ? h('div', { className: 'bz-112__hint' }, h('span', { className: 'bz-112__hint-label' }, 'Do przyjazdu pomocy'), h('span', null, props.hint)) : null,
      h('a', { className: 'bz-btn bz-btn--sos bz-btn--lg bz-btn--full', href: 'tel:' + (props.number || '112') }, h(Icon, { name: 'phone' }), h('span', { className: 'bz-btn__label' }, 'Zadzwoń ' + (props.number || '112'))));
  }

  function SignalPanel(p) {
    var modes = p.modes || ['sound', 'flashlight', 'screen'];
    var defs = { sound: ['volume-2', 'Dźwięk'], flashlight: ['flashlight', 'Latarka SOS'], screen: ['smartphone', 'Stroboskop ekranu'] };
    var on = p.on || {};
    var any = modes.some(function (m) { return on[m]; });
    var inner = [
      h('div', { key: 'rows', className: 'bz-signal__rows' }, modes.map(function (m) {
        var unavailable = m === 'flashlight' && p.flashlightAvailable === false;
        return h(ListRow, { key: m, icon: h(Icon, { name: defs[m][0] }), label: defs[m][1], sub: unavailable ? 'Latarka niedostępna.' : (m === 'flashlight' && on[m] ? '··· ––– ···' : null),
          trailing: h(Switch, { checked: !!on[m], disabled: unavailable, 'aria-label': defs[m][1], onChange: function (v) { if (p.onToggle) p.onToggle(m, v); } }) });
      })),
      h('div', { key: 'int', className: 'bz-signal__interval' }, h('span', { className: 'bz-signal__label' }, 'Przerwa'),
        h(Segmented, { size: 'sm', value: p.interval, defaultValue: '10', onChange: p.onInterval, 'aria-label': 'Przerwa między sygnałami', options: [{ id: '0', label: '0' }, { id: '10', label: '10 s' }, { id: '30', label: '30 s' }, { id: '60', label: '60 s' }] })),
      any ? h('div', { key: 'cnt', className: 'bz-signal__counter' }, h('span', { className: 'bz-mono' }, 'Działa ' + (p.runningFor || '00:00')), ' · bateria ' + p.battery + '%', p.batteryDrop ? h('span', { className: 'bz-signal__drop' }, ' (−' + p.batteryDrop + '% od włączenia)') : null) : null,
      p.volumeLow && on.sound ? h(Notice, { key: 'vol', variant: 'bar', icon: 'volume-2' }, 'Podgłośnij telefon do maksimum.') : null
    ];
    if (p.bare) return h('div', { className: 'bz-signal' }, inner);
    return h(PanelCard, { title: 'Sygnał ratunkowy', className: 'bz-signal' }, inner);
  }

  function CprCard(p) {
    var state = p.state || 'idle';
    return h(PanelCard, { title: 'Instruktor RKO', className: 'bz-cprcard' },
      h('div', { className: 'bz-cprcard__meta' }, (p.variantLabel || 'Dorosły') + ' · ' + (p.rate || 110) + ' uciśnięć na minutę · ' + (p.ratio || '30:2')),
      state === 'idle' ? h(Button, { variant: 'primary', size: 'lg', fullWidth: true, icon: h(Icon, { name: 'play' }), onClick: p.onStart }, 'Zacznij uciskanie') : null,
      state === 'running' ? h('div', { className: 'bz-cprcard__running' }, h(BeatDot, { rate: p.rate }), 'Instruktor RKO działa ', h(Icon, { name: 'arrow-down', size: 16 })) : null,
      state === 'done' ? h('div', { className: 'bz-cprcard__done' }, h('span', null, 'Zakończono · czas ' + p.summaryTime + ' · ' + p.summaryCycles + ' cykli'), h(Button, { icon: h(Icon, { name: 'rotate-ccw' }), onClick: p.onRestart }, 'Zacznij od nowa')) : null,
      p.source ? h('div', { className: 'bz-steps__src' }, h(SourceChip, p.source)) : null);
  }

  function BeatDot(p) {
    return h('span', { className: cx('bz-beat', p.paused && 'is-paused'), style: { '--bz-beat': (60 / (p.rate || 110)) + 's' }, 'aria-hidden': 'true' });
  }

  function CprPinned(p) {
    var compress = (p.phase || 'compress') === 'compress';
    var phaseLabel = p.paused ? 'Pauza' : compress ? 'Uciskaj' : 'Dwa oddechy';
    var counter = compress ? h('span', { className: 'bz-cpr__count' }, h('b', null, p.count), ' z ' + (p.total || 30)) : h('span', { className: 'bz-cpr__count' }, h('b', null, p.breathLeft), ' s');
    if (p.compact) {
      return h('div', { className: 'bz-cpr bz-cpr--compact', role: 'region', 'aria-label': 'Instruktor RKO' },
        h(BeatDot, { rate: p.rate, paused: p.paused }),
        h('span', { className: 'bz-cpr__phase-sm' }, phaseLabel), counter,
        h('span', { className: 'bz-cpr__muted' }, p.elapsed),
        h(Button, { size: 'sm', onClick: p.onPause }, p.paused ? 'Wznów' : 'Pauza'));
    }
    return h('div', { className: cx('bz-cpr', p.changeAlert && 'is-change'), role: 'region', 'aria-label': 'Instruktor RKO' },
      p.changeAlert ? h('div', { className: 'bz-cpr__alert' }, 'Zmiana ratownika') : null,
      h('div', { className: 'bz-cpr__main', 'aria-live': 'polite' },
        h('span', { className: 'bz-cpr__phase' }, h(BeatDot, { rate: p.rate, paused: p.paused }), phaseLabel), counter),
      h('div', { className: 'bz-cpr__meta' }, 'RKO · ' + (p.variantLabel || 'Dorosły') + ' · ' + p.elapsed + (p.changeIn ? ' · zmiana za ' + p.changeIn : '')),
      !compress ? h(Button, { size: 'sm', onClick: p.onNext, className: 'bz-cpr__next' }, 'Dalej') : null,
      p.aedReminder ? h('div', { className: 'bz-cpr__aed' },
        h('span', null, 'Poproś kogoś o AED'),
        h(Button, { size: 'sm', variant: 'ghost', onClick: p.onAedHelp }, 'Jak użyć'),
        h(Checkbox, { onChange: p.onAedDone, 'aria-label': 'Ktoś niesie AED' })) : null,
      h('div', { className: 'bz-cpr__actions' },
        h(Button, { size: 'lg', fullWidth: true, icon: h(Icon, { name: p.paused ? 'play' : 'pause' }), onClick: p.onPause }, p.paused ? 'Wznów' : 'Pauza'),
        h(Button, { size: 'lg', fullWidth: true, variant: 'ghost', onClick: p.onEnd }, 'Zakończ')));
  }

  function AnimationPanel(p) {
    var st = useState(!!p.autoplay), playing = st[0], setPlaying = st[1];
    return h(PanelCard, { title: p.caption, className: 'bz-anim-panel' },
      h('button', { type: 'button', className: 'bz-anim-panel__frame', onClick: function () { setPlaying(!playing); }, 'aria-label': (playing ? 'Zatrzymaj: ' : 'Odtwórz: ') + p.caption },
        p.src && playing ? h('img', { src: p.src, alt: '' }) : (p.poster ? h('img', { src: p.poster, alt: '' }) : h('div', { className: 'bz-anim-panel__ph' }, p.placeholder || 'GIF')),
        !playing ? h('span', { className: 'bz-anim-panel__play' }, h(Icon, { name: 'play', size: 18 }), 'Odtwórz') : null),
      p.source ? h('div', { className: 'bz-steps__src' }, h(SourceChip, p.source)) : null);
  }

  /* ================= mapa ================= */
  function MapMarker(p) {
    var k = KINDS[p.kind] || KINDS.shelter;
    if (p.count) return h('span', { className: cx('bz-marker bz-marker--cluster', p.className), 'aria-label': p.count + ' punktów' }, p.count);
    var conf = p.confirmed !== false;
    return h('span', { className: cx('bz-marker', 'bz-marker--' + k.group, !conf && 'is-unconfirmed', p.selected && 'is-selected', p.size === 'sm' && 'bz-marker--sm', p.className), role: 'img', 'aria-label': k.label + (conf ? '' : ', niepotwierdzony') },
      k.glyph ? h('span', { className: 'bz-marker__glyph' }, k.glyph) : h(Icon, { name: k.icon, size: p.size === 'sm' ? 14 : 16, stroke: 2.5 }),
      !conf ? h('span', { className: 'bz-marker__q' }, '?') : null);
  }

  function UserDot(p) {
    return h('span', { className: cx('bz-user', p.stale && 'is-stale', p.className), 'aria-label': p.stale ? 'Ostatnia pozycja, ' + p.age : 'Twoja pozycja' },
      p.accuracy ? h('span', { className: 'bz-user__acc', style: { width: p.accuracy * 2, height: p.accuracy * 2 } }) : null,
      p.heading != null && !p.stale ? h('svg', { className: 'bz-user__cone', viewBox: '0 0 96 96', style: { transform: 'rotate(' + p.heading + 'deg)' }, 'aria-hidden': 'true' }, h('path', { d: 'M48 48 L26 10 A44 44 0 0 1 70 10 Z' })) : null,
      h('span', { className: 'bz-user__dot' }),
      p.stale && p.age ? h('span', { className: 'bz-user__age' }, p.age) : null);
  }

  function DetailIndicator(p) {
    return h('div', { className: cx('bz-detail', !p.inside && 'is-out', p.className) },
      h('span', { className: 'bz-detail__dot', 'aria-hidden': 'true' }), p.inside ? 'Mapa szczegółowa' : 'Poza mapą szczegółową',
      !p.inside && p.onDownload ? h(Button, { size: 'sm', variant: 'primary', onClick: p.onDownload, icon: h(Icon, { name: 'download', size: 16 }) }, 'Pobierz') : null);
  }

  function PointSheet(p) {
    var k = KINDS[p.kind] || KINDS.shelter;
    var conf = p.confirmed !== false;
    return h('div', { className: 'bz-point' },
      h('div', { className: 'bz-point__head' }, h(MapMarker, { kind: p.kind, confirmed: p.confirmed }),
        h('div', null, h('div', { className: 'bz-point__kind' }, k.label), h('div', { className: 'bz-point__name' }, p.name || p.address))),
      p.name && p.address ? h('div', { className: 'bz-point__addr' }, p.address) : null,
      h('div', { className: 'bz-point__avail' }, p.availability || 'Dostępność: brak danych'),
      p.distance != null ? h('div', { className: 'bz-point__dist' }, h('span', { className: 'bz-mono' }, fmtDistance(p.distance)), ' · ' + cardinal(p.bearing || 0), h(Arrow, { deg: p.relBearing != null ? p.relBearing : p.bearing, size: 18 })) : null,
      h('div', { className: cx('bz-point__status', conf ? 'is-conf' : 'is-unconf') }, conf ? '✓ Potwierdzony' : '? Niepotwierdzony. Dane z ' + (p.sourceName || 'OSM') + ', niesprawdzone przez PSP.'),
      h('div', { className: 'bz-point__src' }, 'Źródło: ' + p.sourceName + ', ' + p.verifiedAt),
      p.stale ? h(Notice, { variant: 'warning' }, 'Dane sprawdzono ponad rok temu. Mogą być nieaktualne.') : null,
      h('div', { className: 'bz-point__actions' },
        h(Button, { variant: 'primary', size: 'lg', fullWidth: true, icon: h(Icon, { name: 'navigation' }), onClick: p.onGuide }, 'Prowadź'),
        h(Button, { size: 'lg', fullWidth: true, icon: h(Icon, { name: 'compass' }), onClick: p.onCompass }, 'Kompas')));
  }

  function NearestList(p) {
    return h('div', { className: 'bz-nearest' },
      h('div', { className: 'bz-nearest__title' }, 'Najbliższe schronienie'),
      (p.items || []).map(function (it, i) {
        return h('button', { key: i, type: 'button', className: 'bz-nearest__row', onClick: function () { if (p.onSelect) p.onSelect(it); } },
          h(MapMarker, { kind: it.kind, confirmed: it.confirmed, size: 'sm' }),
          h('span', { className: 'bz-nearest__text' }, h('span', null, it.name), it.confirmed === false ? h('span', { className: 'bz-nearest__sub' }, 'niepotwierdzony') : null),
          h('span', { className: 'bz-nearest__dist bz-mono' }, fmtDistance(it.distance)),
          h(Arrow, { deg: it.relBearing, size: 18 }));
      }));
  }

  function LayersSheet(p) {
    var layers = p.layers || [];
    return h('div', { className: 'bz-layers' }, layers.map(function (l) {
      return h(ListRow, { key: l.id, icon: h(MapMarker, { kind: l.kind, size: 'sm' }), label: l.label, trailing: h(Switch, { checked: l.on, defaultChecked: l.defaultOn, 'aria-label': l.label, onChange: function (v) { if (p.onToggle) p.onToggle(l.id, v); } }) });
    }));
  }

  var TURN = { left: ['corner-up-left', 'w lewo'], right: ['corner-up-right', 'w prawo'], 'slight-left': ['arrow-up-left', 'lekko w lewo'], 'slight-right': ['arrow-up-right', 'lekko w prawo'], straight: ['arrow-up', 'prosto'] };
  function RouteBanner(p) {
    var t = TURN[p.turn || 'right'];
    return h('div', { className: cx('bz-maneuver', p.className), role: 'status', 'aria-live': 'polite' },
      h('span', { className: 'bz-maneuver__icon' }, h(Icon, { name: t[0], size: 32, stroke: 2.5 })),
      h('div', null, h('div', { className: 'bz-maneuver__main' }, 'Za ' + fmtDistance(p.distance) + ' ' + t[1]), p.street ? h('div', { className: 'bz-maneuver__street' }, 'w ' + p.street) : null));
  }

  function RouteBar(p) {
    return h('div', { className: cx('bz-routebar', p.className) },
      h('div', { className: 'bz-routebar__rem' }, h('span', { className: 'bz-mono' }, fmtDistance(p.distance)), ' · ' + p.time + ' min'),
      h('div', { className: 'bz-routebar__actions' },
        h(Button, { icon: h(Icon, { name: 'list' }), onClick: p.onSteps }, 'Kroki'),
        h(Button, { icon: h(Icon, { name: 'compass' }), onClick: p.onCompass }, 'Kompas'),
        h(Button, { variant: 'danger', onClick: p.onEnd }, 'Zakończ')));
  }

  function CompassView(p) {
    var rot = p.rotation || 0;
    return h('div', { className: cx('bz-compass', p.className) },
      h('div', { className: 'bz-compass__to' }, 'Do: ' + p.target),
      p.note ? h(Notice, { variant: 'bar' }, p.note) : null,
      h('div', { className: 'bz-compass__dial', 'aria-hidden': 'true' },
        h('svg', { viewBox: '0 0 200 200', className: 'bz-compass__svg' },
          h('circle', { cx: 100, cy: 100, r: 92, className: 'cmp-ring' }),
          [0, 90, 180, 270].map(function (a) { return h('line', { key: a, x1: 100, y1: 12, x2: 100, y2: 22, className: 'cmp-tick', transform: 'rotate(' + a + ' 100 100)' }); }),
          h('g', { style: { transform: 'rotate(' + rot + 'deg)', transformOrigin: '100px 100px' }, className: 'cmp-arrow' },
            h('path', { d: 'M100 30 L136 128 L100 110 L64 128 Z' })))),
      h('div', { className: 'bz-compass__dist bz-mono' }, p.distance != null ? fmtDistance(p.distance) : '—'),
      h('div', { className: 'bz-compass__card' }, p.cardinal || (p.bearing != null ? cardinal(p.bearing) : '')),
      p.coords ? h('div', { className: 'bz-compass__coords bz-mono' }, p.coords) : null,
      h('div', { className: 'bz-compass__actions' },
        h(Button, { size: 'lg', fullWidth: true, icon: h(Icon, { name: 'map' }), onClick: p.onShowMap }, 'Pokaż mapę'),
        h(Button, { size: 'lg', fullWidth: true, variant: 'danger', onClick: p.onEnd }, 'Zakończ')));
  }

  /* ================= panel boczny, onboarding, profil ================= */
  function ChatDrawer(p) {
    var groups = p.groups || [];
    return h('aside', { className: cx('bz-drawer', p.className), 'aria-label': 'Lista rozmów' },
      h('div', { className: 'bz-drawer__head' }, h(Logo, { size: 36 })),
      h('button', { type: 'button', className: 'bz-navrow', onClick: p.onNewChat }, h(Icon, { name: 'square-pen', size: 20 }), h('span', null, 'Nowy czat')),
      h('div', { className: 'bz-drawer__list' },
        groups.length === 0 ? h('div', { className: 'bz-drawer__empty' }, 'Brak zapisanych rozmów.') :
          groups.map(function (g) {
            return h('div', { key: g.label, className: 'bz-drawer__group' }, h('div', { className: 'bz-drawer__sec' }, g.label),
              g.items.map(function (c) {
                return h('button', { key: c.id, type: 'button', className: cx('bz-navrow', c.id === p.currentId && 'is-current'), onClick: function () { if (p.onSelect) p.onSelect(c); }, 'aria-label': c.title + '. Przytrzymaj, aby usunąć.' },
                  h('span', { className: 'bz-navrow__title' }, c.title));
              }));
          })),
      h('div', { className: 'bz-drawer__foot' },
        h('button', { type: 'button', className: 'bz-navrow bz-navrow--lg', onClick: p.onSettings }, h(Icon, { name: 'settings', size: 20 }), h('span', null, 'Ustawienia')),
        h('div', { className: 'bz-drawer__note' }, 'Rozmowy są zapisane tylko na tym telefonie.')));
  }

  function StepHeader(p) {
    return h('div', { className: cx('bz-stephead', p.className) },
      h('div', { className: 'bz-stephead__row' }, h('span', { className: 'bz-stephead__title' }, p.title), p.total ? h('span', { className: 'bz-stephead__count bz-mono' }, p.step + ' z ' + p.total) : null),
      p.total ? h(ProgressBar, { value: (p.step / p.total) * 100, 'aria-label': 'Krok ' + p.step + ' z ' + p.total }) : null);
  }

  function QuestionStep(p) {
    return h('div', { className: cx('bz-question', p.className) },
      h('div', { className: 'bz-question__q' }, p.question),
      p.hint ? h('div', { className: 'bz-question__hint' }, p.hint) : null,
      h('div', { className: 'bz-question__answers' },
        h(Button, { size: 'xl', fullWidth: true, onClick: p.onYes }, 'Tak'),
        h(Button, { size: 'xl', fullWidth: true, onClick: p.onNo }, 'Nie')),
      h(Button, { variant: 'ghost', fullWidth: true, onClick: p.onSkip }, 'Pomiń'));
  }

  var PKG = { waiting: 'czeka', waitingWifi: 'czeka na Wi-Fi', done: '✓ gotowe', error: 'błąd', paused: 'Wstrzymane, brak internetu', unsupported: 'Niedostępne na tym telefonie' };
  function PackageRow(p) {
    var state = p.state || 'waiting';
    var sel = p.selectable !== false && state !== 'unsupported';
    return h('div', { className: cx('bz-pkg', 'is-' + state, p.className) },
      sel ? h(Checkbox, { checked: p.checked, defaultChecked: p.defaultChecked !== false, onChange: p.onCheck, 'aria-label': p.name }) : h('span', { className: 'bz-pkg__spacer' }),
      h('div', { className: 'bz-pkg__main' },
        h('div', { className: 'bz-pkg__row' }, h('span', { className: 'bz-pkg__name' }, p.name), p.size ? h('span', { className: 'bz-pkg__size bz-mono' }, p.size) : null),
        p.hint ? h('div', { className: 'bz-pkg__hint' }, p.hint) : null,
        state === 'downloading' ? h('div', { className: 'bz-pkg__prog' }, h(ProgressBar, { value: p.progress, 'aria-label': p.name }), h('span', { className: 'bz-mono' }, p.progress + '%'), p.onPause ? h(Button, { size: 'sm', variant: 'ghost', onClick: p.onPause }, 'Wstrzymaj') : null)
          : h('div', { className: 'bz-pkg__state' }, PKG[state] || state, state === 'error' ? h(Button, { size: 'sm', onClick: p.onRetry, icon: h(Icon, { name: 'rotate-ccw', size: 16 }) }, 'Ponów') : null)));
  }

  window.Bezpiecznik = Object.assign(window.Bezpiecznik || {}, {
    Icon: Icon, Logo: Logo, Button: Button, Checkbox: Checkbox, Switch: Switch, Segmented: Segmented, ProgressBar: ProgressBar, ChoiceChips: ChoiceChips, TextField: TextField,
    ListRow: ListRow, SectionHeader: SectionHeader, Notice: Notice, Toast: Toast, Dialog: Dialog, Sheet: Sheet,
    NavIsland: NavIsland, FloatingButton: FloatingButton, SosButton: SosButton, CprIndicator: CprIndicator,
    Composer: Composer, Message: Message, AnswerLabel: AnswerLabel, SourceChip: SourceChip, Thinking: Thinking, QuickActions: QuickActions, JumpToLatest: JumpToLatest, NoSource: NoSource, OfflineBadge: OfflineBadge,
    PanelCard: PanelCard, StepsPanel: StepsPanel, Steps: Steps, BulletsPanel: BulletsPanel, QuotePanel: QuotePanel, MapCard: MapCard, CallPanel: CallPanel, Fallback112: Fallback112, SignalPanel: SignalPanel, CprCard: CprCard, CprPinned: CprPinned, AnimationPanel: AnimationPanel,
    MapMarker: MapMarker, UserDot: UserDot, DetailIndicator: DetailIndicator, PointSheet: PointSheet, NearestList: NearestList, LayersSheet: LayersSheet, RouteBanner: RouteBanner, RouteBar: RouteBar, CompassView: CompassView, MiniMap: MiniMap,
    ChatDrawer: ChatDrawer, StepHeader: StepHeader, QuestionStep: QuestionStep, PackageRow: PackageRow,
    format: { distance: fmtDistance, cardinal: cardinal, dms: dms }
  });
})();
