// The design-system bundle is a classic script that reads window.React.
// This module must be imported before the bundle (see ds.ts). It also runs during prerender in Node.
import React from 'react';

const g = globalThis as unknown as { window?: Record<string, unknown> };
if (!g.window) g.window = globalThis as unknown as Record<string, unknown>;
// On the server (prerender) useLayoutEffect only warns; the bundle reads it once at load, so swap in useEffect there.
g.window.React = typeof document === 'undefined' ? { ...React, useLayoutEffect: React.useEffect } : React;
