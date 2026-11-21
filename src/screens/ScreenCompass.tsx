import { DS } from '../ds';
import { AppChrome } from './AppChrome';
import { ScreenRoot } from './ScreenAnswer';
import s from './ScreenCompass.module.css';

/**
 * Screen E of the landing plan: compass to the nearest shelter, no map, works in airplane mode
 * (model: Bezpiecznik/night-shift/screenshots/qa-0750/F-06d-compass.png and qa-final/D-13-compass.png).
 * Real example: position 53.42850, 14.55280 (Szczecin), target 810 m to the south-west.
 * The target is point 19 in Bezpiecznik-night/app/assets/generated/points.sqlite (OpenStreetMap, no name, no address),
 * so the label stays generic instead of an invented street.
 */
export function ScreenCompass() {
  return (
    <ScreenRoot>
      <AppChrome back>
        {/* rotation = bearing to target (210°) minus the phone's heading (240°): the user is almost facing the shelter. */}
        <DS.CompassView className={s.compass} target="najbliższy schron" distance={810} bearing={210} rotation={-30} coords="53.42850, 14.55280" />
      </AppChrome>
    </ScreenRoot>
  );
}
