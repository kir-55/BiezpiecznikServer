// Single entry point to the Bezpiecznik design system (bezpiecznik/08-design-system).
// Import components from here: `import { DS } from '../ds'; const { Button, SourceChip } = DS;`
import './ds-global';
import '@ds/components/bundle.js';
import '@ds/tokens.css';
import '@ds/components/bundle.css';
import type * as Types from '@ds/components/index';

export const DS = (globalThis as unknown as { window: { Bezpiecznik: typeof Types } }).window.Bezpiecznik;
