# Instruktor RKO

**Priorytet:** P0 · **Gdzie:** czat (template `cpr`, przypięty nad polem wiadomości na czas działania) · **Offline:** tak

## Co robi

Prowadzi resuscytację krok po kroku, tak żeby ratownik mógł patrzeć na poszkodowanego, a nie na telefon.

## Funkcje

- **Wybór wariantu:** dorosły, dziecko, niemowlę. Technika, głębokość i proporcje uciśnięć do oddechów według wytycznych PRC/ERC 2025.
- **Metronom:** tempo 100–120 uciśnięć na minutę, dźwięk i wibracja.
- **Licznik:** liczy uciśnięcia i oddechy w cyklu dla wybranego wariantu.
- **Głos:** komendy czytane na głos („Uciskaj”, „Dwa oddechy”, „Sprawdź AED”).
- **Zmiana ratownika:** przypomnienie co 2 minuty.
- **AED:** przypomnienie, żeby ktoś przyniósł defibrylator, i krótka instrukcja jego użycia.
- **Przypięcie:** panel zostaje nad polem wiadomości, aż użytkownik zakończy RKO.
- **Ekran nie gaśnie** przez cały czas trwania instruktora.
- **Działa w tle:** metronom i głos grają dalej, gdy aplikacja jest w tle, np. podczas rozmowy z 112 na głośniku (decyzja z 2026-11-21). Android: usługa pierwszoplanowa z powiadomieniem „RKO trwa”; iOS: tryb audio w tle. Etap: po MVP, pierwszy w kolejce ([zakres MVP](../../07-hackathon/zakres-mvp.md)).
- **Stoper:** czas od rozpoczęcia, przydatny dla zespołu ratownictwa.

## Wygląd w czacie

```
┌──────────────────────────────┐
│ ...wiadomości czatu...       │
├──────────────────────────────┤
│ RKO · Dorosły        [ 112 ] │
│   ● ● ● ●  UCISKAJ  17 / 30  │
│ Czas 03:42    Zmiana za 0:18 │
│ [ Pauza ]        [ Zakończ ] │
├──────────────────────────────┤
│ [ Napisz wiadomość...      ] │
└──────────────────────────────┘
```

## Źródło

Wytyczne resuscytacji Polskiej Rady Resuscytacji i ERC 2025. Treść sprawdzona przez ratownika medycznego lub instruktora PRC.
