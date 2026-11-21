import { DS } from '../ds';
import { ScreenAnswer, ScreenRoot } from './ScreenAnswer';
import s from './ScreenSos.module.css';

const noop = () => {};

/**
 * Screen D of the landing plan: Panel 2 "Kontakt ze służbami" over a dimmed chat
 * (spec: bezpiecznik/03-ekrany/panel-2-kontakt-ze-sluzbami.md, model: night-shift/screenshots/qa-final/C-30-p2-top.png).
 * Button labels are the design system's CallPanel labels. SOS stays above the sheet and the scrim.
 */
export function ScreenSos() {
  return (
    <ScreenRoot>
      <ScreenAnswer />
      <div className={s.scrim} />
      <DS.Sheet floating title="Kontakt ze służbami" onClose={noop} maxHeight="92%" className={s.sheet}>
        <DS.CallPanel variant="sheet" contacts={['Mama']} />
        {/* Switch label: panel-2-kontakt-ze-sluzbami.md. Preview line as the app builds it (app/lib/alarm/panel/sms_body.dart, `preview`):
            attention groups, medicine names, floor. Matches the household on screen F. */}
        <DS.ListRow
          className={s.profile}
          label="Dołącz dane z profilu"
          sub="W SMS-ie: niemowlę, Insulina, 7. piętro"
          trailing={<DS.Switch checked aria-label="Dołącz dane z profilu" />}
        />
        {/* app/lib/alarm/panel/call_panel.dart, _gpsLine. */}
        <p className={s.gps}>GPS ±5 m</p>
        <DS.ListRow className={s.more} label="Więcej" trailing={<DS.Icon name="chevron-down" size={18} />} />
      </DS.Sheet>
      <div className={s.sos}><DS.SosButton /></div>
    </ScreenRoot>
  );
}
