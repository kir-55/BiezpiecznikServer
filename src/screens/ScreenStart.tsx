import { DS } from '../ds';
import { AppChrome } from './AppChrome';
import s from './ScreenStart.module.css';

// Labels: app/lib/czat/ui/quick_actions.dart (defaultQuickActions). Icons: DS QuickActions defaults.
// No `urgent` tile: red is only for SOS and 112 (README, "Zasady dopracowania").
const TILES = [
  { id: 'rko', label: 'Ktoś nie oddycha', icon: 'heart-pulse' },
  { id: 'blackout', label: 'Brak prądu', icon: 'zap' },
  { id: 'alarm', label: 'Alarm / schron', icon: 'siren' },
  { id: 'evac', label: 'Ewakuacja', icon: 'footprints' },
];

/**
 * Screen A of the landing plan: empty chat "Co się dzieje?" (model: night-shift/screenshots/qa-0900/05-chat.png).
 * Polished as the README asks: filled tiles without borders, ink-200 icons, more air above the heading.
 * A picture of the app, not a control: the whole screen is inert.
 */
export function ScreenStart() {
  return (
    <div className={s.root} {...({ inert: '' } as object)}>
      <AppChrome bottom={<DS.Composer placeholder="Opisz sytuację…" />}>
        <div className={s.start}>
          <p className={s.title}>Co się dzieje?</p>
          <DS.QuickActions items={TILES} className={s.tiles} />
          <p className={s.hint}>Działa bez internetu. Nie zastępuje 112.</p>
        </div>
      </AppChrome>
    </div>
  );
}
