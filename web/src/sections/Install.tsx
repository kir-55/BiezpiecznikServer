import { DS } from '../ds';
import { Section } from '../components/Section';
import { release, formatMB } from '../content/release';
import s from './Install.module.css';

const { Steps, Icon } = DS;

// TODO: add real screenshots from an Android phone next to each step
// (browser download notification, "install unknown apps" permission, system installer). No mock-ups.
const steps = [
  {
    title: 'Pobierz plik i otwórz go z powiadomienia albo z folderu Pobrane.',
    detail: `Plik ${release.fileName} ma ${formatMB(release.sizeBytes)}. Najwygodniej pobierać przez Wi-Fi.`,
  },
  {
    title: 'Android zapyta o zgodę na instalację z tego źródła. Zezwól przeglądarce.',
    detail: 'Zgodę możesz potem cofnąć w ustawieniach telefonu.',
  },
  {
    title: 'Dotknij „Zainstaluj” i otwórz Bezpiecznika.',
    detail: 'Przy pierwszym uruchomieniu aplikacja przygotuje mapę offline. Potem nie potrzebuje internetu.',
  },
];

export function Install() {
  return (
    <Section
      id="instalacja"
      tag="Instalacja"
      title={<>Instalacja <span className="muted">w trzech krokach.</span></>}
      lead="Bezpiecznika nie ma w Google Play, więc instalujesz go z pliku. Android sam zapyta o potrzebną zgodę."
    >
      <div className={s.grid}>
        <Steps items={steps} className={s.steps} />
        <aside className={s.tip} aria-labelledby="instalacja-bezpiecznie">
          <Icon name="shield" size={22} />
          <div>
            <h3 id="instalacja-bezpiecznie" className={s.tipTitle}>Pobieraj tylko z bezpiecznik.edu.pl</h3>
            <p>Inne strony mogą podsuwać zmienione pliki. Jeśli chcesz mieć pewność, porównaj sumę kontrolną SHA-256 pobranego pliku z tą podaną <a href="#sha256">przy przycisku pobierania</a>.</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
