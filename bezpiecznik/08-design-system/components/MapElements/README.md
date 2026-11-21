# MapElements

`MapMarker`, `UserDot`, `DetailIndicator`.

- **Kolory znaczników** idą za znaczeniem z palety: miejsca schronienia (S, U, M) = `verified` (bezpieczne miejsce), woda = `info`, pozostałe (szpital, straż, apteka) = neutralne `ink-100`. Czerwień zostaje dla SOS. Litera albo ikona w kolorze tła, obwódka `bg-000`, żeby znacznik odcinał się od mapy.
- **Niepotwierdzony** (OSM): pusty w środku, przerywana szara obwódka, znaczek „?”. Nigdy nie dostaje pełnego symbolu schronu PSP.
- Grupa przy przybliżeniu < 12: koło z liczbą. Wybrany: powiększony 125% z poświatą. Cel dotyku min. 44 px.
- `UserDot`: kropka `info` z białą obwódką, wachlarz kierunku patrzenia, okrąg dokładności (gdy > 20 m). Bez fixu: szara kropka z wiekiem pozycji.
- `DetailIndicator`: ● Mapa szczegółowa / ○ Poza mapą szczegółową + **Pobierz**.

Styl mapy (MapLibre) w motywie ciemnym: ląd `bg-100`, budynki `bg-200`, drogi `line-150` / `line-100`, woda `info` ok. 13%, trasa `signal` 7 px.
