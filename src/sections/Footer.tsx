import { DS } from '../ds';
import s from './Footer.module.css';

const LINKS = [
  { href: '#prywatnosc', label: 'Prywatność' },
  { href: '#zrodla', label: 'Źródła' },
  { href: '#pytania', label: 'Pytania' },
  { href: '#pobierz', label: 'Pobierz' },
];

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <DS.Logo size={28} wordmark />
          <p>Bezpiecznik podpowiada na podstawie oficjalnych poradników. Nie zastępuje 112 ani porady lekarza.</p>
        </div>

        <nav aria-label="Na tej stronie" className={s.col}>
          <h2 className={s.head}>Na tej stronie</h2>
          <ul>
            {LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </nav>

        <div className={s.col}>
          <h2 className={s.head}>Licencje</h2>
          <ul>
            <li>
              Dane mapy © <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap contributors</a>, licencja ODbL.
              Kafelki © OpenMapTiles.
            </li>
            <li>Krój Atkinson Hyperlegible Next, licencja SIL OFL.</li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className={s.bottom}>
          <p className={s.emergency}>
            <DS.Icon name="phone" size={16} />
            <span>W zagrożeniu życia dzwoń pod <a href="tel:112">112</a>.</span>
          </p>
          <p className="tabular">© 2026 Bezpiecznik</p>
        </div>
      </div>
    </footer>
  );
}
