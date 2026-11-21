# StepsPanel

Szablon `steps`: numerowane kroki do wykonania po kolei, w karcie `PanelCard`.

- **Bieżący krok** = pierwszy niezrobiony: tło `overlay-hover`, pasek `signal` po lewej, numer na ochrze, tytuł pogrubiony.
- **Zrobiony**: numer zmienia się w ✓ na `verified-tint`, tekst przygasa (`ink-300`). Odhaczenie checkboxem po prawej (pole dotyku 44 px). Wszystko zrobione → nagłówek „Wszystko zrobione” z ✓.
- Każdy krok ma własny `SourceChip` pod tekstem (`▸ {doc_short}, s. {page_label}`) — dotknięcie otwiera podgląd PDF.
- `variants` rysuje `Segmented` nad listą (maks. 3 opcje); zmiana przełącza wszystkie szablony wiadomości.
- `readAloud` dodaje „Czytaj na głos” / „Zatrzymaj czytanie” na dole karty (karty ratunkowe).
- Krok: jeden czasownik, jedna czynność, do 120 znaków. Numer koła ma wysokość linii tytułu (28 px), więc jest wyrównany do pierwszej linii.

`done`, `onDoneChange` — tryb kontrolowany (stan zapisany w wiadomości).
