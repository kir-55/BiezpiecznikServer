import { DS } from '../ds';
import { ActionLink } from '../components/ActionLink';
import { FloatCard } from '../components/FloatCard';
import { PhoneFrame } from '../components/PhoneFrame';
import { RotatingWord } from '../components/RotatingWord';
import { usePlatform } from '../components/usePlatform';
import { release } from '../content/release';
import { ScreenStart } from '../screens/ScreenStart';
import s from './Hero.module.css';

// README "Hasło": one pass, ends on "życie" and stays. The period belongs to the word.
const WORDS = ['życie.', 'zdrowie.', 'bliskich.', 'życie.'];

export function Hero() {
  // Prerender and first paint link to the download section; on Android the button downloads the APK directly.
  const android = usePlatform() === 'android';

  return (
    <section id="hero" className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <a href="#jak-dziala" className={s.eyebrow}>
            Działa bez internetu <DS.Icon name="chevron-right" size={16} />
          </a>
          <h1 id="hero-title" className={s.title}>
            Aplikacja, która<br />ratuje <RotatingWord words={WORDS} holdMs={2400} className={s.word} />
          </h1>
          <p className={s.sub}>Mówi, co zrobić teraz: krok po kroku, z oficjalnych poradników. Działa bez internetu.</p>
          <div className={s.actions}>
            <ActionLink
              href={android ? release.url : '#pobierz'}
              download={android ? release.fileName : undefined}
              size="xl"
              icon={<DS.Icon name="download" />}
            >
              Pobierz na Androida
            </ActionLink>
            <ActionLink href="#demo" variant="secondary" size="xl" iconRight={<DS.Icon name="chevron-down" />}>
              Zobacz, jak działa
            </ActionLink>
          </div>
          <p className={s.micro}><b>Bezpłatnie. Bez konta.</b></p>
        </div>

        <div className={s.visual}>
          <div className={s.stage}>
            <PhoneFrame
              className={s.phone}
              label="Ekran startowy Bezpiecznika: pytanie „Co się dzieje?” i cztery skróty: Ktoś nie oddycha, Brak prądu, Alarm / schron, Ewakuacja."
            >
              <ScreenStart />
            </PhoneFrame>
            <FloatCard intro={900} className={s.cardA} icon={<DS.Icon name="plane" size={18} />} title="Tryb samolotowy" meta="działa">
              Czat, mapa i pierwsza pomoc.
            </FloatCard>
            {/* Page cited by the default answer of the Demo section (content/demo.ts, rcb-poradnik-2025-s33-f1). */}
            <FloatCard intro={1500} className={s.cardB} tone="verified" icon={<DS.Icon name="book-open" size={18} />} title="Poradnik RCB 2025" meta="s. 33">
              Źródło odpowiedzi o braku prądu.
            </FloatCard>
          </div>
        </div>
      </div>
    </section>
  );
}
