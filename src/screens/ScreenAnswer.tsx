import type { ReactNode } from 'react';
import { DS } from '../ds';
import { AppChrome } from './AppChrome';
import s from './ScreenAnswer.module.css';

/**
 * Root of a phone mockup: fills the PhoneFrame body and is inert, so the DS controls inside
 * are a picture of the app and never take focus or clicks. Shared by screens B–F.
 */
export function ScreenRoot(p: { children: ReactNode; className?: string }) {
  return <div className={`${s.root} ${p.className ?? ''}`} {...({ inert: '' } as object)}>{p.children}</div>;
}

// Source: Bezpiecznik-night/content/knowledge/rcb-poradnik-2025/rcb-poradnik-2025-s33-f1.md
// (front matter: doc_short, title, publisher, page_label).
const SOURCE = { docShort: 'Poradnik RCB 2025', docTitle: 'Poradnik bezpieczeństwa (publ. 1/2025)', page: '33' };
const PUBLISHER = 'RCB, MON, MSWiA';

// The app's recorded answer to "Brak prądu", as it shows it:
// Bezpiecznik/night-shift/screenshots/qa-final/B-03-qa-brak-pradu.png (steps built from the "Przygotowanie" list of the chunk above).
const TITLE = 'Przygotowanie na brak prądu';
const STEPS = [
  'Przygotuj alternatywne źródła światła, ogrzewania i łączności.',
  'Rozważ zakup agregatu prądotwórczego.',
  'Naładuj powerbanki i włącz w telefonie tryb oszczędzania energii.',
  'Przygotuj zapasy żywności gotowej do spożycia i wody.',
  'Miej przy sobie zapas gotówki w różnych nominałach.',
];

// Page text, verbatim from the `original` field of the same chunk (rcb-poradnik-2025-s33-f1.md).
const QUOTE = {
  before: 'Stracisz wówczas dostęp do wody, ogrzewania, internetu i telefonu oraz możliwość płacenia kartą.',
  highlight: 'Przygotuj alternatywne źródła: światła (latarki z zapasem baterii), ogrzewania (piecyk gazowy lub olejowy, kominek), łączności (radio na baterie, krótkofalówki, CB radio).',
  after: 'Rozważ zakup agregatu prądotwórczego. Naładuj powerbanki. Włącz w telefonie tryb oszczędzania energii.',
};

// Tile labels: Bezpiecznik-night/app/lib/czat/ui/quick_actions.dart. No red heart: red is only for SOS and 112.
const TILES = [
  { id: 'rko', label: 'Ktoś nie oddycha', icon: 'heart-pulse' },
  { id: 'blackout', label: 'Brak prądu', icon: 'zap' },
  { id: 'alarm', label: 'Alarm / schron', icon: 'siren' },
  { id: 'evac', label: 'Ewakuacja', icon: 'footprints' },
];

const noop = () => {};

/**
 * Screen B of the landing plan: a calm, sourced answer about a blackout.
 * `ask`: the question typed into the empty chat. `steps`: the answer. `source`: the same answer scrolled to the page preview.
 * In the app a tap on "Brak prądu" sends the label as the message, so that is the default question.
 */
export function ScreenAnswer(p: { stage?: 'ask' | 'steps' | 'source'; question?: string }) {
  const stage = p.stage ?? 'steps';
  const question = p.question ?? 'Brak prądu';
  const steps = (
    <DS.StepsPanel title={TITLE} items={STEPS.map((text) => ({ text, source: SOURCE }))} />
  );
  return (
    <ScreenRoot>
      <AppChrome bottom={<DS.Composer defaultValue={stage === 'ask' ? question : ''} />}>
        {stage === 'ask' && (
          <div className={s.ask}>
            <p className={s.title}>Co się dzieje?</p>
            <DS.QuickActions items={TILES} />
            <p className={s.hint}>Działa bez internetu. Nie zastępuje 112.</p>
          </div>
        )}
        {stage === 'steps' && (
          <>
            <DS.Message role="user" animate={false}>{question}</DS.Message>
            <DS.Message animate={false}>{steps}</DS.Message>
          </>
        )}
        {stage === 'source' && (
          <div className={s.scrolled}>
            <DS.Message animate={false}>
              {steps}
              <DS.QuotePanel docTitle={SOURCE.docTitle} pageLabel={SOURCE.page} publisher={PUBLISHER} onExpand={noop} {...QUOTE} />
            </DS.Message>
          </div>
        )}
      </AppChrome>
    </ScreenRoot>
  );
}
