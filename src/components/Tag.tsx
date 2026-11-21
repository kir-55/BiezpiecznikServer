import type { ReactNode } from 'react';
import s from './Tag.module.css';

/** Small pill label above a section title. Sentence case, no monospace (DS rule). */
export function Tag(p: { children: ReactNode }) {
  return <span className={s.tag}>{p.children}</span>;
}
