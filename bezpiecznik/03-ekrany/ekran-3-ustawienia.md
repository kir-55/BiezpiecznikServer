# Ekran 3: Ustawienia

**Priorytet:** P1 (sekcje Profil, Paczki danych i Prywatność są potrzebne do P0: edycja profilu, ponowienie pobrań, usunięcie danych) · **Offline:** tak · **Komponent:** `SettingsScreen`

**Jedyne źródło prawdy o ustawieniach.** Zastępuje dawny plik `02-funkcje/07-ustawienia/ustawienia.md`, który został usunięty.

## Cel

Jedna przewijana lista wszystkich ustawień aplikacji: profil, czaty, wygląd, paczki danych, AI i bateria, prywatność, informacje o aplikacji.

## Wejście / wyjście

| Wejście / wyjście | Działanie |
|---|---|
| Wejście | [Panel 1](panel-1-boczny.md) → ikona ustawień na dole panelu. Z [Ekranu 2](ekran-2-mapa.md): przycisk **Otwórz Ustawienia** przy błędzie paczki (przewija do sekcji Paczki danych). |
| Przycisk wstecz (lewy górny) | Wraca do poprzedniego ekranu (zwykle czat) |
| SOS (prawy górny) | Dotknięcie → [Panel 2](panel-2-kontakt-ze-sluzbami.md); przytrzymanie → 112 |
| **Profil domu** | [Ekran 4](ekran-4-profil.md) w trybie `edit` |
| **Usuń wszystkie dane** | Po potwierdzeniu → [Ekran 0](ekran-0-pierwsze-uruchomienie.md) |


## Układ

```
┌──────────────────────────────┐
│(←)  Ustawienia         (SOS) │
│PROFIL                        │
│▸ Profil domu      5 z 8  >   │
│CZATY                         │
│  Usuwanie historii  Nigdy >  │
│  Usuń wszystkie czaty        │
│WYGLĄD                        │
│  Motyw (po MVP) Systemowy >  │
│  Rozmiar tekstu  ●──○──○     │
│  Ograniczenie ruchu   [━○]   │
│PACZKI DANYCH                 │
│  Tylko przez Wi-Fi    [●━]   │
│  Mazowieckie                 │
│  ▓▓▓▓▓▓░░░░ 61%  [Wstrzymaj] │
│  …                           │
└──────────────────────────────┘
```

