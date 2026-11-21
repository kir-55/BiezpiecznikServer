# Źródła wiedzy

Bezpiecznik odpowiada wyłącznie na podstawie tych źródeł. Każde ma wydawcę, datę wydania i status licencji ([licencje](licencje.md)).

## Źródła

| Źródło | Wydawca | Zakres |
|---|---|---|
| Poradnik bezpieczeństwa (2025) | RCB, MON, MSWiA | Przygotowanie do kryzysu, sygnały alarmowe, schronienie, ewakuacja, plecak |
| „Nim nadejdzie dzień” | Akademia Pożarnicza | Postępowanie w sytuacjach kryzysowych |
| Procedury i materiały PSP | Państwowa Straż Pożarna | Pożar, powódź, silny wiatr, ewakuacja, plecak ewakuacyjny |
| Wytyczne resuscytacji 2025 | Polska Rada Resuscytacji, ERC | RKO, zadławienie, pierwsza pomoc |

## Przygotowanie bazy

Bazę przygotowuje się na komputerze, przed wydaniem aplikacji:

1. Wyciągnięcie tekstu z PDF z zachowaniem numerów stron, nagłówków rozdziałów i pozycji tekstu na stronie.
2. Ręczne sprawdzenie, czy tabele i listy nie rozsypały się przy wyciąganiu.
3. Podział na fragmenty po około 300–500 tokenów. Każdy fragment ma: dokument, stronę, rozdział, datę wydania oraz numer strony w pliku PDF (`pdf_page`, bywa inny niż numer w druku `page_label`), krótką nazwę dokumentu (`doc_short`) i prostokąty fragmentu na stronie (`rects`) do podświetlenia. Kontrakt rekordu: [szablony czatu](../03-ekrany/szablony-czatu.md).
4. Wyliczenie wektorów (embeddingów) i zapis do jednej bazy SQLite z wyszukiwaniem pełnotekstowym i wektorowym.
5. Ręczne przygotowanie [kart ratunkowych](../02-funkcje/02-pierwsza-pomoc/karty-ratunkowe.md) i reguł [planu 72 h](../02-funkcje/04-profil-i-plan/plan-72h.md) jako dosłownych wyciągów ze źródeł. Karty, reguły i ich rekordy źródeł są dołączone do instalacji aplikacji, nie do paczek, żeby działały bez pobrań. Formaty plików i DDL bazy: [kontrakty treści](kontrakty-tresci.md).
6. Uruchomienie [zestawu testowego](../02-funkcje/01-czat/odpowiedzi-tylko-ze-zrodel.md#zestaw-testowy).

## Aktualizacje

Każda wersja bazy ma numer i datę. Aplikacja pobiera nową wersję przy połączeniu z siecią i pokazuje, które źródła się zmieniły.
