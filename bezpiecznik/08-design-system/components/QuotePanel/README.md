# QuotePanel

Szablon `quote` i podgląd PDF: oryginalny fragment źródła bez wychodzenia z czatu.

- Okno ze stroną na `paper` (jedyna jasna powierzchnia w ciemnym motywie — to dokument, nie interfejs), maks. 200 px, z wygaszeniem na dole.
- Cytowany fragment zakreślony `highlight` (ochra 40%) i podkreślony `signal-press`. W aplikacji: obraz strony + prostokąty `rects` (`imageSrc`, `rects`); w podglądzie: tryb tekstowy (`before`, `highlight`, `after`).
- „Powiększ” albo dotknięcie okna → podgląd PDF na pełnym ekranie (`full`).
- Okno nie przechwytuje gestów — przewijanie czatu działa normalnie.
- `missing` — brak pliku PDF: sam tekst i „Nie mogę otworzyć pliku PDF. Pokazuję tekst fragmentu.”
