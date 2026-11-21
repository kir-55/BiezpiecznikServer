import type React from 'react';
import type { ReactNode } from 'react';
import s from './FloatCard.module.css';

/** Floating notification card that overlaps a phone or mockup edge (pattern from coachon.net). Position it from the parent. */
/** `intro` (ms): CSS-only entrance after page load, for cards visible on the first screen. Cards lower down "arrive" on scroll (reveal.ts). */
export function FloatCard(p: { icon?: ReactNode; title: ReactNode; meta?: ReactNode; children?: ReactNode; tone?: 'default' | 'verified'; intro?: number; className?: string }) {
  return (
    <div
      className={`${s.card} ${p.tone === 'verified' ? s.verified : ''} ${p.intro != null ? s.intro : ''} ${p.className ?? ''}`}
      style={p.intro != null ? ({ '--fc-intro': `${p.intro}ms` } as React.CSSProperties) : undefined}
      data-reveal={p.intro != null ? undefined : 'pop'}
    >
      {p.icon && <span className={s.icon} aria-hidden="true">{p.icon}</span>}
      <span className={s.text}>
        <span className={s.row}><b>{p.title}</b>{p.meta && <span className={s.meta}>{p.meta}</span>}</span>
        {p.children && <span className={s.body}>{p.children}</span>}
      </span>
    </div>
  );
}
