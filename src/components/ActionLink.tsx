import type { ReactNode } from 'react';

/** A link styled as a DS button (bz-btn). Use variant "primary" for the single main action per screen. */
export function ActionLink(p: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconRight?: ReactNode;
  sub?: ReactNode;
  download?: boolean | string;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const cls = ['bz-btn', `bz-btn--${p.variant ?? 'primary'}`, `bz-btn--${p.size ?? 'lg'}`, p.sub && 'bz-btn--stack', p.fullWidth && 'bz-btn--full', p.className]
    .filter(Boolean).join(' ');
  return (
    <a href={p.href} className={cls} download={p.download} onClick={p.onClick} style={{ textDecoration: 'none' }}>
      {p.icon}
      {p.sub ? (
        <span className="bz-btn__stack"><span className="bz-btn__label">{p.children}</span><span className="bz-btn__sub">{p.sub}</span></span>
      ) : (
        <span className="bz-btn__label">{p.children}</span>
      )}
      {p.iconRight}
    </a>
  );
}
