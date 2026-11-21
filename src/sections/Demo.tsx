import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { DS } from '../ds';
import { ActionLink } from '../components/ActionLink';
import { Section } from '../components/Section';
import { Tag } from '../components/Tag';
import { DEMO_ANSWERS, DEFAULT_DEMO_ID, type DemoAnswer } from '../content/demo';
import s from './Demo.module.css';

/** Time the "Szukam w źródłach…" status stays before the answer (motion.md, "Sekwencja odpowiedzi", step 2). */
const THINK_MS = 600;
const NOTE_ASK = 'Pełne odpowiedzi działają w aplikacji, bez internetu.';
const NOTE_CONTROL = 'Ta funkcja działa w aplikacji.';

type Note = { at: 'composer' | 'chat'; text: string } | null;

/**
 * "Do weryfikacji" marker of the app (app/lib/ratunek/cards/verify_badge.dart): shown on content with `verify: true`
 * that no paramedic has signed off yet. The DS bundle has no such component, so this follows the app widget:
 * signal text and border on signal-tint, radius-sm, warning icon.
 */
export function VerifyBadge() {
  return (
    <span className={s.verify}>
      <DS.Icon name="triangle-alert" size={16} />
      Do weryfikacji
      <span className="visually-hidden">. Treść nie została jeszcze sprawdzona przez ratownika.</span>
    </span>
  );
}

function Answer(p: { a: DemoAnswer; animate: boolean; onControl: () => void }) {
  const { a } = p;
  if (a.cpr) {
    // Life threat: the 112 panel comes first, then the rescue card. Order as in the app (screenshots/qa-0900/10-rko.png).
    return (
      <DS.Message animate={p.animate}>
        <div className={s.cardHead}>
          <DS.AnswerLabel origin="rescue_card" />
          {a.cpr.verify && <VerifyBadge />}
        </div>
        {/* The DS CallPanel renders a real tel:112 link. On a landing page a curious tap must never dial 112. */}
        {/* CSS (.noDial) blocks taps from the first paint, before JS loads; the handler covers keyboard after hydration. */}
        <div
          className={s.noDial}
          onClickCapture={(e) => {
            const a = (e.target as HTMLElement).closest('a');
            if (a && /^(tel|sms):/i.test(a.getAttribute('href') ?? '')) e.preventDefault();
            p.onControl?.();
          }}
        >
          <DS.CallPanel variant="inline" onEditContacts={p.onControl} />
        </div>
        <DS.CprCard state="idle" variantLabel={a.cpr.variantLabel} rate={a.cpr.rate} ratio={a.cpr.ratio} source={a.cpr.source} onStart={p.onControl} />
        <div className="bz-msg__foot">Ta instrukcja nie zastępuje połączenia z 112.</div>
      </DS.Message>
    );
  }
  let before = 0;
  return (
    <DS.Message animate={p.animate}>
      {a.panels.map((panel) => {
        const style = { '--o': before } as CSSProperties;
        before += panel.items.length;
        return (
          <div key={panel.title} className={s.panel} style={style}>
            {panel.kind === 'steps'
              ? <DS.StepsPanel title={panel.title} items={panel.items} />
              : <DS.BulletsPanel title={panel.title} items={panel.items} />}
          </div>
        );
      })}
      {a.cut && <p className={s.cut}>Pokazane {a.cut.shown} z {a.cut.total} kroków ze strony {a.cut.page}.</p>}
    </DS.Message>
  );
}

function AppNote(p: { text: string }) {
  return (
    <DS.Notice className={`${s.note} bz-anim-enter`} action={<ActionLink href="#pobierz" variant="secondary" size="md">Pobierz</ActionLink>}>
      {p.text}
    </DS.Notice>
  );
}

export function Demo() {
  const [id, setId] = useState(DEFAULT_DEMO_ID);
  // false = the prerendered answer, shown without any entry animation.
  const [played, setPlayed] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [note, setNote] = useState<Note>(null);
  // While "Szukam w źródłach…" is shown the chat keeps its previous height, so the page below moves once, not twice.
  const win = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState<number>();
  const answer = DEMO_ANSWERS.find((a) => a.id === id)!;
  const items = answer.panels.reduce((n, panel) => n + panel.items.length, 0);

  useEffect(() => {
    if (!thinking) return;
    const t = setTimeout(() => { setThinking(false); setHold(undefined); }, THINK_MS);
    return () => clearTimeout(t);
  }, [thinking, id]);

  // ChoiceChips sends null when the active chip is tapped again: keep the current answer.
  function select(next: string | null) {
    const a = DEMO_ANSWERS.find((x) => x.id === next);
    if (!a || a.id === id) return;
    setId(a.id);
    setPlayed(true);
    setThinking(!a.cpr); // a rescue card never waits for the model
    setHold(a.cpr ? undefined : win.current?.offsetHeight);
    setNote(null);
  }

  return (
    <Section id="demo">
      <div className={s.layout}>
        <div className={s.side}>
          <header className={s.head}>
            <Tag>Zapytaj</Tag>
            <h2 className={s.title}>Opisz, co się dzieje. <span className="muted">Bezpiecznik powie, co robić.</span></h2>
          </header>
          <div className={s.ask}>
            {/* Nothing typed here is sent anywhere: submit only shows the note. */}
            <DS.Composer placeholder="Opisz sytuację…" enterToSend onSubmit={() => setNote({ at: 'composer', text: NOTE_ASK })} />
            <DS.ChoiceChips
              className={s.chips}
              aria-label="Przykładowe sytuacje"
              value={id}
              onChange={select}
              options={DEMO_ANSWERS.map((a) => ({ id: a.id, label: <><DS.Icon name={a.icon} size={16} />{a.label}</> }))}
            />
            {note?.at === 'composer' && <AppNote text={note.text} />}
          </div>
        </div>

        <div className={s.main}>
          <div ref={win} className={s.window} style={hold ? { minHeight: hold } : undefined} aria-live="polite">
            <div key={id} className={`${s.chat} ${played ? s.played : ''}`} style={{ '--n': items } as CSSProperties}>
              <DS.Message role="user" animate={played}>{answer.label}</DS.Message>
              {thinking
                ? <DS.Thinking />
                : <Answer a={answer} animate={played} onControl={() => setNote({ at: 'chat', text: NOTE_CONTROL })} />}
            </div>
          </div>
          {note?.at === 'chat' && <AppNote text={note.text} />}
          <p className={s.fine}>Odpowiedzi z treści poradników w aplikacji. Treść czeka na weryfikację ekspertów.</p>
        </div>
      </div>
    </Section>
  );
}
