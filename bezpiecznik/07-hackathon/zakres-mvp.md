# Zakres MVP

**Jedyne źródło prawdy o tym, co wchodzi do MVP.** W sprawie etapu ma pierwszeństwo przed [rankingiem](../02-funkcje/ranking.md) (ranking mówi, jak ważna jest funkcja w produkcie) i przed statusami „P0/P1” w plikach ekranów. Żadna funkcja nie została wycięta ze specyfikacji: każda ma etap **MVP** albo **Po MVP**.

Założenia (decyzja z 2026-11-21):
- ok. **6 h developmentu z agentami**, praca równoległa w 4 ścieżkach;
- scenariusz pokazu na razie nie wpływa na zakres;
- development i test na Androidzie, region zachodniopomorskie (hackathon w Szczecinie, prawdziwy GPS);
- **paczki (model, baza wiedzy, mapa) w APK albo wgrane przez `adb push`**, bez pobierania w aplikacji;
- jeden motyw: Ciemny (z [design systemu](../08-design-system/README.md)). Kryzysowy, Jasny i Systemowy po MVP.

Kryterium przydziału: MVP to najkrótsza droga do działającej pętli „pytanie → odpowiedź ze źródłem → pomoc (112, karta, schron)” w trybie samolotowym. Po MVP trafia to, co jest kosztowne, zależy od treści, których jeszcze nie ma, albo ma tańszy zamiennik w MVP.

## Przydział

### Czat i AI

