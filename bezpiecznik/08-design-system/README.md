# Bezpiecznik

Kryzysowy asystent offline. Gdy znika sieć, Bezpiecznik w trzech krokach mówi, co zrobić teraz — wyłącznie na podstawie oficjalnych źródeł (RCB, MON, MSWiA, PSP, Akademia Pożarnicza), z numerem strony. Gdy źródło nie ma odpowiedzi: „nie wiem, dzwoń 112”.

> **Status:** krok 1 z kilku — kolory i krój pisma, pod logo. Spacing, radius, ikony i komponenty dojdą w kolejnych krokach.

## Idea wizualna: spokój w ciemnym pokoju

Interfejs to ciemna, cicha rozmowa — jak ChatGPT: grafitowe tło, jasny tekst, jasny przycisk główny (`action`), prawie zero ozdobników. W kryzysie aplikacja ma uspokajać, nie podkręcać adrenaliny — dlatego wszystkie kolory są przygaszone. Akcent marki to stonowana ochra (`signal`) — „lampka w ciemnym pokoju”, używana oszczędnie: logo, focus, igła kompasu. Reszta kolorów to **sygnały o stałym znaczeniu**, nie dekoracja.

## Zasady koloru

| Token | Znaczy | Nigdy |
| --- | --- | --- |
| `action` | główna akcja — jasny przycisk, jeden na ekran | jako tło dużych powierzchni |
| `signal` | marka, focus, kierunek kompasu, aktywny krok | jako główny przycisk |
| `verified` | „to jest ze źródła oficjalnego” — chip cytatu, bezpieczny punkt | jako ogólny kolor sukcesu „zapisano” |
| `sos` | „model nie wie / zagrożenie życia — 112” | do błędów formularza i walidacji |
| `info` | mapa, trasa, pozycja GPS | jako przycisk akcji |

- **Tekst:** `ink-100` dla odpowiedzi, `ink-200` dla opisów, `ink-300` tylko na `bg-000`–`bg-200`.
- Na `action` tekst `on-action`, na `signal` tekst `signal-ink`, na `sos` tekst `on-sos`.
- **Rozróżnialność:** `signal` (jasna ochra) i `sos` (ciemna cegła) różnią się jasnością, nie tylko odcieniem.
- Bez gradientów, bez neonów, bez fioletu, bez nasyconych kolorów. Jeden kolor na raz.

## Typografia

**Atkinson Hyperlegible Next** — jeden krój do wszystkiego. Google Fonts, licencja OFL — pliki trzeba dołączyć do aplikacji lokalnie, bo działa offline. Liczby (czas, odległość, licznik RKO) tym samym krojem z cyframi tabelarycznymi (`font-variant-numeric: tabular-nums`), żeby się nie przesuwały. Bez kroju maszynowego (mono) — usunięty 21.11, wyglądał jak „AI slop”.

Dlaczego: krój zaprojektowany przez Braille Institute pod maksymalną rozróżnialność znaków (I/l/1, O/0) — dokładnie to, czego chcemy, gdy ktoś czyta instrukcję RKO z trzęsącymi się rękami. Pełne polskie znaki.

- `step` 20/28 bold — kroki „co zrobić teraz”.
- `chat` 17/26 — treść rozmowy (większa niż typowe 15–16 px: czytanie w stresie).
- `source` 13 — „Poradnik bezp., s. 14” w zielonym chipie.

## Głos

Krótko, w trybie rozkazującym, bez paniki i bez wykrzykników. „Wyłącz gaz. Zabierz leki z lodówki.” Zawsze ze źródłem. Gdy brak źródła — mówimy to wprost.

## Fonty offline

Pliki `.woff2` są w `fonts/` (wersja zmienna, wagi 200–800, zestawy latin + latin-ext z polskimi znakami, razem ~53 KB). W aplikacji ładuj je lokalnie, nigdy z Google Fonts — w trybie samolotowym zewnętrzny font się nie wczyta i telefon pokaże systemowy.

## Odstępy i zaokrąglenia

Siatka 4 px: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 24 · `space-6` 32 · `space-7` 48. Nie wymyślaj wartości pomiędzy.

Zaokrąglenia jak w ChatGPT: przyciski i chipy — pigułka (`radius-full`); dymek użytkownika i karty w czacie — `radius-lg` 18 px; composer — `radius-xl` 28 px; karty list — `radius-md` 12 px.

## Ikony

Lucide (licencja ISC), obrys 2, kwadrat 24 px; w przyciskach 20 px, w chipach 14–16 px. W kodzie używaj pakietu `lucide-react` (kolor dziedziczy z `currentColor`); pliki w grupie Icons to podgląd zestawu, którego używamy.

## Ruch

Krótko i cicho jak w ChatGPT: wejścia 200 ms z hamowaniem, panele 300 ms, bez odbić i migania. Tokeny `duration-*` / `ease-*`, klasy `bz-anim-*` — szczegóły w sekcji „Ruch”.

## Komponenty

`window.Bezpiecznik` (React 18, wzorzec dla Fluttera). Pełna mapa „ekran → komponenty” i odstępstwa od specyfikacji: sekcja **Mapa komponentów**. Makiety ekranów: grupa **Ekrany**.

- **Kontrolki:** `Button`, `Checkbox`, `Switch`, `Segmented`, `ChoiceChips`, `TextField`, `ProgressBar`, `ListRow`, `SectionHeader`, `Notice`, `Toast`, `Dialog`, `Sheet`.
- **Globalne:** `NavIsland`, `FloatingButton`, `SosButton`, `CprIndicator`.
- **Czat:** `Composer`, `Message`, `AnswerLabel`, `Thinking`, `QuickActions`, `JumpToLatest`, `SourceChip`, `NoSource`.
- **Szablony odpowiedzi:** `PanelCard`, `StepsPanel`, `BulletsPanel`, `QuotePanel`, `MapCard`, `CallPanel`, `SignalPanel`, `CprCard`, `CprPinned`, `AnimationPanel`.
- **Mapa:** `MapMarker`, `UserDot`, `DetailIndicator`, `PointSheet`, `NearestList`, `LayersSheet`, `RouteBanner`, `RouteBar`, `CompassView`.
- **Panele i formularze:** `ChatDrawer`, `StepHeader`, `QuestionStep`, `PackageRow`.

**Rodzaje odpowiedzi:**

| Sytuacja | Odpowiedź |
| --- | --- |
| Źródło ma odpowiedź | szablony treści (`StepsPanel`, `BulletsPanel`, `QuotePanel`), każdy element z `SourceChip` |
| Brak źródła, sprawa niekrytyczna | `NoSource` — spokojnie, z sugestią, gdzie szukać |
| Możliwe zagrożenie życia | `CallPanel` jako **pierwszy** szablon (dodaje go aplikacja, nie model) |

**Kolor `sos`:** pełne czerwone tło tylko dla SOS, ZADZWOŃ 112 i ramki wezwania pomocy / instruktora RKO. Błędy i akcje niszczące używają `danger` (tekst i ramka, bez wypełnienia).

**Elementy pływające** (wyspa, Wstecz, SOS, przyciski mapy): tło `bg-200`, ramka `line-150`, `shadow-float`, 16 px od krawędzi. SOS zawsze najwyżej.
