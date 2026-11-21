import type { ReactNode } from 'react';
import { DS } from '../ds';
import { Section } from '../components/Section';
import { PhoneFrame } from '../components/PhoneFrame';
import { FloatCard } from '../components/FloatCard';
import { ScreenAnswer } from '../screens/ScreenAnswer';
import { ScreenRko } from '../screens/ScreenRko';
import s from './HowItWorks.module.css';

// One question, start to finish. The typed question is the recorded one with Polish letters
// (night-shift/screenshots/qa-final/B-13-answer-pradu.png: "Brak pradu co robic" gives the same answer as the "Brak prądu" tile).
const QUESTION = 'Brak prądu, co robić?';

function Step(p: { n: number; title: string; children: ReactNode; visual: ReactNode; wide?: boolean; flip?: boolean; anchor: 'top' | 'bottom' }) {
  return (
    <li className={`${s.card} ${p.wide ? s.wide : ''} ${p.flip ? s.flip : ''}`}>
      <div className={`${s.visual} ${s[p.anchor]}`}>{p.visual}</div>
      <div className={s.text}>
        <span className={s.step}>Krok {p.n}</span>
        <h3 className={s.h3}>{p.title}</h3>
        <p className={s.p}>{p.children}</p>
      </div>
    </li>
  );
}

export function HowItWorks() {
  return (
    <Section
      id="jak-dziala"
      tag="Jak to działa"
      title="Pytasz po swojemu. Dostajesz kroki na teraz."
      lead="Jedna rozmowa, od pytania do źródła, które możesz sprawdzić."
    >
      <ol className={s.grid}>
        <Step
          n={1}
          title="Opisz, co się dzieje"
          anchor="bottom"
          visual={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: pusty czat „Co się dzieje?” z czterema przyciskami i wpisanym pytaniem „Brak prądu, co robić?”.">
              <ScreenAnswer stage="ask" question={QUESTION} />
            </PhoneFrame>
          }
        >
          Własnymi słowami, bez szukania w menu. Albo dotknij jednego z czterech przycisków.
        </Step>
        <Step
          n={2}
          wide
          title="Dostajesz kroki na teraz"
          anchor="top"
          visual={
            <div className={s.stage}>
              <PhoneFrame className={s.phone} label="Ekran aplikacji: odpowiedź „Przygotowanie na brak prądu”, ponumerowane kroki, pod każdym źródło: Poradnik RCB 2025, strona 33.">
                <ScreenAnswer question={QUESTION} />
              </PhoneFrame>
              {/* Bezpiecznik-night/content/knowledge/rcb-poradnik-2025/rcb-poradnik-2025-s33-f1.md (doc_short, page_label, publisher) */}
              <FloatCard className={s.float} tone="verified" icon={<DS.Icon name="book-open" size={18} />} title="Poradnik RCB 2025" meta="s. 33">
                RCB, MON, MSWiA
              </FloatCard>
            </div>
          }
        >
          Krótkie polecenia, jedno po drugim. Pod każdym krokiem poradnik i numer strony.
        </Step>
        <Step
          n={3}
          wide
          flip
          title="Sprawdzasz źródło jednym dotknięciem"
          anchor="bottom"
          visual={
            <div className={s.stage}>
              <PhoneFrame className={s.phone} label="Ekran aplikacji: podgląd strony 33 Poradnika bezpieczeństwa z zakreślonym zdaniem, z którego pochodzi krok.">
                <ScreenAnswer stage="source" question={QUESTION} />
              </PhoneFrame>
              {/* Same chunk: title and page_label of rcb-poradnik-2025-s33-f1.md */}
              <FloatCard className={s.float} tone="verified" icon={<DS.Icon name="book-open" size={18} />} title="Strona 33">
                Poradnik bezpieczeństwa
              </FloatCard>
            </div>
          }
        >
          Dotknij zielonej etykiety pod krokiem. Zobaczysz tytuł poradnika, stronę i dokładne zdanie.
        </Step>
        <Step
          n={4}
          title="W zagrożeniu życia najpierw 112"
          anchor="top"
          visual={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: karta ratunkowa po wiadomości „Ktoś nie oddycha”. Pierwszy przycisk to Zadzwoń 112.">
              <ScreenRko stage="call" />
            </PhoneFrame>
          }
        >
          Przycisk połączenia stoi nad instrukcją. Bezpiecznik nie zastępuje dyspozytora.
        </Step>
      </ol>
      <p className={s.statement} data-reveal-text="">
        Działa w trybie samolotowym. <span className="muted">Czat, mapa, kompas i pierwsza pomoc bez zasięgu.</span>
      </p>
    </Section>
  );
}
