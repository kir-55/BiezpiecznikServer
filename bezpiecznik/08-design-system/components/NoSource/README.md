# NoSource

Spokojna odpowiedź, gdy pobrane źródła nie odpowiadają na pytanie, a sytuacja **nie jest krytyczna**. Model nie zgaduje i wskazuje, gdzie szukać dalej. Bez czerwieni i bez 112.

- Tło `bg-100`, ramka `line-150`, tytuł `ink-100`, ikona `book-open` w `ink-200`.
- `suggestion` to konkretne, bezpieczne miejsce: ulotka, farmaceuta, lekarz rodzinny, urząd gminy. Bez porad medycznych z pamięci modelu.
- To jest **domyślna** odpowiedź przy braku źródła. `Fallback112` tylko wtedy, gdy pytanie dotyczy zagrożenia życia lub zdrowia.

| Sytuacja | Komponent |
| --- | --- |
| Źródło ma odpowiedź | `Message` + `Steps` + `SourceChip` |
| Brak źródła, sprawa niekrytyczna („ile insulina wytrzyma poza lodówką?”) | `NoSource` |
| Zagrożenie życia (brak oddechu, nieprzytomność, silne krwawienie, pożar, zatrucie) | `Fallback112` — niezależnie od tego, czy źródło ma odpowiedź |
