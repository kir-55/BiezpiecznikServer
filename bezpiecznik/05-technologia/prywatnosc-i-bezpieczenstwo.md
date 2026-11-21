# Prywatność i bezpieczeństwo

## Zasady

- Brak kont, brak logowania, brak analityki i reklam.
- Nic nie opuszcza telefonu bez twojej wyraźnej akcji: profil domu, historia czatu i lokalizacja wychodzą tylko przez SMS do bliskich (wysyła użytkownik, dane z profilu można wyłączyć przełącznikiem „Dołącz dane z profilu”) albo eksport profilu (niezaszyfrowany plik JSON, zapisywany przez użytkownika).
- Aplikacja łączy się z siecią tylko po paczki (model, baza wiedzy, mapy) i nie wysyła przy tym danych użytkownika.

## Dane na telefonie

| Dane | Przechowywanie |
|---|---|
| Profil domu | Szyfrowana baza użytkownika SQLite, klucz w bezpiecznym magazynie systemu |
| Historia czatu | Na telefonie, z opcją automatycznego usuwania |
| Lokalizacja | Nie jest zapisywana na stałe, poza ostatnią znaną pozycją dla kompasu |
| Kontakty alarmowe | W profilu domu |

## Uprawnienia

| Uprawnienie | Po co | Kiedy |
|---|---|---|
| Lokalizacja w czasie używania | Mapa, trasy, kompas, panel alarmowy | Pierwsze uruchomienie |
| Lokalizacja w tle | Wykrywanie zmiany regionu (P2) | Tylko na życzenie użytkownika |
| Latarka | Sygnał ratunkowy | Przy pierwszym użyciu |
| Telefon i SMS | Połączenie z 112, SMS do bliskich | Systemowe okno wybierania numeru i SMS |

## Integralność paczek

Paczki modelu, bazy wiedzy i map są podpisane. Aplikacja sprawdza sumę kontrolną przed użyciem, żeby nikt nie podmienił treści instrukcji.
