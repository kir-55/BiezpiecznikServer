# Overlays

Warstwy aplikacji. **Wszystkie leżą pod przyciskiem SOS** (kolejność warstw w specyfikacji), dlatego dialogi są aplikacyjne, a nie systemowe.

- `Notice` — `bar` (dyskretny pasek: brak GPS, brak punktów, kalibracja kompasu), `banner` (cienki baner trybu bez AI nad listą wiadomości), `warning` (ochra: „Nie zastępuje 112”, stare dane punktu), `error` (uszkodzona paczka, błąd odczytu). Opcjonalna akcja po prawej.
- `Toast` — zawsze na dole, nad polem wiadomości, nigdy w prawym górnym rogu. Opcjonalnie „Cofnij” (usunięty wpis profilu, 5 s).
- `Dialog` — potwierdzenia: „Usunąć czat?”, „Zakończyć RKO?”. `danger` daje czerwony przycisk potwierdzenia.
- `Sheet` — arkusz od dołu: karta punktu, warstwy, wybory w ustawieniach, panel SOS. Maks. 70% wysokości (P2: 92%), nigdy nie zasłania SOS, wyspy ani Wstecz.
