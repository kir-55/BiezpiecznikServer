import type { ReactNode } from 'react';
import { DS } from '../ds';
import { AppChrome } from './AppChrome';
import { ScreenRoot } from './ScreenAnswer';
import s from './ScreenProfile.module.css';

// Section titles, field labels and hints: Bezpiecznik-night/app/lib/profil/profile_form.dart.
// Age groups: bezpiecznik/03-ekrany/ekran-4-profil.md (model: night-shift/screenshots/qa-final/A-22-profile-edit.png).
const MEMBERS: [string, number][] = [
  ['Niemowlę (0–1)', 1],
  ['Dziecko (2–12)', 0],
  ['Nastolatek (13–17)', 0],
  ['Dorosły (18–64)', 2],
  ['Senior (65+)', 0],
];
const YES_NO = [{ id: 'tak', label: 'Tak' }, { id: 'nie', label: 'Nie' }];

// A fixed id keeps the field's markup identical on the server and in the browser (the DS makes a random one otherwise).
// Cast: the DS typings lose the native input props when React types are not resolved from the spec folder.
const input = (id: string, value: string) => ({ id, defaultValue: value, readOnly: true }) as object;

/** The app's − n + counter (the design system has no stepper yet). */
function Stepper(p: { value: number }) {
  return (
    <span className={`${s.stepper} ${p.value === 0 ? s.zero : ''}`}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
      <b>{p.value}</b>
      <DS.Icon name="plus" size={18} />
    </span>
  );
}

function Field(p: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className={s.field}>
      <span>{p.label}</span>
      {p.children}
      {p.hint && <small>{p.hint}</small>}
    </label>
  );
}

/**
 * Screen F of the landing plan: household profile, groups in cards.
 * The household of the "Zna twój dom" story: an infant, insulin, 7th floor. Only fields the app really has.
 */
export function ScreenProfile() {
  return (
    <ScreenRoot className={s.profile}>
      <AppChrome back>
        <header className={s.head}>
          <p className={s.title}>Profil domu</p>
          {/* app/lib/profil/profile_screen.dart */}
          <p>Zostaje w telefonie. Wysyłasz go tylko ty, np. SMS-em do bliskich. Nie ma konta ani serwera.</p>
        </header>
        <DS.PanelCard title="Kto mieszka w domu?" icon="users">
          <div className={s.rows}>
            {MEMBERS.map(([label, n]) => <DS.ListRow key={label} label={label} trailing={<Stepper value={n} />} />)}
          </div>
        </DS.PanelCard>
        <DS.PanelCard title="Leki" icon="pill">
          <Field label="Nazwa leku"><DS.TextField {...input('mock-lek', 'Insulina')} /></Field>
        </DS.PanelCard>
        <DS.PanelCard title="Twoje mieszkanie" icon="house">
          <div className={s.home}>
            <Field label="Piętro" hint="0 to parter"><DS.TextField {...input('mock-pietro', '7')} /></Field>
            <div className={s.lift}>
              <span>Winda</span>
              <DS.Segmented options={YES_NO} value="tak" aria-label="Winda" />
            </div>
          </div>
        </DS.PanelCard>
      </AppChrome>
    </ScreenRoot>
  );
}
