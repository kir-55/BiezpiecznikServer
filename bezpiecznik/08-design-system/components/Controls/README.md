# Controls

Kontrolki formularzy i list. Każda ma pole dotyku min. 44–48 px, nawet gdy wygląda na mniejszą (checkbox 24 px).

- `Checkbox` — odhaczanie kroków i listy plecaka. Zaznaczony: tło `action`.
- `Switch` — ustawienia i warstwy mapy. Włączony: tor `action`, jak monochromatyczne przełączniki ChatGPT.
- `Segmented` — warianty (Dorosły / Dziecko / Niemowlę), przerwa sygnału, rozmiar tekstu. `allowEmpty` daje trójstanowe Tak / Nie z profilu (nic nie wybrane = brak danych).
- `ChoiceChips` — wybór jedno- lub wielokrotny w profilu. Wybrany: wypełniony `action`.
- `TextField` — 48 px, tekst 16 px (mniej powoduje zoom na iOS). Błąd w kolorze `danger` pod polem.
- `ListRow` / `SectionHeader` — wiersze ustawień, profilu, warstw. `tone="danger"` dla akcji niszczących.
- `ProgressBar` — pobieranie paczek, postęp profilu.
