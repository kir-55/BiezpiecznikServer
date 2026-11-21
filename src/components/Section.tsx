import type { ReactNode } from 'react';
import { Tag } from './Tag';
import s from './Section.module.css';

/** Page section: optional pill tag, two-tone title (wrap the quieter part in <span className="muted">), lead, content. */
export function Section(p: {
  id: string;
  tag?: string;
  title?: ReactNode;
  lead?: ReactNode;
  align?: 'start' | 'center';
  children?: ReactNode;
  className?: string;
}) {
  const head = p.tag || p.title || p.lead;
  return (
    <section id={p.id} className={`${s.section} ${p.className ?? ''}`} aria-labelledby={p.title ? `${p.id}-title` : undefined}>
      <div className="container">
        {head && (
          <header className={`${s.head} ${p.align === 'center' ? s.center : ''}`}>
            {p.tag && <Tag>{p.tag}</Tag>}
            {p.title && <h2 id={`${p.id}-title`} className={s.title}>{p.title}</h2>}
            {p.lead && <p className={s.lead}>{p.lead}</p>}
          </header>
        )}
        {p.children}
      </div>
    </section>
  );
}
