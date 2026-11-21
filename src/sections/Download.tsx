import { useRef, useState } from 'react';
import { DS } from '../ds';
import { Section } from '../components/Section';
import { ActionLink } from '../components/ActionLink';
import { QrCode } from '../components/QrCode';
import { usePlatform } from '../components/usePlatform';
import { release, formatMB, SHORT_DOWNLOAD_URL } from '../content/release';
import s from './Download.module.css';

const { Button, Icon, ListRow, Notice } = DS;

// UTC so the prerendered date and the hydrated one never differ.
const releaseDate = new Date(release.builtAt).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const facts = [
  ['Wersja', release.version],
  ['Wydana', releaseDate],
  ['Rozmiar', formatMB(release.sizeBytes)],
  ['System', `${release.minAndroid} lub nowszy`],
  ['Procesor', '64-bitowy (arm64)'],
];

export function Download() {
  const platform = usePlatform();
  return (
    <Section
      id="pobierz"
      tag="Pobierz"
      title={<>Pobierz Bezpiecznika <span className="muted">na Androida.</span></>}
      lead="Bezpłatnie i bez konta. Instalujesz raz, potem działa bez internetu."
    >
      <div className={`${s.cards} ${platform === 'desktop' ? s.desktop : ''}`}>
        <article className={s.card} aria-labelledby="pobierz-android">
          <header>
            <h3 id="pobierz-android" className={s.title}>Android</h3>
            <p className={s.line}>Jeden plik APK, mapa offline w środku.</p>
          </header>

          <div className={s.facts}>
            {facts.map(([label, value]) => <ListRow key={label} label={label} value={<span className="tabular">{value}</span>} />)}
          </div>

          {platform === 'ios' ? (
            <Notice title="Na razie tylko Android.">Wersja na iPhone’a jest w planach.</Notice>
          ) : (
            <div className={s.cta}>
              <ActionLink href={release.url} download={release.fileName} size="xl" fullWidth icon={<Icon name="download" size={20} />}>
                Pobierz APK
              </ActionLink>
              {platform === 'android' && <p className={s.here}>Pobierasz na tym telefonie. Potem otwórz plik z powiadomienia.</p>}
            </div>
          )}

          <Checksum />
        </article>

        {platform !== 'android' && (
          <article id="pobierz-qr" className={`${s.card} ${s.qrCard}`} aria-labelledby="pobierz-komputer">
            <header>
              <h3 id="pobierz-komputer" className={s.title}>{platform === 'ios' ? 'Masz też telefon z Androidem?' : 'Na komputerze?'}</h3>
              <p className={s.line}>{platform === 'ios' ? 'Otwórz na nim tę stronę.' : 'Otwórz tę stronę na telefonie z Androidem.'}</p>
            </header>
            <QrCode label={`Kod QR z adresem ${SHORT_DOWNLOAD_URL}`} />
            <p className={s.scan}>
              Zeskanuj aparatem telefonu albo wpisz adres:
              <strong className={s.url}>{SHORT_DOWNLOAD_URL}</strong>
            </p>
          </article>
        )}
      </div>

      <aside className={s.good} aria-labelledby="pobierz-wiedziec">
        <h3 id="pobierz-wiedziec" className={s.goodTitle}>Dobrze wiedzieć</h3>
        <div className={s.goodGrid}>
          <div className={s.goodItem}>
            <Icon name="wifi" size={22} />
            <p><strong>Pobierz przez Wi-Fi.</strong> Bezpiecznik trzyma w telefonie wszystko, czego potrzebuje bez internetu: poradniki, mapę i asystenta. To duży plik.</p>
          </div>
          <div className={s.goodItem}>
            <Icon name="smartphone" size={22} />
            <p><strong>Zostaw około 3 GB wolnego miejsca.</strong> Dzięki temu Bezpiecznik zadziała w trybie samolotowym, gdy sieć zniknie.</p>
          </div>
        </div>
      </aside>
    </Section>
  );
}

function Checksum() {
  const hashRef = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<'idle' | 'copied' | 'selected'>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(release.sha256);
      setState('copied');
    } catch {
      // No clipboard access (plain http, old browser): select the hash so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(hashRef.current!);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      setState('selected');
    }
    window.setTimeout(() => setState('idle'), 2500);
  };

  return (
    <details className={s.sum}>
      <summary className={s.sumHead}>
        Suma kontrolna SHA-256
        <Icon name="chevron-down" size={18} className={s.chev} />
      </summary>
      <div className={s.sumBody}>
        <p className={s.sumHint}>Porównaj ją z sumą pobranego pliku, jeśli chcesz mieć pewność, że nikt go nie zmienił.</p>
        <p id="sha256" ref={hashRef} className={s.hash}>{release.sha256}</p>
        <Button size="lg" onClick={copy} icon={<Icon name={state === 'copied' ? 'check' : 'copy'} size={18} />}>
          {state === 'copied' ? 'Skopiowano' : state === 'selected' ? 'Zaznaczono, skopiuj ręcznie' : 'Kopiuj'}
        </Button>
        <span className="visually-hidden" aria-live="polite">{state === 'copied' ? 'Suma skopiowana do schowka.' : ''}</span>
      </div>
    </details>
  );
}
