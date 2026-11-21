import { DS } from '../ds';
import { Section } from '../components/Section';
import s from './Sources.module.css';

// Must match what the app ships: Bezpiecznik-night content/sources/SOURCES.md, app/assets/generated/kb.sqlite
// (documents table), app/assets/cards/sources.json and app/assets/generated/points.sqlite (source = OpenStreetMap).
const GROUPS = [
  {
    name: 'Przygotowanie do kryzysu',
    items: [
      { title: 'Poradnik bezpieczeństwa', by: 'RCB, MON, MSWiA', year: '2025', about: 'Sygnały alarmowe, schron, ewakuacja, brak prądu, pożar' },
      { title: '„Nim nadejdzie dzień”. Poradnik podstaw bezpieczeństwa', by: 'Akademia Pożarnicza', year: '2025', about: 'Zapasy, dokumenty, plan na czas kryzysu' },
    ],
  },
  {
    name: 'Powódź i ewakuacja',
    items: [
      { title: '„Powódź”. Poradnik na wypadek powodzi, wyd. II', by: 'Rządowe Centrum Bezpieczeństwa', year: '2024', about: 'Przed, w trakcie i po powodzi' },
      { title: 'Plecak ewakuacyjny. Lista kontrolna', by: 'Państwowa Straż Pożarna', year: '2025', about: 'Co spakować, gdy trzeba wyjść z domu' },
    ],
  },
  {
    name: 'Pierwsza pomoc',
    items: [
      { title: 'Wytyczne resuscytacji 2025: podsumowanie, rozdziały i algorytmy', by: 'European Resuscitation Council, Polska Rada Resuscytacji', year: '2025', about: 'RKO, AED, zadławienie, krwawienie' },
      { title: '„Resuscytacja dla każdego”', by: 'European Resuscitation Council, Polska Rada Resuscytacji', year: '2025', about: 'RKO dla świadka zdarzenia, dzieci i niemowlęta' },
    ],
  },
  {
    name: 'Mapa',
    items: [
      { title: 'Mapa i punkty schronienia', by: '© OpenStreetMap contributors, licencja ODbL', year: null, about: 'Kafelki mapy: OpenMapTiles' },
    ],
  },
];

export function Sources() {
  return (
    <Section
      id="zrodla"
      tag="Źródła"
      title="Wiedza z oficjalnych poradników"
      lead="Bezpiecznik nie wymyśla rad. Odpowiada fragmentami publicznych poradników, które ma zapisane w telefonie."
    >
      <div className={s.grid}>
        {GROUPS.map((g) => (
          <section key={g.name} className={s.group} aria-labelledby={`zr-${g.name}`}>
            <h3 id={`zr-${g.name}`} className={s.groupName}>{g.name}</h3>
            <ul className={s.list}>
              {g.items.map((it) => (
                <li key={it.title}>
                  <span className={s.title}>{it.title}</span>
                  <span className={s.by}>{it.by}{it.year && <>, <span className="tabular">{it.year}</span></>}</span>
                  <span className={s.about}>{it.about}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={s.note}>
        <p>
          Bezpiecznik nie jest aplikacją rządową. Cytuje publiczne poradniki i przy każdej radzie podaje źródło i stronę.
        </p>
        <span className={s.chip}>
          <span className={s.chipLabel}>Na przykład</span>
          <DS.SourceChip docShort="Poradnik RCB 2025" page={31} />
        </span>
      </div>
    </Section>
  );
}
