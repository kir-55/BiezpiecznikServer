import { useEffect, useState } from 'react';
import s from './RotatingWord.module.css';

/**
 * A word slot that steps through `words` once and stays on the last one (README "Hasło": no loop).
 * - The slot is as wide as the longest word (all words share one grid cell), so the line never jumps.
 * - The old word fades out before the new one fades in (300 ms in total); two words are never visible together.
 * - Prerender, no-JS and prefers-reduced-motion show words[0]. Make the first and last word the same.
 * - Screen readers get the last word once; the animated words are aria-hidden.
 * Put punctuation inside the words ("życie."), otherwise it floats away from the shorter ones.
 */
export function RotatingWord(p: { words: string[]; holdMs?: number; className?: string }) {
  const [i, setI] = useState(0);
  const last = p.words.length - 1;

  useEffect(() => {
    if (i >= last || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI(i + 1), p.holdMs ?? 2400);
    return () => clearTimeout(t);
  }, [i, last, p.holdMs]);

  return (
    <span className={`${s.slot} ${p.className ?? ''}`}>
      <span className="visually-hidden">{p.words[last]}</span>
      {p.words.map((w, k) => (
        <span key={k} aria-hidden="true" className={`${s.word} ${k === i ? s.on : k < i ? s.past : ''}`}>{w}</span>
      ))}
    </span>
  );
}
