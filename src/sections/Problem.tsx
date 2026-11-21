import { DS } from '../ds';
import { Section } from '../components/Section';
import s from './Problem.module.css';

// Copy grounded in bezpiecznik/01-wizja/po-co.md ("Problem").
const PAINS = [
  { icon: 'book-open', text: 'Nikt w stresie nie czyta PDF-a na 50 stron i nie szuka w nim właściwego rozdziału.' },
  { icon: 'wifi-off', text: 'Bez zasięgu wyszukiwarka nie znajdzie nic.' },
  { icon: 'layers', text: 'Poradnik RCB, materiały straży pożarnej, wytyczne pierwszej pomocy, mapa schronów: każde w innym miejscu.' },
];

export function Problem() {
  return (
    <Section id="problem" tag="Gdy gaśnie światło" title="W kryzysie internet znika pierwszy." align="center">
      <div className={s.card}>
        <Visual />
        <div className={s.body}>
          <h3 className={s.h3}>Wiedza istnieje. <span className="muted">Tylko nie wtedy, gdy jej trzeba.</span></h3>
          <ul className={s.pains}>
            {PAINS.map((p) => (
              <li key={p.icon}>
                <span className={s.painIcon}><DS.Icon name={p.icon} size={18} /></span>
                {p.text}
              </li>
            ))}
          </ul>
          <p className={s.resolve}>
            <DS.Logo size={22} />
            <span>Bezpiecznik zbiera tę wiedzę w jedną rozmowę, która działa bez sieci.</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

/** Calm illustration: a fanned stack of PDF pages and a browser that cannot load. Decorative. */
function Visual() {
  return (
    <div className={s.visual} aria-hidden="true">
      <div className={s.stack}>
        <div className={`${s.page} ${s.p3}`} />
        <div className={`${s.page} ${s.p2}`} />
        <div className={`${s.page} ${s.p1}`}>
          <span className={s.pageHead}>Poradnik bezpieczeństwa</span>
          <span className={s.pageTitle} />
          {[92, 100, 86, 97, 70, 0, 95, 100, 88, 60, 0, 99, 93, 78].map((w, i) =>
            w ? <span key={i} className={s.line} style={{ width: `${w}%` }} /> : <span key={i} className={s.gap} />,
          )}
          <span className={`${s.pageFoot} tabular`}>s. 31 z 54</span>
        </div>
      </div>
      <div className={s.browser}>
        <div className={s.bar}>
          <DS.Icon name="x" size={14} />
          <span className={s.url}>co robić, gdy nie ma prądu</span>
        </div>
        <div className={s.offline}>
          <DS.Icon name="wifi-off" size={28} />
          <b>Brak połączenia z internetem</b>
          <span>Spróbuj ponownie później.</span>
        </div>
      </div>
    </div>
  );
}
