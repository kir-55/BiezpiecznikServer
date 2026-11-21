import type { ReactNode } from 'react';
import { DS } from '../ds';
import { Section } from '../components/Section';
import s from './Faq.module.css';

const { Icon } = DS;

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Czy instalacja spoza Google Play jest bezpieczna?',
    a: <>Tak, jeśli plik pochodzi ze sprawdzonego miejsca. Pobieraj Bezpiecznika tylko z bezpiecznik.edu.pl i, jeśli chcesz, porównaj sumę kontrolną SHA-256 z tą <a href="#sha256">przy przycisku pobierania</a>. Aplikacja nie ma kont i nie wysyła twoich danych. Zgodę dla przeglądarki możesz po instalacji cofnąć.</>,
  },
  {
    q: 'Czy naprawdę działa bez internetu?',
    a: <>Tak. Po instalacji czat na oficjalnych poradnikach, mapa, kompas i karty ratunkowe działają w trybie samolotowym. Połączenie z 112 i SMS do bliskich potrzebują zasięgu komórkowego, ale nie internetu.</>,
  },
  {
    q: 'Ile miejsca zajmuje?',
    a: <>Około 3 GB. Bezpiecznik trzyma w telefonie wszystko, czego potrzebuje bez internetu: poradniki, mapę i asystenta. Dlatego pobieraj go przez Wi-Fi.</>,
  },
  {
    q: 'Czy zastępuje telefon pod 112?',
    a: <>Nie. Gdy zagrożone jest życie, dzwoń pod 112, a Bezpiecznik podpowie, co robić do przyjazdu pomocy. Dlatego w panelu SOS numer 112 jest pierwszym i największym przyciskiem. Aplikacja nigdy nie dzwoni sama: połączenie zawsze potwierdzasz w oknie telefonu.</>,
  },
  {
    q: 'Skąd Bezpiecznik bierze odpowiedzi?',
    a: <>Z oficjalnych poradników, m.in. Poradnika bezpieczeństwa (RCB, MON, MSWiA), materiałów PSP i wytycznych Polskiej Rady Resuscytacji. Przy każdej radzie jest nazwa poradnika i numer strony. Gdy poradniki czegoś nie opisują, Bezpiecznik mówi wprost: „Nie wiem. Moje źródła tego nie opisują”. Nie diagnozuje i nie dobiera leków.</>,
  },
  {
    q: 'Czy jest wersja na iPhone’a?',
    a: <>Jeszcze nie. Na razie Bezpiecznik działa na telefonach z Androidem 11 lub nowszym, z procesorem 64-bitowym. Wersja na iPhone’a jest w planach.</>,
  },
  {
    q: 'Czy to kosztuje?',
    a: <>Nie. Bezpiecznik jest bezpłatny, bez reklam i bez konta. Ta strona nie używa ciasteczek.</>,
  },
];

export function Faq() {
  return (
    <Section id="pytania" className={s.faq} tag="Pytania" title={<>Pytania <span className="muted">przed pobraniem.</span></>}>
      <div className={s.list}>
        {faq.map((it, i) => (
          <details key={it.q} className={s.item} open={i === 0}>
            <summary className={s.q}>
              <span>{it.q}</span>
              <span className={s.mark} aria-hidden="true"><Icon name="plus" size={20} /></span>
            </summary>
            <p className={s.a}>{it.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
