import type { ReactNode } from 'react';
import s from './PhoneFrame.module.css';

/**
 * Android phone frame around a 390 × 844 app screen built from DS components.
 * Size: set the CSS variable --phone-w (unitless px, default 300) on the frame or a parent;
 * the screen is drawn at 390 px and scaled with CSS zoom, so DS components keep their real sizes.
 */
export function PhoneFrame(p: { children: ReactNode; label: string; time?: string; className?: string }) {
  return (
    <figure className={`${s.frame} ${p.className ?? ''}`} aria-label={p.label}>
      <div className={s.screen}>
        <div className={s.status} aria-hidden="true">
          <span className="tabular">{p.time ?? '8:56'}</span>
          <span className={s.icons}><i /><i /><i /></span>
        </div>
        <div className={s.body}>{p.children}</div>
        <div className={s.gesture} aria-hidden="true" />
      </div>
    </figure>
  );
}
