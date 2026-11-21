# Czat z Bezpiecznikiem

**Priorytet:** P0 · **Gdzie:** Ekran 1 Czat (ekran główny, [opis ekranu](../../03-ekrany/ekran-1-czat.md)) · **Offline:** tak

## Co robi

Użytkownik opisuje sytuację własnymi słowami. Bezpiecznik odpowiada krótkimi krokami ułożonymi w [panele](panele.md), a przy każdym kroku podaje źródło i stronę. Odpowiedź uwzględnia [profil domu](../04-profil-i-plan/profil-domu.md) (kontekst dla AI), pozycję GPS, kierunek z kompasu i poziom baterii.

## Ekran startowy

- Pole wiadomości na dole ekranu.
- Wiele czatów: lista w panelu bocznym, nowy czat otwiera się pusty.
- Szybkie przyciski na pustym nowym czacie, dla osób, które w stresie nie napiszą zdania: **Ktoś nie oddycha**, **Brak prądu**, **Alarm / schron**, **Ewakuacja**.
- Historia rozmowy zapisana tylko na telefonie.

## Przepływ odpowiedzi

1. **Wykrycie zagrożenia życia.** Lista fraz z dopasowaniem przybliżonym (łapie literówki, np. „nie oddyhca”) od razu wstawia do czatu [kartę ratunkową](../02-pierwsza-pomoc/karty-ratunkowe.md) (z przyciskami 112). Model AI nie bierze w tym udziału.
2. **Wyszukiwanie w bazie wiedzy.** MVP: pełnotekstowe (FTS5, bm25). Po MVP: dodatkowo wektorowe (hybrydowe). Wynik to kilka fragmentów, każdy z dokumentem i stroną.
3. **Próg pewności.** Gdy żaden fragment nie pasuje wystarczająco, aplikacja odmawia jednym z dwóch tekstów: „brak w źródłach” („Nie wiem. Moje źródła tego nie opisują. Zapytaj lekarza, farmaceutę albo właściwą instytucję.”) albo „poza tematem” („Pomagam tylko w sytuacjach kryzysowych i bezpieczeństwie. Tego nie opisują moje źródła.”). Reguła wyboru: [odmowa](odpowiedzi-tylko-ze-zrodel.md#odmowa).
4. **Odpowiedź modelu.** Lokalny model dostaje tylko znalezione fragmenty i kontekst użytkownika. Zwraca panele, a każdy krok wskazuje fragment, z którego pochodzi.
5. **Sprawdzenie odpowiedzi.** Kroki bez pokrycia w źródle są usuwane. Szczegóły: [odpowiedzi tylko ze źródeł](odpowiedzi-tylko-ze-zrodel.md).
6. **Wyświetlenie.** Panele z chipem źródła, np. „Poradnik bezpieczeństwa, s. 14”. Dotknięcie chipu otwiera podgląd PDF na tej stronie z podświetlonym fragmentem (szablon `quote`, patrz [szablony czatu](../../03-ekrany/szablony-czatu.md)).

## Kontekst przekazywany asystentowi

| Dane | Skąd | Do czego |
|---|---|---|
| Domownicy, leki, zwierzęta, mieszkanie | Profil domu | Dopasowanie kroków |
| Pozycja | GPS | Najbliższe punkty, adres |
| Kierunek | Kompas | „Idź na północny wschód” |
| Bateria | System | Krótsze odpowiedzi i tryb bez AI przy niskim poziomie |
| Pora dnia | System | Np. dostępność punktów całodobowych |

## Tryb bez AI

Gdy telefon jest za słaby, bateria niska albo model się nie załaduje, czat działa jako wyszukiwarka: pokazuje pasujące fragmenty źródeł i karty ratunkowe, bez generowania tekstu.
