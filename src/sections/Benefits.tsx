import type { CSSProperties, ReactNode } from 'react';
import { DS } from '../ds';
import { Section } from '../components/Section';
import { PhoneFrame } from '../components/PhoneFrame';
import { FloatCard } from '../components/FloatCard';
import { ScreenAnswer } from '../screens/ScreenAnswer';
import { ScreenRko } from '../screens/ScreenRko';
import { ScreenSos } from '../screens/ScreenSos';
import { ScreenCompass } from '../screens/ScreenCompass';
import { ScreenProfile } from '../screens/ScreenProfile';
import s from './Benefits.module.css';

const icon = (name: string) => <DS.Icon name={name} size={18} />;

/** A fact card on the phone's edge. Desktop: `side` of the phone, `overlap` px over it, at `top` or `bottom`. On small screens the cards stack on the phone's lower edge. */
type Float = { card: ReactNode; side: 'left' | 'right'; overlap: number; top?: string; bottom?: string };

function Block(p: {
  kicker: string;
  title: string;
  children: ReactNode;
  points?: string[];
  note?: ReactNode;
  phone: ReactNode;
  floats?: Float[];
  full?: boolean;
  flip?: boolean;
}) {
  return (
    <li className={`${s.block} ${p.full ? s.full : ''} ${p.flip ? s.flip : ''}`}>
      <div className={s.text}>
        <span className={s.kicker}>{p.kicker}</span>
        <h3 className={s.h3}>{p.title}</h3>
        <p className={s.p}>{p.children}</p>
        {p.points && (
          <ul className={s.points}>
            {p.points.map((t) => <li key={t}><DS.Icon name="check" size={16} />{t}</li>)}
          </ul>
        )}
        {p.note && <p className={s.note}>{p.note}</p>}
      </div>
      <div className={s.stage}>
        {p.phone}
        {p.floats && (
          <div className={s.floats}>
            {p.floats.map((f, i) => (
              <div key={i} className={`${s.float} ${s[f.side]}`} style={{ '--overlap': `${f.overlap}px`, top: f.top, bottom: f.bottom } as CSSProperties}>
                {f.card}
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

/** Five situations, one screen each (copy: bezpiecznik/09-landing/README.md, section 4). */
export function Benefits() {
  return (
    <Section
      id="korzysci"
      tag="Pięć sytuacji"
      title="Pomaga, zanim przyjedzie pomoc."
      lead="Pięć chwil, w których dobrze mieć go w kieszeni."
    >
      <ul className={s.list}>
        <Block
          full
          kicker="Pierwsza pomoc"
          title="Prowadzi przez RKO, gdy trzęsą się ręce."
          // Facts: Bezpiecznik-night/app/assets/cards/rko.json (variants, rate_bpm 110, 30:2, rescuer_change_s 120).
          points={['Dorosły, dziecko albo niemowlę', 'Tempo 110 uciśnięć na minutę, rytm 30:2', 'Zmiana ratownika co 2 minuty']}
          note="Karta RKO czeka na sprawdzenie przez ratownika medycznego. Do tego czasu ma w aplikacji znaczek „Do weryfikacji”."
          phone={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: karta ratunkowa RKO. Na górze przycisk Zadzwoń 112, na dole instruktor: Uciskaj, 17 z 30, zmiana ratownika za 32 sekundy.">
              <ScreenRko />
            </PhoneFrame>
          }
          floats={[
            { side: 'right', overlap: 100, top: '51%', card: <FloatCard icon={icon('users')} title="Zmiana ratownika">Przypomnienie co 2 minuty.</FloatCard> },
            // Click sound: Bezpiecznik-night/app/lib/ratunek/cpr/cpr_ports.dart (AudioCprSound).
            { side: 'right', overlap: 148, bottom: '-40px', card: <FloatCard icon={icon('heart-pulse')} title="Tempo 110 na minutę">Metronom wybija rytm.</FloatCard> },
          ]}
        >
          Odlicza tempo uciśnięć, liczy cykle i przypomina o zmianie ratownika. Przycisk 112 jest zawsze na górze.
        </Block>

        <Block
          kicker="Źródła"
          title="Odpowiada z poradników, nie z głowy."
          phone={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: odpowiedź na wiadomość „Brak prądu”. Pięć kroków, pod każdym źródło: Poradnik RCB 2025, strona 33.">
              <ScreenAnswer />
            </PhoneFrame>
          }
          floats={[
            // The app's refusal text: Bezpiecznik-night/app/lib/czat/templates/no_source.dart
            { side: 'right', overlap: 150, bottom: '-58px', card: <FloatCard icon={icon('book-open')} title="Brak w źródłach">Nie wiem. Moje źródła tego nie opisują.</FloatCard> },
          ]}
        >
          Każdy krok ma źródło i numer strony. Gdy poradnik czegoś nie opisuje, Bezpiecznik mówi to wprost.
        </Block>

        <Block
          kicker="Bez zasięgu"
          title="Działa, gdy znika internet."
          phone={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: kompas do najbliższego schronu. Strzałka wskazuje kierunek, 810 metrów, południowy zachód.">
              <ScreenCompass />
            </PhoneFrame>
          }
          floats={[
            { side: 'right', overlap: 150, bottom: '-44px', card: <FloatCard icon={icon('plane')} title="Tryb samolotowy">Mapa zapisana w telefonie.</FloatCard> },
          ]}
        >
          Mapa, najbliższy schron i kompas działają w trybie samolotowym.
        </Block>

        <Block
          full
          flip
          kicker="Profil domu"
          title="Zna twój dom."
          // Sections of the real form: Bezpiecznik-night/app/lib/profil/profile_form.dart
          points={['Domownicy, od niemowlęcia po seniora', 'Leki, zwierzęta, piętro i winda', 'Każde pole możesz pominąć']}
          phone={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: profil domu. Jedno niemowlę i dwoje dorosłych, lek: insulina, mieszkanie na 7. piętrze z windą.">
              <ScreenProfile />
            </PhoneFrame>
          }
          floats={[
            { side: 'left', overlap: 132, bottom: '-40px', card: <FloatCard icon={icon('shield')} title="Zostaje w telefonie">Bez konta i bez serwera.</FloatCard> },
          ]}
        >
          Niemowlę, leki w lodówce, 7. piętro: rady są dla was, nie ogólne.
        </Block>

        <Block
          full
          kicker="SOS"
          title="Jedno dotknięcie do pomocy."
          // Behaviour: bezpiecznik/03-ekrany/panel-2-kontakt-ze-sluzbami.md
          points={['Dotknięcie SOS otwiera panel z przyciskiem 112', 'Przytrzymanie od razu otwiera wybieranie 112', 'SMS do bliskich jest gotowy. Wysyłasz go sam']}
          phone={
            <PhoneFrame className={s.phone} label="Ekran aplikacji: panel Kontakt ze służbami. Przyciski Zadzwoń 112 i Powiadom bliskich, przełącznik Dołącz dane z profilu.">
              <ScreenSos />
            </PhoneFrame>
          }
          floats={[
            // "Wyślesz go sam": Bezpiecznik-night/app/lib/profil/profile_form.dart (contacts section).
            { side: 'right', overlap: 84, top: '30%', card: <FloatCard icon={icon('map-pin')} title="SMS z lokalizacją">Gotowy. Wysyłasz go sam.</FloatCard> },
          ]}
        >
          SOS jest w rogu każdego ekranu. Najpierw 112, potem SMS do bliskich z twoją lokalizacją.
        </Block>
      </ul>
    </Section>
  );
}
