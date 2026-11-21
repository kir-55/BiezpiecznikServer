import { DS } from '../ds';
import { AppChrome } from './AppChrome';
import { ScreenRoot } from './ScreenAnswer';
import s from './ScreenRko.module.css';

// Source: Bezpiecznik-night/app/assets/cards/rko.json, panel "cpr":
// rate_bpm 110, adult variant 30 compressions : 2 breaths, rescuer_change_s 120, verify: true.
const RATE = 110;
const RATIO = '30:2';
// Source of the cpr panel (source_id erc-2025-bls-algorytmy-s3-f112): Bezpiecznik-night/app/assets/cards/sources.json.
const CPR_SOURCE = { docShort: 'ERC 2025, BLS krok po kroku', docTitle: 'Podstawowe zabiegi resuscytacyjne krok po kroku - algorytmy', page: '3' };
// Bezpiecznik-night/app/lib/alarm/panel/call_panel.dart (numbers row).
const NUMBERS = [['999', 'Pogotowie'], ['998', 'Straż'], ['997', 'Policja']];

/**
 * Screen C of the landing plan: the CPR rescue card.
 * `call`: the card as it opens, 112 first (model: night-shift/screenshots/qa-0900/10-rko.png).
 * `running`: the instructor counting compressions, pinned above the composer (model: qa-final/C-21-compressions.png).
 * The numbers 999 / 998 / 997 stay visible as one quiet row (owner decision fbe50c2).
 */
export function ScreenRko(p: { stage?: 'call' | 'running' }) {
  const running = (p.stage ?? 'running') === 'running';
  return (
    <ScreenRoot>
      <AppChrome
        bottom={
          <div className={s.bottom}>
            {/* 1:28 into the session: the fourth cycle, 32 s before the 2-minute rescuer change. */}
            {running && <DS.CprPinned variantLabel="Dorosły" rate={RATE} count={17} total={30} elapsed="1:28" changeIn="0:32" />}
            <DS.Composer />
          </div>
        }
      >
        {!running && <DS.Message role="user" animate={false}>Ktoś nie oddycha</DS.Message>}
        <DS.Message animate={false} className={s.card}>
          <div className={s.label}>
            <DS.AnswerLabel origin="rescue_card" />
            {/* rko.json has verify: true, so the card keeps the app's badge (app/lib/ratunek/cards/verify_badge.dart). */}
            <DS.Notice variant="warning" className={s.verify}>Do weryfikacji</DS.Notice>
          </div>
          <DS.CallPanel contacts={['Mama']} />
          <div className={s.numbers}>
            {NUMBERS.map(([n, name]) => <span key={n}><b>{n}</b> {name}</span>)}
            <span className={s.more}>Więcej <DS.Icon name="chevron-down" size={16} /></span>
          </div>
          <DS.CprCard state={running ? 'running' : 'idle'} variantLabel="Dorosły" rate={RATE} ratio={RATIO} source={CPR_SOURCE} />
        </DS.Message>
      </AppChrome>
    </ScreenRoot>
  );
}
