# Ranking funkcji

Funkcje uszeregowane od najważniejszej. Priorytety: **P0** rdzeń, **P1** ważne uzupełnienie, **P2** rozwój. Priorytet to waga w produkcie. **Co wchodzi do MVP, rozstrzyga [zakres MVP](../07-hackathon/zakres-mvp.md).**

## P0: rdzeń

| # | Funkcja | Dlaczego tak wysoko | Opis |
|---|---|---|---|
| 1 | Odpowiedzi tylko ze źródeł | Bez tego AI jest niebezpieczne, a cała obietnica upada | [opis](01-czat/odpowiedzi-tylko-ze-zrodel.md) |
| 2 | Czat z Bezpiecznikiem | Główny sposób pytania o sytuację | [opis](01-czat/czat.md) |
| 3 | Karty ratunkowe | Zagrożenie życia wymaga odpowiedzi natychmiast, bez modelu | [opis](02-pierwsza-pomoc/karty-ratunkowe.md) |
| 4 | Przycisk SOS | Z każdego ekranu jedno dotknięcie otwiera panel z 112 jako pierwszym przyciskiem | [opis](05-alarm/przycisk-sos.md) |
| 5 | Panel alarmowy | Numery służb, współrzędne i adres do przeczytania dyspozytorowi | [opis](05-alarm/panel-alarmowy.md) |
| 6 | Instruktor RKO | Prowadzi resuscytację głosem i metronomem | [opis](02-pierwsza-pomoc/instruktor-rko.md) |
| 7 | Szablony w czacie | Odpowiedź jako kroki, lista, mapa lub połączenie zamiast ściany tekstu | [opis](01-czat/panele.md) |
| 8 | Profil domu | Dzięki niemu odpowiedzi dotyczą twojej rodziny, a nie przeciętnej | [opis](04-profil-i-plan/profil-domu.md) |
| 9 | Plan 72 h (odpowiedź w czacie) | Najważniejsza wartość na co dzień, zanim przyjdzie kryzys | [opis](04-profil-i-plan/plan-72h.md) |
| 10 | Mapa offline | Uproszczona Polska i szczegółowe województwo bez sieci | [opis](03-mapa/mapa.md) |
| 11 | Punkty schronienia i pomocy | Schrony, szpitale, PSP, woda z oznaczonym źródłem | [opis](03-mapa/punkty-schronienia.md) |
| 12 | Trasa piesza | Droga do najbliższego punktu bez internetu | [opis](03-mapa/trasy.md) |
| 13 | Kompas | Kierunek do celu, gdy mapa jest nieczytelna lub trzeba oszczędzać baterię. P0 od 2026-11-21 (pełny zakres mapy) | [opis](03-mapa/kompas.md) |

## P1: ważne uzupełnienie

| # | Funkcja | Dlaczego | Opis |
|---|---|---|---|
| 14 | Sygnał ratunkowy | Dźwięk, latarka i ekran SOS, gdy trzeba zwrócić na siebie uwagę | [opis](05-alarm/sygnal-ratunkowy.md) |
| 15 | Podgląd źródła (PDF z podświetleniem) w czacie | Weryfikacja cytatu bez opuszczania rozmowy | [opis](../03-ekrany/szablony-czatu.md) |
| 16 | Plecak ewakuacyjny | Lista do odhaczania, połączona z planem 72 h | [opis](04-profil-i-plan/plecak-ewakuacyjny.md) |
| 17 | Paczki regionów | Pobieranie szczegółowej mapy innego województwa | [opis](03-mapa/paczki-regionow.md) |
| 18 | Trasa samochodowa | Dojazd do szpitala lub punktu ewakuacji | [opis](03-mapa/trasy.md) |
| 19 | Powiadom bliskich (SMS do bliskich) | Gotowa wiadomość z lokalizacją i danymi z profilu, wysyłana przez użytkownika | [opis](05-alarm/panel-alarmowy.md) |
| 20 | Ustawienia | Motyw, rozmiar tekstu, paczki, prywatność | [opis](../03-ekrany/ekran-3-ustawienia.md) |

## P2: rozwój

| # | Funkcja | Dlaczego później | Opis |
|---|---|---|---|
| 21 | Sygnały alarmowe (syreny) | Wymaga nagrań i opisów sygnałów z oficjalnych źródeł | [opis](05-alarm/sygnaly-alarmowe.md) |
| 22 | Trening RKO | Ćwiczenie przed prawdziwym zdarzeniem | [opis](02-pierwsza-pomoc/trening-rko.md) |
| 23 | Automatyczne wykrywanie regionu w tle | Wymaga zgód na lokalizację w tle i ostrożności z baterią | [opis](03-mapa/paczki-regionow.md) |
| 24 | Rozmowa głosowa | Rozpoznawanie mowy offline jest ciężkie dla telefonu | [opis](08-w-przyszlosci/glos.md) |
| 25 | Moduły terenowe | Schronienie, ogień, woda: potrzebne dodatkowe oficjalne źródła | [opis](08-w-przyszlosci/moduly-terenowe.md) |
| 26 | Defibrylatory AED | Potrzebne wiarygodne dane o lokalizacji AED | [opis](08-w-przyszlosci/aed.md) |

## Odrzucone lub warunkowe

| Funkcja | Decyzja | Powód |
|---|---|---|
| Rośliny i grzyby jadalne | Odrzucone, chyba że powstanie oficjalne źródło | Wysokie ryzyko zatruć. Jedyna dopuszczalna treść to ostrzeżenie: „Nie jedz, jeśli nie masz 100% pewności.” |
| Animacje Lottie | Później | W MVP animacje GIF (decyzja właściciela). Lottie jest lżejsze i ostrzejsze, wdrożenie po MVP |
| Sprawdzanie GPS co 3 h w tle | Zastąpione | Systemowe wykrywanie dużej zmiany położenia mniej obciąża baterię |