Wybór z listy (`>`) otwiera arkusz od dołu z opcjami; wybór zapisuje się od razu i zamyka arkusz. Arkusze i okna potwierdzenia leżą pod `RootOverlay` ([README](README.md#kolejność-warstw-od-góry)), żeby nie zasłaniały SOS.

## Elementy

Wszystkie wartości zapisane lokalnie pod kluczem `settings.*`, działają od razu, bez przycisku „Zapisz” i bez restartu. Domyślne oznaczone „(dp)” są **do potwierdzenia**.

| Sekcja | Element | Kontrolka | Domyślnie | Działanie |
|---|---|---|---|---|
| Profil | Profil domu | Wiersz z podsumowaniem „Uzupełniono {n} z 8” | — | Otwiera [Ekran 4](ekran-4-profil.md) w trybie `edit` |
| Czaty | Automatyczne usuwanie historii | Wybór: Nigdy, Po 24 godzinach, Po 7 dniach, Po 30 dniach | Nigdy (dp) | `settings.chatAutoDelete`. Czaty, których ostatnia wiadomość jest starsza niż próg, są usuwane przy starcie aplikacji i co godzinę, gdy jest aktywna. Wybór krótszego progu, przez który zniknęłyby istniejące czaty, wymaga potwierdzenia z ich liczbą. |
| Czaty | Usuń wszystkie czaty | Przycisk destrukcyjny + okno potwierdzenia | — | Usuwa historię wszystkich czatów. Lista w Panelu 1 jest pusta, czat otwiera się jako nowy. |
| Wygląd | Motyw | **MVP: wiersz ukryty, aplikacja ma tylko motyw Ciemny.** Po MVP wybór: Systemowy, Jasny, Ciemny, Kryzysowy | Po MVP: Systemowy (dp) | `settings.theme`. Po MVP. Kryzysowy: czarne tło, wyższy kontrast, brak animacji, ciemny styl mapy, mniejsze zużycie baterii na ekranach OLED. Jasny: osobna paleta. „Systemowy” = jasny lub ciemny wg telefonu. |
| Wygląd | Rozmiar tekstu | Suwak 3 pozycje: Standardowy, Duży, Bardzo duży | Standardowy | `settings.textScale` = 1,0 / 1,25 / 1,5 (dp), mnożone przez skalę czcionki systemu. Podgląd zdania pod suwakiem. |
| Wygląd | Ograniczenie ruchu | Przełącznik | Wg ustawienia systemu „ogranicz ruch” | `settings.reduceMotion`. Wyłącza animacje. Po MVP przy motywie Kryzysowym zawsze włączone (przełącznik nieaktywny). |
| Paczki danych | Pobieranie tylko przez Wi-Fi | Przełącznik | Włączone | `settings.wifiOnly`. Dotyczy wszystkich paczek (model AI, baza wiedzy, mapy). Na sieci komórkowej pobieranie czeka na Wi-Fi; ręczne **Pobierz** pyta „Pobrać przez sieć komórkową?”. |
| Paczki danych | Sprawdzanie województwa | Wybór: Co 1 h, Co 3 h, Co 6 h, Tylko przy uruchomieniu | Co 3 h | `settings.regionCheckInterval`. Sprawdzanie tylko, gdy aplikacja jest aktywna. Wykrycie województwa bez paczki → propozycja pobrania (arkusz `region` na [Ekranie 2](ekran-2-mapa.md)). Wykrywanie w tle: P2, poza zakresem. |
| Paczki danych | Baza wiedzy | Wiersz: data wydania, rozmiar, stan + **Pobierz** / **Aktualizuj** | — | Bez usuwania. **Aktualizuj** widoczne, gdy manifest ma nowszą wersję. Bez bazy czat pokazuje tylko karty ratunkowe. |
| Paczki danych | Model AI | Wiersz: nazwa, rozmiar, data + **Pobierz** / **Usuń** | — | **Usuń** po potwierdzeniu zwalnia miejsce; czat przechodzi w tryb bez AI. Gdy telefon nie spełnia wymagań modelu: „Twój telefon nie uruchomi lokalnego AI. Czat działa w trybie bez AI.” i brak **Pobierz**. |
| Paczki danych | Mapa uproszczona Polski | Wiersz: rozmiar, data + **Aktualizuj** | — | Bez usuwania. |
| Paczki danych | Paczki województw | Lista: nazwa, rozmiar, data aktualizacji, ostrzeżenie o starych danych + **Aktualizuj**, **Usuń** | Województwo użytkownika z pierwszego uruchomienia | [Paczki regionów](../02-funkcje/03-mapa/paczki-regionow.md). Usunięcie województwa, w którym jest użytkownik, wymaga potwierdzenia „Stracisz ulice, trasy i punkty w okolicy.” Ostrzeżenie, gdy dane starsze niż `POINT_STALE_DAYS` ([Ekran 2](ekran-2-mapa.md), Parametry). |
| Paczki danych | + Pobierz województwo | Przycisk → lista 16 województw z rozmiarami | — | Pobrane oznaczone ✓. Wybór startuje pobieranie. |
| Paczki danych | Postęp pobierania | Pasek w wierszu paczki: % i rozmiar + **Wstrzymaj** / **Wznów**, **Anuluj** | — | Pobieranie w tle, wznawiane od miejsca przerwania (także po restarcie). Po pobraniu sprawdzenie podpisu i sumy kontrolnej; błąd → stan „Plik uszkodzony” + **Pobierz ponownie** ([prywatność](../05-technologia/prywatnosc-i-bezpieczenstwo.md#integralność-paczek)). Za mało miejsca → komunikat z potrzebnym i wolnym miejscem. |
| AI i bateria | Tryb bez AI | Wybór: Automatycznie, Zawsze, Nigdy | Automatycznie | `settings.noAiMode`. Automatycznie = tryb bez AI poniżej progu baterii. Bez pobranego modelu tryb bez AI działa zawsze, niezależnie od wyboru (opis pod wierszem). [Czat: tryb bez AI](../02-funkcje/01-czat/czat.md#tryb-bez-ai). |
| AI i bateria | Próg baterii | Wybór: 15%, 20%, 30% | 20% (dp) | `settings.lowBatteryPct`. Widoczny przy „Automatycznie”. Ten sam próg włącza oszczędzanie na mapie (`LOW_BATTERY_PCT`, [Ekran 2](ekran-2-mapa.md)). |
| AI i bateria | Głos instrukcji | Przełącznik | Włączony | `settings.voiceEnabled`. Czytanie instrukcji na głos (`flutter_tts`): karty ratunkowe, instruktor RKO. |
| AI i bateria | Tempo mowy | Wybór: Wolne, Normalne, Szybkie + **Posłuchaj** | Normalne | `settings.speechRate` = 0,8 / 1,0 / 1,2 (dp). **Posłuchaj** czyta zdanie próbne. Nieaktywne przy wyłączonym głosie. Brak polskiego głosu w systemie → „Telefon nie ma polskiego głosu. Zainstaluj go w ustawieniach telefonu.” |
| Prywatność | Informacja | Tekst | — | „Profil, czaty i lokalizacja zostają w telefonie. Wysyłasz je tylko ty, np. SMS-em do bliskich. Nie ma konta ani serwera. Sieć służy tylko do pobierania paczek.” |
| Prywatność | Eksportuj profil do pliku | Przycisk | — | Zapisuje profil jako plik JSON i otwiera systemowe okno udostępniania. Przed eksportem ostrzeżenie: „Plik nie jest zaszyfrowany. Zawiera dane o zdrowiu domowników.” Nieaktywny przy pustym profilu. |
| Prywatność | Usuń profil | Przycisk destrukcyjny + okno potwierdzenia | — | Usuwa profil i kontakty ICE. Czaty i paczki zostają. |
| Prywatność | Usuń wszystkie dane | Przycisk destrukcyjny + okno potwierdzenia z drugim przyciskiem „Usuń wszystko” | — | Usuwa profil, wszystkie czaty, ustawienia i ostatnią znaną pozycję. **Paczki zostają** (bez sieci nie da się ich odzyskać). Aplikacja przechodzi do [Ekranu 0](ekran-0-pierwsze-uruchomienie.md); kroki pobierania pokazują paczki jako już pobrane. |
| O aplikacji | Źródła | Wiersz → lista | — | Każde źródło wiedzy i danych mapy: tytuł, wydawca, data wydania, licencja ([źródła wiedzy](../04-dane/zrodla-wiedzy.md), [dane mapy](../04-dane/dane-mapy.md), [licencje](../04-dane/licencje.md)). Tylko odczyt, bez otwierania PDF. Zawiera „© OpenStreetMap contributors”. |
| O aplikacji | Wynik zestawu testowego | Tekst | — | „Zestaw testowy: {zaliczone} z {wszystkie} pytań, {data}”, z metadanych paczki bazy wiedzy ([odpowiedzi tylko ze źródeł](../02-funkcje/01-czat/odpowiedzi-tylko-ze-zrodel.md)). |
| O aplikacji | Wersja | Tekst | — | Wersja aplikacji i data bazy wiedzy. |
| O aplikacji | Komunikat | Tekst wyróżniony | — | „Bezpiecznik nie zastępuje 112 ani służb.” |

## Stany

| Stan | Co widać |
|---|---|
| Pusto | Nie dotyczy listy. Profil pusty → „Uzupełniono 0 z 8”. Brak pobranych województw → w sekcji Paczki danych „Brak mapy szczegółowej. Pobierz województwo.” |
| Ładowanie | Rozmiary i stany paczek czytane lokalnie; do odczytu w wierszu paczki „…”. |
| Offline | Ustawienia działają. **Pobierz** / **Aktualizuj** nieaktywne z opisem „Brak internetu”. Trwające pobieranie: „Wstrzymane, brak internetu”, wznawia się samo. |
| Tylko Wi-Fi na sieci komórkowej | Wiersz pobierania: „Czeka na Wi-Fi” + **Pobierz teraz** (pyta o sieć komórkową). |
| Brak GPS | Nie dotyczy listy. Sprawdzanie województwa pomija ten cykl. |
| Niska bateria | Bez zmian w liście. Przy „Automatycznie” tryb bez AI już działa; pod wierszem „Teraz działa tryb bez AI (bateria {n}%).” |
| Poza mapą szczegółową | Nie dotyczy. |
| Tryb bez AI | Pod wierszem „Tryb bez AI”: „Teraz działa tryb bez AI (bateria {n}%).” albo „Model AI nie jest pobrany…”. |
| Błąd: za mało miejsca | „Za mało miejsca: potrzeba {x}, wolne {y}.” |
| Błąd: pobieranie | „Nie udało się pobrać.” + **Ponów** (po 3 automatycznych próbach). |
| Błąd: plik uszkodzony | „Plik uszkodzony.” + **Pobierz ponownie**. Paczka nie jest używana. |
| Błąd: usuwanie danych | „Nie udało się usunąć danych. Spróbuj ponownie.” Częściowe usunięcie nie może zostawić profilu czytelnego: najpierw usuwany klucz szyfrowania. |

## Teksty

| Klucz | Tekst |
|---|---|
| `settings.title` | Ustawienia |
| `settings.section.profile` / `chats` / `appearance` / `packages` / `ai` / `privacy` / `about` | Profil / Czaty / Wygląd / Paczki danych / AI i bateria / Prywatność / O aplikacji |
| `settings.profile.row` | Profil domu |
| `settings.profile.summary` | Uzupełniono {n} z 8 |
| `settings.chats.autoDelete` | Automatyczne usuwanie historii |
| `settings.chats.autoDelete.options` | Nigdy / Po 24 godzinach / Po 7 dniach / Po 30 dniach |
| `settings.chats.autoDelete.confirm` | Usunąć teraz {n} starszych czatów? |
| `settings.chats.deleteAll` | Usuń wszystkie czaty |
| `settings.chats.deleteAll.confirm` | Usunąć wszystkie czaty? Tego nie da się cofnąć. |
| `settings.theme` | Motyw |
| `settings.theme.options` | Po MVP: Systemowy / Jasny / Ciemny / Kryzysowy (w MVP tylko Ciemny, wiersz ukryty) |
| `settings.theme.crisisHint` | Czarne tło, wysoki kontrast, bez animacji. Oszczędza baterię. |
| `settings.textScale` | Rozmiar tekstu |
| `settings.textScale.options` | Standardowy / Duży / Bardzo duży |
| `settings.textScale.preview` | Tak będzie wyglądał tekst instrukcji. |
| `settings.reduceMotion` | Ograniczenie ruchu |
| `settings.wifiOnly` | Pobieranie tylko przez Wi-Fi |
| `settings.wifiOnly.confirmCellular` | Pobrać przez sieć komórkową? Rozmiar: {rozmiar}. |
| `settings.regionCheck` | Sprawdzanie województwa |
| `settings.regionCheck.options` | Co 1 h / Co 3 h / Co 6 h / Tylko przy uruchomieniu |
| `settings.pkg.knowledge` | Baza wiedzy |
| `settings.pkg.model` | Model AI |
| `settings.pkg.model.unsupported` | Twój telefon nie uruchomi lokalnego AI. Czat działa w trybie bez AI. |
| `settings.pkg.model.deleteConfirm` | Usunąć model AI? Czat przejdzie w tryb bez AI. |
| `settings.pkg.basemap` | Mapa uproszczona Polski |
| `settings.pkg.regions` | Paczki województw |
| `settings.pkg.regions.empty` | Brak mapy szczegółowej. Pobierz województwo. |
| `settings.pkg.regions.add` | + Pobierz województwo |
| `settings.pkg.regions.deleteCurrent` | Usunąć mapę województwa, w którym jesteś? Stracisz ulice, trasy i punkty w okolicy. |
| `settings.pkg.stale` | Dane mają ponad rok. Zaktualizuj, gdy będziesz mieć internet. |
| `settings.pkg.download` / `update` / `pause` / `resume` / `cancel` / `redownload` | Pobierz / Aktualizuj / Wstrzymaj / Wznów / Anuluj / Pobierz ponownie |
| `settings.pkg.offline` | Brak internetu |
| `settings.pkg.pausedOffline` | Wstrzymane, brak internetu |
| `settings.pkg.waitWifi` | Czeka na Wi-Fi |
| `settings.pkg.downloadNow` | Pobierz teraz |
| `settings.pkg.noSpace` | Za mało miejsca: potrzeba {x}, wolne {y}. |
| `settings.pkg.failed` | Nie udało się pobrać. |
| `settings.pkg.retry` | Ponów |
| `settings.pkg.corrupt` | Plik uszkodzony. |
| `settings.ai.noAiMode` | Tryb bez AI |
| `settings.ai.noAiMode.options` | Automatycznie / Zawsze / Nigdy |
| `settings.ai.noAiMode.noModel` | Model AI nie jest pobrany, więc czat zawsze działa w trybie bez AI. |
| `settings.ai.noAiMode.activeNow` | Teraz działa tryb bez AI (bateria {n}%). |
| `settings.ai.batteryThreshold` | Próg baterii |
| `settings.voice` | Głos instrukcji |
| `settings.voice.rate` | Tempo mowy |
| `settings.voice.rate.options` | Wolne / Normalne / Szybkie |
| `settings.voice.preview` | Posłuchaj |
| `settings.voice.sample` | Uciskaj środek klatki piersiowej. Mocno i szybko. |
| `settings.voice.noPolish` | Telefon nie ma polskiego głosu. Zainstaluj go w ustawieniach telefonu. |
| `settings.privacy.info` | Profil, czaty i lokalizacja zostają w telefonie. Wysyłasz je tylko ty, np. SMS-em do bliskich. Nie ma konta ani serwera. Sieć służy tylko do pobierania paczek. |
| `settings.privacy.export` | Eksportuj profil do pliku |
| `settings.privacy.export.warning` | Plik nie jest zaszyfrowany. Zawiera dane o zdrowiu domowników. |
| `settings.privacy.deleteProfile` | Usuń profil |
| `settings.privacy.deleteProfile.confirm` | Usunąć profil i kontakty alarmowe? Tego nie da się cofnąć. |
| `settings.privacy.deleteAll` | Usuń wszystkie dane |
| `settings.privacy.deleteAll.confirm` | Usunąć profil, wszystkie czaty i ustawienia? Pobrane mapy i baza wiedzy zostaną. |
| `settings.privacy.deleteAll.button` | Usuń wszystko |
| `settings.privacy.deleteFailed` | Nie udało się usunąć danych. Spróbuj ponownie. |
| `settings.about.sources` | Źródła |
| `settings.about.testSuite` | Zestaw testowy: {zaliczone} z {wszystkie} pytań, {data} |
| `settings.about.version` | Wersja {wersja} · baza wiedzy z {data} |
| `settings.about.disclaimer` | Bezpiecznik nie zastępuje 112 ani służb. |
| `settings.cancel` | Anuluj |

## Kryteria akceptacji

- [ ] Każda zmiana ustawienia działa od razu i przetrwa restart aplikacji.
- [ ] MVP: wiersz „Motyw” jest ukryty, aplikacja ma motyw Ciemny.
- [ ] Po MVP: motyw Kryzysowy daje czarne tło, wyłącza animacje (przełącznik ograniczenia ruchu nieaktywny) i ciemny styl mapy.
- [ ] Rozmiar tekstu „Bardzo duży” powiększa tekst na wszystkich ekranach bez obcinania przycisku SOS.
- [ ] Przy `wifiOnly` na sieci komórkowej żadne pobieranie nie startuje bez potwierdzenia.
- [ ] Przerwane pobieranie (zabicie aplikacji, utrata sieci) wznawia się od miejsca przerwania.
- [ ] Paczka z błędną sumą kontrolną nie jest używana i ma stan „Plik uszkodzony”.
- [ ] Usunięcie modelu AI przełącza czat na tryb bez AI bez restartu.
- [ ] Ustawienie „Po 24 godzinach” usuwa czaty starsze niż 24 h przy następnym starcie.
- [ ] „Usuń wszystkie czaty” zostawia pustą listę w Panelu 1.
- [ ] Eksport profilu tworzy plik JSON z wszystkimi polami profilu i pokazuje ostrzeżenie przed eksportem.
- [ ] „Usuń wszystkie dane” usuwa profil, czaty, ustawienia i ostatnią pozycję, zostawia paczki i prowadzi do Ekranu 0.
- [ ] Lista źródeł pokazuje datę i licencję każdego źródła oraz „© OpenStreetMap contributors”.
- [ ] W trybie samolotowym ekran działa; przyciski pobierania są nieaktywne z opisem „Brak internetu”.
- [ ] SOS jest widoczny przy każdym przewinięciu listy i przy otwartym arkuszu wyboru.
- [ ] Wszystkie kontrolki mają etykiety dla czytnika ekranu, cele dotyku min. 48 dp.

## Powiązane funkcje

- [Profil domu](../02-funkcje/04-profil-i-plan/profil-domu.md) · [Ekran 4: Profil](ekran-4-profil.md)
- [Czat](../02-funkcje/01-czat/czat.md) · [Panel 1: boczny](panel-1-boczny.md) · [Panel 2: Kontakt ze służbami](panel-2-kontakt-ze-sluzbami.md)
- [Paczki regionów](../02-funkcje/03-mapa/paczki-regionow.md) · [Mapa offline](../02-funkcje/03-mapa/mapa.md) · [Ekran 2: Mapa](ekran-2-mapa.md)
- [Instruktor RKO](../02-funkcje/02-pierwsza-pomoc/instruktor-rko.md) · [Karty ratunkowe](../02-funkcje/02-pierwsza-pomoc/karty-ratunkowe.md) (głos instrukcji)
- [Źródła wiedzy](../04-dane/zrodla-wiedzy.md) · [Dane mapy](../04-dane/dane-mapy.md) · [Licencje](../04-dane/licencje.md)
- [Architektura](../05-technologia/architektura.md) · [Lokalne AI](../05-technologia/lokalne-ai.md) · [Prywatność i bezpieczeństwo](../05-technologia/prywatnosc-i-bezpieczenstwo.md)

Zmiany względem dawnego pliku ustawień: dodane sekcje Profil i Czaty; „Mapa i regiony” scalone z paczkami w „Paczki danych” (Wi-Fi dotyczy wszystkich paczek); rozmiar i data modelu AI przeniesione do „Paczki danych”; dodany motyw „Systemowy” i próg baterii (dp); „Usuń wszystkie dane” nie usuwa paczek.
