import type { ReactNode } from 'react';
import { DS } from '../ds';
import { Section } from '../components/Section';
import s from './Privacy.module.css';

// Claims checked against 01-wizja/zasady.md, 05-technologia/prywatnosc-i-bezpieczenstwo.md
// and 03-ekrany/panel-2-kontakt-ze-sluzbami.md. Do not add encryption claims: the app does not encrypt today.
export function Privacy() {
  return (
    <Section
      id="prywatnosc"
      tag="Prywatność i uczciwość"
      title={<>Twój dom zostaje w twoim telefonie. <span className="muted">Nie mamy serwera, który mógłby go zobaczyć.</span></>}
      lead="Bezpiecznik odpowiada na telefonie, nie w chmurze. Nikt poza tobą nie wie, o co pytasz."
    >
      <div className={s.bento}>
        <Card className={s.wide} title="Nic nie wychodzi z telefonu." rest="Bez konta i bez serwera. Profil domu, rozmowy i lokalizacja zostają u ciebie.">
          <div className={s.rows}>
            <DS.ListRow icon={<DS.Icon name="house" />} label="Profil domu" value="na telefonie" />
            <DS.ListRow icon={<DS.Icon name="message-square-text" />} label="Rozmowy" value="na telefonie" />
            <DS.ListRow icon={<DS.Icon name="map-pin" />} label="Lokalizacja" value="na telefonie" />
          </div>
        </Card>

        <Card title="Nie zgaduje." rest="Gdy poradniki czegoś nie opisują, mówi to wprost.">
          <div className={s.chat}>
            <p className={s.bubble}>Ile paracetamolu mogę dać dziecku?</p>
            <DS.NoSource title="Nie wiem. Moje źródła tego nie opisują.">
              Zapytaj lekarza, farmaceutę albo właściwą instytucję.
            </DS.NoSource>
          </div>
        </Card>

        <Card title="SMS wysyłasz ty." rest="„Powiadom bliskich” tylko przygotowuje wiadomość z twoją lokalizacją.">
          <div className={s.sms}>
            <span className={s.smsTo}>Do: Mama, Tomek</span>
            {/* Shape of the real SMS template (panel-2), without Polish letters like the app sends it. */}
            <p className={`${s.smsBody} tabular`}>
              SOS. Potrzebuje pomocy.<br />
              Pozycja: 53.42894, 14.55302 (dokladnosc 12 m, 21:14)<br />
              Jesli nie odpowiadam, zadzwon pod 112 i podaj te dane.
            </p>
            <span className={s.send}>
              <DS.Icon name="arrow-up" size={18} />
            </span>
          </div>
        </Card>

        <Card className={s.wide} title="Bez reklam i śledzenia." rest="Bez analityki i bez ciasteczek. Ta strona też ich nie używa.">
          <dl className={s.counts}>
            {['Reklamy', 'Analityka', 'Ciasteczka'].map((k) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>Brak</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <p className={s.motto} data-reveal-text=""><span>Bez konta.</span> <span>Bez reklam.</span> <span className="muted">Bez internetu.</span></p>

      <DS.Notice className={s.scope} icon="info" title="Uczciwie o zakresie">
        <span>
          Bezpiecznik nie zastępuje 112 ani lekarza. Nie diagnozuje i nie dobiera leków.
          Karty pierwszej pomocy czekają jeszcze na sprawdzenie przez ratownika medycznego. Do tego czasu aplikacja oznacza je jako <span className={s.nowrap}>„Do weryfikacji”</span>.
        </span>
      </DS.Notice>
    </Section>
  );
}

function Card(p: { title: string; rest: string; children: ReactNode; className?: string }) {
  return (
    <article className={`${s.card} ${p.className ?? ''}`}>
      <h3 className={s.h3}>{p.title} <span className="muted">{p.rest}</span></h3>
      <div className={s.visual}>{p.children}</div>
    </article>
  );
}
