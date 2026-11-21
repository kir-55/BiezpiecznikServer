/**
 * Quiet on-scroll reveal (progressive enhancement, client only).
 * - Content is never hidden without JS: the prerendered page is fully visible, and an element is
 *   only prepared for the reveal if it is still below the viewport when this runs.
 * - DS motion: fade + 8 px rise (or 96 % scale for floating cards), 300 ms ease-out, small stagger.
 * - Skipped entirely with prefers-reduced-motion or without IntersectionObserver.
 * Uses data-rv attributes (not classes) so React re-renders never fight with it.
 */
const TARGETS = [
  '[data-reveal]',
  'main section > .container > header',
  'main section article',
  'main section figure',
  'main section details',
  'main section aside',
].join(',');

export function initReveal(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const all = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
  // Animate the outermost target only, except explicit [data-reveal] pieces (floating cards) inside them.
  const els = all.filter((el) => el.hasAttribute('data-reveal') || !el.parentElement?.closest(TARGETS));
  const fold = window.innerHeight;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.rv = 'in';
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
  );

  const order = new Map<Element, number>();
  for (const el of els) {
    if (el.getBoundingClientRect().top < fold) continue; // already on screen: never hide it
    const parent = el.parentElement ?? document.body;
    const i = order.get(parent) ?? 0;
    order.set(parent, i + 1);
    const base = el.dataset.reveal === 'pop' ? 220 : 0; // cards "arrive" after the phone they belong to
    el.style.setProperty('--rv-delay', `${base + Math.min(i, 4) * 70}ms`);
    el.dataset.rv = 'wait';
    io.observe(el);
  }
}
