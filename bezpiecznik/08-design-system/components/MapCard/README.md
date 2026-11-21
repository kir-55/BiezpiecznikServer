# MapCard

Szablon `map`: najbliższy punkt (schron, szpital, straż, woda, apteka) z odległością, czasem dojścia i kierunkiem, wejście do Mapy.

- Mini mapa jest nieinteraktywna (bez gestów, nie przechwytuje przewijania). W aplikacji rysuje ją ten sam silnik MapLibre co ekran Mapa; tu ilustracja w kolorach stylu mapy: ląd `bg-200`, drogi `line-150`, woda `info` 14%, linia prosta `signal` kropkowana, ty = `info`, cel = znacznik rodzaju.
- Strzałka obrócona o kierunek do celu względem kierunku patrzenia.
- **Prowadź** (`primary`, 44 px) → Mapa w trybie trasy. Dotknięcie mini mapy → Mapa wyśrodkowana na punkcie.
- Stany: `confirmed: false` (pusty znacznik + „niepotwierdzony”), `straightLine` („w linii prostej · ok.”), `lastKnown` („Od ostatniej pozycji (HH:MM)”), `staleMonths`, `noPosition` („Nie znam twojej pozycji.” + „Pokaż na mapie” zamiast „Prowadź”).
- Źródło punktu to chip neutralny (szary, tarcza) — punkt nie ma PDF, więc nie jest zielony jak źródło porady.
