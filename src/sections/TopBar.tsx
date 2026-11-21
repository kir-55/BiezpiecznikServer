import { DS } from '../ds';
import { ActionLink } from '../components/ActionLink';
import s from './TopBar.module.css';

const LINKS = [
  { href: '#jak-dziala', label: 'Jak działa' },
  { href: '#prywatnosc', label: 'Prywatność' },
  { href: '#pytania', label: 'Pytania' },
];

/** Floating pill bar. The hero owns the single primary button, so "Pobierz" here is secondary. */
export function TopBar() {
  return (
    <header className={s.bar}>
      <div className={`container ${s.wrap}`}>
        <div className={s.pill}>
          <a href="#hero" className={s.logo} aria-label="Bezpiecznik, początek strony">
            <DS.Logo wordmark size={28} />
          </a>
          <nav className={s.nav} aria-label="Sekcje strony">
            {LINKS.map((l) => <a key={l.href} href={l.href} className={s.link}>{l.label}</a>)}
          </nav>
          <ActionLink href="#pobierz" variant="secondary" size="md" className={s.get}>Pobierz</ActionLink>
        </div>
      </div>
    </header>
  );
}
