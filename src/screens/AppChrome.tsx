import type { ReactNode } from 'react';
import { DS } from '../ds';
import s from './AppChrome.module.css';

/**
 * Top of every app screen (spec: 03-ekrany/README.md): floating island (menu + map) on the left,
 * SOS on the right, or a Back button instead of the island. Put the screen content in children.
 * Purely visual on the landing: no handlers.
 */
export function AppChrome(p: { children: ReactNode; back?: boolean; bottom?: ReactNode }) {
  return (
    <div className={s.root}>
      <div className={s.top}>
        {p.back ? <DS.FloatingButton kind="back" aria-label="Wstecz" /> : <DS.NavIsland />}
        <DS.SosButton />
      </div>
      <div className={s.content}>{p.children}</div>
      {p.bottom && <div className={s.bottom}>{p.bottom}</div>}
    </div>
  );
}
