# Panel 1 · Panel boczny

`SidePanel`. Wysuwa się z lewej strony nad [czatem](ekran-1-czat.md). Elementy globalne: [README](README.md#elementy-globalne).

## Cel

Przełączanie między rozmowami, nowy czat i wejście do ustawień.

## Wejście / wyjście

| Wejście | |
|---|---|
| `≡` na wyspie w E1 | Panel wysuwa się z lewej |
| Przesunięcie palcem od lewej krawędzi w E1 | To samo |

| Wyjście | Dokąd |
|---|---|
| „Nowy czat” | E1, nowy pusty czat, panel się zamyka |
| Czat z listy | E1 z tym czatem, panel się zamyka |
| `⚙` Ustawienia | E3 (panel zamyka się pod spodem) |
| Dotknięcie przyciemnionego tła, przesunięcie w lewo, systemowy Wstecz | Zamknięcie panelu, E1 bez zmian |
| SOS | P2 nad panelem |

## Układ

```
┌──────────────────────────────┐
│ [B+]                  │░(SOS)│
│                       │░░░░░░│
│ ⊕  Nowy czat          │░░░░░░│
│                       │░░░░░░│
│ Dziś                  │░░░░░░│
│▒ Ktoś nie oddycha▒▒▒▒▒│░░░░░░│
│ Blackout, niemowlę,…  │░░░░░░│
│ Wczoraj               │░░░░░░│
│ Co zabrać do schronu? │░░░░░░│
│ 18 lis                │░░░░░░│
│ Plan 72 h             │░░░░░░│
│                       │░░░░░░│
│ Rozmowy są zapisane   │░░░░░░│
│ tylko na tym telefonie│░░░░░░│
│ ⚙  Ustawienia         │░░░░░░│
└──────────────────────────────┘
```

`░` przyciemnione tło (czat pod spodem). `▒` bieżący czat (zaznaczony tłem wiersza). `[B+]` logo (sam znak). Bez ramek i separatorów.

Układ jak w panelu ChatGPT: od góry logo, wiersz „Nowy czat”, sekcje z listą czatów, na dole notka i wiersz „Ustawienia”.

## Elementy

| Element | Zachowanie |
|---|---|
| Panel | Szerokość 85% ekranu, maks. 360 dp. Wysuwa się z lewej (bez animacji przy ograniczeniu ruchu). Bez ramek. SOS zostaje widoczny nad panelem i tłem |
| Logo | Na górze, sam znak B+ (bez nazwy), 36 px. Bez akcji po dotknięciu |
| „Nowy czat” | Wiersz z ikoną (`⊕`), wysokość 44 px, pod logo. Tworzy nowy pusty czat i zamyka panel. Gdy bieżący czat jest już pusty: tylko zamyka panel (nie tworzy drugiego pustego) |
| Lista czatów | Od najnowszego według `updated_at`. Sekcje: „Dziś”, „Wczoraj”, potem data („18 lis”). Wiersz: sam tytuł w jednej linii z „…” (bez godziny), wysokość 44 px, bez ramek i separatorów. Bieżący czat wyróżniony tłem wiersza. Lista wirtualizowana |
| Dotknięcie czatu | Otwiera czat w E1, panel się zamyka |
| Przytrzymanie czatu | Dialog aplikacji (nie systemowy, żeby nie zasłonił SOS): „Usunąć czat?” → „Usuń” / „Anuluj”. Usunięcie jest trwałe |
| Usunięcie bieżącego czatu | Po usunięciu E1 pokazuje nowy pusty czat |
| Usunięcie czatu z działającym RKO | Zablokowane: toast „Najpierw zakończ RKO.” |
| Notka o prywatności | Stała, nad przyciskiem ustawień |
| `⚙` Ustawienia | Wiersz na dole panelu, wysokość 44 px, pod notką. Otwiera E3 |
| Przyciemnione tło | Dotknięcie zamyka panel |

Pusty bieżący czat nie występuje na liście (nie jest zapisany).

## Stany

| Stan | Zachowanie |
|---|---|
| Pusty (brak zapisanych czatów) | Zamiast listy: „Brak zapisanych rozmów.” |
| Ładowanie listy | Lista z lokalnej bazy, bez wskaźnika (czas < 100 ms). Przy dłuższym ładowaniu szkielet trzech wierszy |
| AI generuje w bieżącym czacie | Bez zmian. Przejście do innego czatu przerywa generowanie (status `stopped`) |
| Tryb bez AI, offline, brak GPS, niska bateria | Nie dotyczy (panel nie zmienia się) |
| Błąd odczytu bazy | „Nie mogę wczytać rozmów.” „Nowy czat” i ustawienia działają |
| Błąd usuwania | Toast „Nie udało się usunąć czatu.” Czat zostaje na liście |

## Teksty

| Miejsce | Tekst |
|---|---|
| Przycisk | Nowy czat |
| Sekcje | Dziś · Wczoraj · {d} {mies. skrót}, np. 18 lis |
| Pusta lista | Brak zapisanych rozmów. |
| Notka | Rozmowy są zapisane tylko na tym telefonie. |
| Przycisk ustawień | Ustawienia |
| Dialog usuwania: tytuł | Usunąć czat? |
| Dialog usuwania: treść | „{tytuł}” zniknie z telefonu na zawsze. |
| Dialog usuwania: przyciski | Usuń · Anuluj |
| Toast RKO | Najpierw zakończ RKO. |
| Błąd odczytu | Nie mogę wczytać rozmów. |
| Błąd usuwania | Nie udało się usunąć czatu. |
| Etykieta czytnika: panel | Lista rozmów |
| Etykieta czytnika: wiersz | {tytuł}. Przytrzymaj, aby usunąć. |

## Kryteria akceptacji

- [ ] Panel ma od góry: logo (sam znak, 36 px), wiersz „Nowy czat” z ikoną, sekcje Dziś / Wczoraj / data, notkę i wiersz „Ustawienia”; wiersze mają 44 px, tytuł bez godziny, bez ramek; bieżący czat jest zaznaczony tłem.
- [ ] `≡` na wyspie i przesunięcie od lewej krawędzi otwierają panel; dotknięcie tła, przesunięcie w lewo i systemowy Wstecz go zamykają.
- [ ] SOS jest widoczny i działa przy otwartym panelu.
- [ ] Czat z nową wiadomością przesuwa się na górę listy.
- [ ] Pusty bieżący czat nie jest na liście; „Nowy czat” przy pustym bieżącym czacie nie tworzy drugiego.
- [ ] Przytrzymanie czatu pokazuje dialog; „Usuń” usuwa czat trwale (nie wraca po ponownym uruchomieniu).
- [ ] Usunięcie bieżącego czatu zostawia w E1 nowy pusty czat.
- [ ] Czatu z działającym RKO nie da się usunąć.
- [ ] `⚙` otwiera Ustawienia.
- [ ] Lista 200 czatów przewija się płynnie.

## Powiązane funkcje

- [Czat z Bezpiecznikiem](../02-funkcje/01-czat/czat.md)
- [Ekran 3 · Ustawienia](ekran-3-ustawienia.md)
- [Prywatność i bezpieczeństwo](../05-technologia/prywatnosc-i-bezpieczenstwo.md)
