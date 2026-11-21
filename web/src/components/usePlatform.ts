import { useEffect, useState } from 'react';

export type Platform = 'unknown' | 'android' | 'ios' | 'desktop';

/** 'unknown' during prerender and the first client render (so hydration matches), then the detected platform. */
export function usePlatform(): Platform {
  const [p, setP] = useState<Platform>('unknown');
  useEffect(() => {
    const ua = navigator.userAgent;
    setP(/Android/i.test(ua) ? 'android' : /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'ios' : 'desktop');
  }, []);
  return p;
}