| Funkcja | Etap | Uwagi |
|---|---|---|
| Czat (E1): pole, wysyłanie, dymki, szybkie przyciski pustego czatu | MVP | |
| Lokalny model Gemma 4 E2B (`flutter_edge_ai`), odpowiedź z fragmentów | MVP | Model wgrany przez `adb push`. Pomiar w bramce h2 |
| Wyszukiwanie FTS5 (bm25, bez polskich znaków, obcięte rdzenie), próg | MVP | |
| Model pisze, walidator sprawdza (słowa, liczby, **zaprzeczenia**) | MVP | Decyzja z 2026-11-21. [Zasady walidatora](../02-funkcje/01-czat/odpowiedzi-tylko-ze-zrodel.md) |
| Tryb bez AI (fragmenty źródeł jako `quote`) | MVP | Zapas, gdy model zawiedzie |
| Dwie odmowy (spokojne, bez 112; komponent `NoSource`): „brak w źródłach” i „poza tematem” | MVP | [Odmowa](../02-funkcje/01-czat/odpowiedzi-tylko-ze-zrodel.md#odmowa) |
| Szablony `steps`, `bullets`, `call`, `quote` (tekst, dokument, strona), `map`, `signal`, `cpr` | MVP | |
| Intencja „schron / gdzie iść / szpital” → szablon `map` bez modelu i bez progu | MVP | Tanie przy gotowych punktach |
| Wiele czatów: „Nowy czat”, lista w panelu bocznym, tytuł z pierwszej wiadomości | MVP | |
| Usuwanie czatów, automatyczne usuwanie historii | Po MVP | |
| Szablon `animation` (GIF) | Po MVP | Brak zweryfikowanych grafik |
| Okno PDF z podświetleniem w `quote` i pełnoekranowy podgląd | Po MVP | Wymaga `rects` w bazie. W MVP `quote` pokazuje cytat, dokument i stronę |
| Embeddingi i wyszukiwanie hybrydowe | Po MVP | Gdy zestaw testowy pokaże braki FTS5 |
| Router intencji planu 72 h (cechy z wiadomości + profil → wariant) | Po MVP | Razem z regułami planu |
| Rozmowa głosowa i głosówki | Po MVP | [Model wybrany](../02-funkcje/08-w-przyszlosci/glos.md) |

### Pierwsza pomoc

| Funkcja | Etap | Uwagi |
|---|---|---|
| Wykrywanie fraz zagrożenia życia (literówki), karta w czacie bez modelu | MVP | |
| Wariant karty z frazy („dziecko”, „niemowlę”) | MVP | Bez tego „dziecko nie oddycha” otwiera RKO dla dorosłego |
| Karty: RKO (dorosły, dziecko, niemowlę), zadławienie, krwotok | MVP | Teksty dosłownie z wytycznych PRC/ERC 2025, przygotowuje człowiek w h0–2 |
| Karty: oparzenie, utrata przytomności, wstrząs | Po MVP | |
| Instruktor RKO (`cpr`): metronom, wibracja, licznik, głos, stoper, zmiana co 2 min, ekran nie gaśnie | MVP | |
| Metronom i głos RKO grają w tle podczas rozmowy z 112 | Po MVP (pierwszy w kolejce) | Decyzja z 2026-11-21: gra w tle. Android: usługa pierwszoplanowa; iOS: tryb audio w tle |
| Karta AED i przycisk „Jak użyć AED” | Po MVP | |
| Trening RKO | Po MVP | |

### Alarm

| Funkcja | Etap | Uwagi |
|---|---|---|
| Przycisk SOS na każdym ekranie, przytrzymanie → 112 | MVP | |
| Panel 2 (`CallPanel`): przyciski „Zadzwoń 112” i „Powiadom bliskich” oraz zwinięte „Więcej” z numerami 999 / 998 / 997 i współrzędnymi, informacja o AML | MVP | Najbliższy adres w „Więcej”: po MVP |
| Powiadom bliskich: SMS do kontaktów ICE z lokalizacją | MVP | Koszt mały (`sms:`) |
| Najbliższy adres offline w Panelu 2 | Po MVP | Wymaga bazy adresów |
| Sygnał: dźwięk i latarka SOS | MVP | |
| Sygnał: stroboskop ekranu | Po MVP | Wymaga ostrzeżenia o padaczce |
| Sygnały alarmowe (syreny) | Po MVP | |

### Mapa

| Funkcja | Etap | Uwagi |
|---|---|---|
| Mapa offline zachodniopomorskiego (MBTiles), pozycja i kierunek | MVP | |
| Warstwa schronów i ukryć (przełącznik), symbole potwierdzony / niepotwierdzony | MVP | |
| Karta punktu: nazwa, adres, źródło, data, status | MVP | |
| Lista 3 najbliższych schronów | MVP | |
| Kompas do wybranego punktu (kierunek i odległość w linii prostej) | MVP | Zastępuje trasę w MVP |
| Pozostałe warstwy: szpitale, PSP/OSP, woda, apteki, MDS | Po MVP | Ten sam potok danych, tylko więcej rodzajów |
| Trasa piesza (graf + A*) | Po MVP (pierwsza w kolejce) | |
| Prowadzenie zakręt po zakręcie, przeliczanie trasy | Po MVP | |
| Trasa samochodowa | Po MVP | |
| Mapa uproszczona całej Polski | Po MVP | |
| Paczki regionów, wykrywanie województwa | Po MVP | |
| Defibrylatory AED, moduły terenowe | Po MVP | |

### Profil, pierwsze uruchomienie, ustawienia

| Funkcja | Etap | Uwagi |
|---|---|---|
| E0: wstęp, zgoda na lokalizację, profil (do pominięcia) | MVP | |
| E0: pobieranie paczek (manifest, wznawianie, tylko Wi-Fi) | Po MVP | W MVP paczki w APK / `adb push` |
| Profil: domownicy, leki, urządzenia zależne od prądu, mieszkanie, kontakty ICE | MVP | Kontekst dla AI i odbiorcy SMS |
| Profil: zwierzęta, transport, zapasy | Po MVP | |
| Szyfrowanie bazy użytkownika (SQLCipher) | Po MVP | W MVP zwykła SQLite w prywatnym katalogu aplikacji. Nie obiecywać szyfrowania w tekstach MVP |
| Plan 72 h z reguł i plecak jako lista do odhaczania | Po MVP | Wymaga pliku reguł. W MVP pytania o plan obsługuje zwykła ścieżka AI ze źródeł |
| Wydruk planu 72 h | Po MVP | |
| Ustawienia: Profil, Tryb bez AI, Rozmiar tekstu, Głos instrukcji, Usuń wszystkie dane, O aplikacji (źródła, „nie zastępuje 112”) | MVP | |
| Ustawienia: paczki danych, regiony, eksport profilu, historia czatów | Po MVP | |
| Motywy: Kryzysowy (czarne tło, wyższy kontrast, bez animacji), Jasny, Systemowy; wiersz „Motyw” w Ustawieniach | Po MVP | W MVP tylko motyw Ciemny, wiersz ukryty |

### Dane, technologia, dystrybucja

| Funkcja | Etap | Uwagi |
|---|---|---|
| Potok danych: PDF → fragmenty z numerami stron → SQLite FTS5 | MVP | Jedna komenda, h0. Schematy baz i plików treści: [kontrakty treści](../04-dane/kontrakty-tresci.md) |
| Potok danych: OSM → punkty schronów (SQLite), Planetiler → MBTiles województwa | MVP | h0 |
| Prostokąty fragmentów (`rects`) do podświetlenia w PDF | Po MVP | Razem z oknem PDF |
| Statyczny serwer WWW z plikiem APK | MVP | [Dystrybucja](../05-technologia/dystrybucja.md) |
| Serwer paczek, podpisany manifest | Po MVP | |
| Build iOS (CI `--no-codesign`, potem TestFlight) | Po MVP | Zasady „iOS tani od dnia 1” obowiązują już w MVP: żadnych pluginów tylko na Androida |
| Strona WWW w React | Po MVP | |
| Zestaw testowy odpowiedzi | MVP (tyle pytań, ile powstanie, cel 50) | Uruchamiany w bramce h5 |

## Plan 6 h (4 ścieżki agentów + człowiek)

| Godzina | A: AI i wiedza | B: Mapa | C: Szkielet i czat | D: Ratunek | Człowiek |
|---|---|---|---|---|---|
| 0–1 | Projekt Flutter z przypiętymi wersjami. Skrypt PDF → FTS5 | Wyciąg OSM, Planetiler → MBTiles, punkty schronów | `RootOverlay`, wyspa, SOS, nawigacja E1/E2/E3/E4 | Schemat pliku karty, wykrywanie fraz i wariantu | PDF-y źródeł, teksty kart RKO/zadławienie/krwotok z wytycznych, model na telefon (`adb push`) |
| 1–2 | `flutter_edge_ai` na telefonie, **bramka h2** | `maplibre_gl` offline z podpisami ulic, **bramka h2** | Czat, renderer szablonów, panel boczny | Karty w czacie, szablon `call` | Kontrola fragmentów, pierwsze pytania testowe |
| 2–4 | Prompt, JSON szablonów, walidator, tryb bez AI, **bramka h4** | Warstwa schronów, karta punktu, 3 najbliższe, szablon `map`, intencja „schron” | Panel 2 z SMS ICE, E0, profil | Instruktor `cpr`, głos, sygnał (dźwięk, latarka) | Pytania testowe (w tym odmowy) |
| 4–5 | Strojenie progu i walidatora na zestawie testowym, **bramka h5** | Kompas do punktu | Ustawienia MVP, kontekst profilu dla AI | Testy kart i RKO na telefonie | Test w trybie samolotowym |
| 5–6 | Integracja na telefonie w trybie samolotowym, poprawki, APK na serwer | | | | |

## Bramki

- **h2:** model na telefonie: czas ładowania, czas do pierwszego słowa (cel ok. 8 s). Mapa offline wyświetla podpisy ulic w trybie samolotowym. Gdy model nie zdąży: tryb bez AI jako ścieżka główna MVP.
- **h4:** pytanie w czacie → odpowiedź ze źródłem w trybie samolotowym. „Dziecko nie oddycha” → karta RKO w wariancie dziecka w < 1 s.
- **h5:** zestaw testowy: wszystkie oczekiwane odmowy muszą przejść. Inaczej AI wyłączone domyślnie, tryb bez AI włączony.
