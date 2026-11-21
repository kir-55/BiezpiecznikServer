import { release } from '../content/release';
import s from './QrCode.module.css';

const QUIET = 4; // modules of quiet zone required by the QR spec

/**
 * QR code for release.qr (precomputed at build time): dark modules on the light `paper` square.
 * Drawn at a whole number of px per module so edges stay crisp at 1x.
 */
export function QrCode(p: { label: string; modulePx?: number; className?: string }) {
  const { size, path } = release.qr;
  const full = size + QUIET * 2;
  const px = full * (p.modulePx ?? 5);
  return (
    <svg
      className={`${s.qr} ${p.className ?? ''}`}
      viewBox={`${-QUIET} ${-QUIET} ${full} ${full}`}
      width={px}
      height={px}
      shapeRendering="crispEdges"
      role="img"
      aria-label={p.label}
    >
      <rect x={-QUIET} y={-QUIET} width={full} height={full} fill="var(--paper)" />
      <path d={path} fill="var(--paper-ink)" />
    </svg>
  );
}
