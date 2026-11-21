import { DS } from '../ds';
import { ActionLink } from '../components/ActionLink';
import { usePlatform } from '../components/usePlatform';
import { release } from '../content/release';
import s from './Closing.module.css';

// Same line as the promo film, so the page and the film speak with one voice.
export function Closing() {
  const android = usePlatform() === 'android';
  return (
    <section id="zamkniecie" className={s.section} aria-labelledby="zamkniecie-title">
      <div className={`container ${s.inner}`}>
        <DS.Logo size={40} />
        <h2 id="zamkniecie-title" className={s.title} data-reveal-text="">
          Internet znika pierwszy. <span className="muted">Bezpiecznik zostaje.</span>
        </h2>
        <ActionLink
          href={android ? release.url : '#pobierz'}
          download={android ? release.fileName : undefined}
          size="xl"
          icon={<DS.Icon name="download" />}
        >
          Pobierz na Androida
        </ActionLink>
        <p className={s.micro}>Bezpłatnie. Bez konta. Nie zastępuje 112.</p>
      </div>
    </section>
  );
}
