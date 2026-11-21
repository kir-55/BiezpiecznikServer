// Answers shown in the Demo section. Every string below is copied from the app's own content files
// (repo `Bezpiecznik-night`): knowledge chunks in `content/knowledge/` and rescue cards in `app/assets/cards/`.
// Do not edit a text here without editing its source file. Nothing in this file is written for the landing.

export interface DemoSource { docShort: string; page: string }
export interface DemoItem { text: string; source?: DemoSource }
export interface DemoPanel { kind: 'steps' | 'bullets'; title: string; items: DemoItem[] }
export interface DemoAnswer {
  id: string;
  /** Chip label. The app sends it as the user's message (app/lib/czat/ui/quick_actions.dart). */
  label: string;
  /** DS icon name (QuickActions defaults in 08-design-system/components/bundle.js). */
  icon: string;
  panels: DemoPanel[];
  /** Shown when the panel lists only part of the cited page. */
  cut?: { shown: number; total: number; page: string };
  /** Rescue card: the app shows the 112 panel first, then the CPR instructor. No waiting for the model. */
  cpr?: { variantLabel: string; rate: number; ratio: string; source: DemoSource; verify: boolean };
}

// doc_short + page_label from the front matter of the chunk files named below.
const RCB_33: DemoSource = { docShort: 'Poradnik RCB 2025', page: '33' };
const RCB_29: DemoSource = { docShort: 'Poradnik RCB 2025', page: '29' };
const RCB_25: DemoSource = { docShort: 'Poradnik RCB 2025', page: '25' };

export const DEMO_ANSWERS: DemoAnswer[] = [
  {
    id: 'rko',
    label: 'Ktoś nie oddycha',
    icon: 'heart-pulse',
    panels: [],
    // app/assets/cards/rko.json, panel "cpr": variants[0].label, rate_bpm, compressions:breaths, verify.
    // Source record erc-2025-bls-algorytmy-s3-f112 in app/assets/cards/sources.json (doc_short, page_label).
    cpr: { variantLabel: 'Dorosły', rate: 110, ratio: '30:2', source: { docShort: 'ERC 2025, BLS krok po kroku', page: '3' }, verify: true },
  },
  {
    id: 'blackout',
    label: 'Brak prądu',
    icon: 'zap',
    panels: [
      {
        kind: 'steps',
        // content/knowledge/rcb-poradnik-2025/rcb-poradnik-2025-s33-f1.md (verify: true), list "W czasie przerwy w dostawie prądu".
        title: 'W czasie przerwy w dostawie prądu',
        items: [
          { text: 'Oszczędzaj ciepło, zbierz domowników w jednym pokoju.', source: RCB_33 },
          { text: 'Ogranicz otwieranie lodówki i zamrażarki. Dłużej utrzymają niską temperaturę.' },
          { text: 'Odłącz wszystkie urządzenia elektryczne od zasilania.' },
        ],
      },
    ],
  },
  {
    id: 'alarm',
    label: 'Alarm / schron',
    icon: 'siren',
    panels: [
      {
        kind: 'bullets',
        // content/knowledge/rcb-poradnik-2025/rcb-poradnik-2025-s29-f1.md (verify: true). All three list items.
        title: 'Schronienia',
        items: [
          { text: 'Jeśli nie możesz ukryć się w oznaczonym miejscu schronienia, zostań w domu. Bądź z dala od okien, przy ścianach nośnych, w centralnych pomieszczeniach.', source: RCB_29 },
          { text: 'Jeśli jesteś poza domem, szukaj miejsc, które zapewniają przynajmniej minimum ochrony. Są to najniższe kondygnacje budynków, w tym piwnice, garaże podziemne, tunele i przejścia podziemne.' },
          { text: 'Nawet zwykłe zagłębienia terenu zapewniają lepszą ochronę niż przebywanie na otwartej przestrzeni.' },
        ],
      },
    ],
  },
  {
    id: 'evac',
    label: 'Ewakuacja',
    icon: 'footprints',
    panels: [
      {
        kind: 'steps',
        // content/knowledge/rcb-poradnik-2025/rcb-poradnik-2025-s25-f1.md (verify: true). First 4 of the 9 list items, in order.
        title: 'Ewakuacja',
        items: [
          { text: 'Zamknij okna i dopływ wody. Wyłącz urządzenia elektryczne i gazowe. Wygaś wszystkie źródła ognia (piec, kominek, kuchenka).', source: RCB_25 },
          { text: 'Ubierz się stosownie do warunków pogodowych.' },
          { text: 'Upewnij się, że dzieci mają przy sobie dane kontaktowe opiekuna oraz informacje medyczne.' },
          { text: 'Zabierz plecak ewakuacyjny.' },
        ],
      },
    ],
    cut: { shown: 4, total: 9, page: '25' },
  },
];

/** Answer rendered in the prerendered HTML (README: "Bez JS: pierwsza odpowiedź (Brak prądu)"). */
export const DEFAULT_DEMO_ID = 'blackout';
