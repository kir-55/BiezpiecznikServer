# Ekran 2: Mapa

**Priorytet:** P0 (cały zakres poniżej, łącznie z kompasem i propozycją paczki regionu) · **Offline:** tak · **Komponent:** `MapScreen`

## Cel

Pokazać, gdzie jestem i gdzie jest najbliższe schronienie lub pomoc, a potem doprowadzić tam pieszo, bez internetu. Jeden ekran z trzema stanami widoku:

| Stan (`MapViewState`) | Po co |
|---|---|
| `browse` | Mapa, pozycja, warstwy punktów, karta punktu, lista „Najbliższy schron” |
| `route` | Prowadzenie trasą pieszą: linia, skręty, odległość, czas |
| `compass` | Duża strzałka do celu, gdy mapa jest nieczytelna, brak GPS, brak trasy albo trzeba oszczędzać baterię |

Nad stanem `browse` może być otwarty jeden arkusz (`MapSheet`): `point` (karta punktu), `nearest` (lista), `layers` (warstwy), `steps` (lista skrętów, tylko w `route`), `region` (propozycja paczki).

## Wejście / wyjście

Parametry: `MapScreenParams = { mode?: 'browse' | 'route' | 'compass'; target_point_id?: string }` (nazwy jak w [szablonie `map`](szablony-czatu.md)).

| Wejście | Stan startowy |
|---|---|
| Czat → wyspa w lewym górnym rogu → ikona mapy | Aktywne prowadzenie trwa → wraca do niego. Inaczej `browse`, mapa wyśrodkowana na pozycji w trybie śledzenia. Bez GPS: ostatnia znana pozycja, a bez niej środek pobranego województwa. |
| Czat → szablon `map` → **Prowadź** ([szablony czatu](szablony-czatu.md)) | `route` do `target_point_id` |
| Czat → szablon `map` → dotknięcie mini mapy albo **Pokaż na mapie** | `browse` wyśrodkowana na `target_point_id`, otwarty arkusz `point`, bez trasy |

| Wyjście | Działanie |
|---|---|
| Pływający przycisk wstecz (lewy górny róg) | Wraca do poprzedniego ekranu (zwykle [czat](ekran-1-czat.md)). **Nie kończy prowadzenia.** |
| Systemowe „wstecz” (Android) | Najpierw zamyka otwarty arkusz, potem działa jak przycisk wstecz |
| SOS (prawy górny róg), dotknięcie | [Panel 2: Kontakt ze służbami](panel-2-kontakt-ze-sluzbami.md) |
| SOS, przytrzymanie | Wybiera 112 (potwierdzenie przez system telefonu) |
| **Zakończ** albo dotarcie do celu | Kończy prowadzenie, stan `browse` |

Aktywne prowadzenie zapisuje w lokalnym stanie aplikacji `navigationContext = { target_point_id, distanceM, bearingDeg, cardinal }`. Czat dołącza go do kontekstu modelu ([kompas](../02-funkcje/03-mapa/kompas.md)). Kontekst znika po **Zakończ** albo po dotarciu do celu.

## Układ

Stałe elementy nad mapą we wszystkich stanach (globalne, renderowane w `RootOverlay`, [README](README.md#elementy-globalne)): przycisk wstecz (lewy górny) i SOS (prawy górny). Stan GPS i baterii pokazuje pasek `Notice` pod nimi (tylko gdy jest co zgłosić: szukanie GPS, brak GPS, niska bateria). Arkusze zajmują najwyżej 70% wysokości ekranu i nigdy nie zasłaniają przycisku wstecz ani SOS.

**`browse`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│                              │
│      S            +          │
│             ▲                │
│     (s)        M             │
│   P         U                │
│                     [Warstwy]│
│                        [◎]   │
│● Mapa szczegółowa            │
│[     Najbliższy schron     ] │
│© OpenStreetMap contributors  │
└──────────────────────────────┘
```

**`browse` + arkusz `point`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│      S         ▲             │
│               (mapa)         │
│┌────────────────────────────┐│
││ S  Schron                  ││
││ ul. Lipowa 5, Szczecin     ││
││ Całodobowo                 ││
││ 450 m · północny wschód ↗  ││
││ ✓ Potwierdzony             ││
││ Źródło: KG PSP, 12.10.2026 ││
││ [ Prowadź ]  [ Kompas ]    ││
│└────────────────────────────┘│
└──────────────────────────────┘
```

**`browse` + arkusz `nearest`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│               (mapa)         │
│┌────────────────────────────┐│
││ Najbliższe schronienie     ││
││ S  ul. Lipowa 5   450 m ↗  ││
││ M  Szkoła nr 3    620 m →  ││
││ s? ul. Polna 2    700 m ↓  ││
││    niepotwierdzony         ││
│└────────────────────────────┘│
└──────────────────────────────┘
```

**`browse` + arkusz `layers`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│               (mapa)         │
│┌────────────────────────────┐│
││ Warstwy                    ││
││ Schrony i ukrycia     [●━] ││
││ Miejsca doraźnego     [●━] ││
││ schronienia                ││
││ Szpitale i SOR        [●━] ││
││ Straż PSP i OSP       [━○] ││
││ Punkty poboru wody    [━○] ││
││ Apteki                [━○] ││
│└────────────────────────────┘│
└──────────────────────────────┘
```

**`route`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│┌────────────────────────────┐│
││ ↱ Za 120 m w prawo         ││
││   w ul. Lipową             ││
│└────────────────────────────┘│
│          ┊                   │
│          ┊        S          │
│          ▲┈┈┈┈┈┈┈┈┘          │
│┌────────────────────────────┐│
││ 450 m · 6 min    [Kroki]   ││
││ [Kompas]     [Zakończ]     ││
│└────────────────────────────┘│
└──────────────────────────────┘
```

**`compass`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│Do: Schron, ul. Lipowa 5      │
│              ▲               │
│             ███              │
│            █████             │
│           ███████            │
│            350 m             │
│       północny wschód        │
│     53.42850, 14.55280       │
│[Pokaż mapę]     [Zakończ]    │
└──────────────────────────────┘
```

Legenda szkiców: `▲` ty i kierunek patrzenia, `S` schron, `U` ukrycie, `M` miejsce doraźnego schronienia, `+` szpital/SOR, `P` PSP/OSP, `(s)` / `s?` punkt niepotwierdzony.

## Elementy

| Element | Zachowanie |
|---|---|
| Przycisk wstecz | Pływający, okrągły, min. 48 dp. Opis dla czytnika: „Wróć”. Zob. wyjście. |
| Stan GPS i baterii | `Notice` (wariant `bar`) pod górnymi przyciskami: „Szukam pozycji GPS…”, „Brak sygnału GPS.”, „Niska bateria ({n}%).”. Bez wskaźnika, gdy wszystko działa. Stany: tabela niżej. |
| SOS | Czerwony, zawsze ten sam kształt i miejsce, nigdy niezasłonięty ([przycisk SOS](../02-funkcje/05-alarm/przycisk-sos.md)). Opis dla czytnika: „SOS, kontakt ze służbami. Przytrzymaj, aby zadzwonić pod 112.” |
| Mapa | MapLibre, kafelki z plików lokalnych: mapa uproszczona Polski zawsze, szczegółowa tam, gdzie jest pobrana paczka województwa ([mapa offline](../05-technologia/mapa-offline.md)). W MVP jeden styl ciemny (po MVP: styl jasny albo ciemny kryzysowy wg motywu z [Ustawień](ekran-3-ustawienia.md)). Przesuwanie i przybliżanie palcami. Przesunięcie wyłącza śledzenie pozycji. |
| Pozycja użytkownika | Kropka z wachlarzem kierunku patrzenia (kurs z magnetometru, względem północy geograficznej, gdy system ją podaje). Okrąg dokładności, gdy dokładność > 20 m. Bez fixu: szara kropka w ostatniej znanej pozycji z etykietą wieku („3 min temu”). |
| Przycisk `◎` | Wyśrodkowuje mapę na pozycji i włącza śledzenie. Bez GPS nieaktywny. |
| Punkty | Z tabeli `points` w SQLite ([dane mapy](../04-dane/dane-mapy.md), [schemat](../04-dane/kontrakty-tresci.md#baza-punktów)). Rodzaj z pola `kind`. Tylko z włączonych warstw. Przy przybliżeniu < 12 grupowane w kółka z liczbą; dotknięcie grupy przybliża. Dotknięcie punktu otwiera arkusz `point`. Cel dotyku min. 48 dp. |
| Symbol potwierdzony / niepotwierdzony | Potwierdzony (`confirmed = true`, dane instytucji): pełny, kolorowy symbol rodzaju z ciągłą obwódką. Niepotwierdzony (`confirmed = false`, np. OSM): pusty w środku, przerywana szara obwódka, znaczek „?”. **Punkt niepotwierdzony nigdy nie dostaje symbolu schronu PSP**; obiekt OSM `building=bunker` pokazuje się jako „s?” w warstwie „Schrony i ukrycia”. |
| Przycisk **Warstwy** | Otwiera arkusz `layers`. |
| Arkusz `layers` | Przełączniki warstw. Stan zapisany lokalnie (`map.layers`), przetrwa restart. Domyślnie (**do potwierdzenia**): Schrony i ukrycia ✓, Miejsca doraźnego schronienia ✓, Szpitale i SOR ✓, Straż PSP i OSP ✗, Punkty poboru wody ✗, Apteki ✗. Warstwa „Schrony i ukrycia” obejmuje rodzaje `shelter` i `hiding_place`. AED (P2) nie ma warstwy. |
| Wskaźnik mapy szczegółowej | Pastylka nad przyciskiem „Najbliższy schron”. Pozycja w pobranym województwie: „● Mapa szczegółowa”. Poza: „○ Poza mapą szczegółową” + przycisk **Pobierz** (otwiera arkusz `region`). Bez GPS ukryty. Przynależność do województwa: punkt w wielokącie granic województw (PRG) zapisanych w paczce bazowej. |
| Przycisk **Najbliższy schron** | Otwiera arkusz `nearest`. Bez GPS nieaktywny z podpowiedzią (zob. Stany). |
| Arkusz `nearest` | Trzy najbliższe punkty rodzajów `shelter`, `hiding_place`, `emergency_shelter` (MDS) ze wszystkich pobranych paczek, **niezależnie od włączonych warstw**. Sortowanie po odległości w linii prostej. Wiersz: symbol, nazwa lub adres, odległość, strzałka kierunku względem kierunku patrzenia, etykieta „niepotwierdzony” przy `confirmed = false`. Dotknięcie wiersza: mapa przesuwa się do punktu i otwiera arkusz `point`. Lista odświeża się przy zmianie pozycji o > 25 m. |
| Arkusz `point` | Nazwa; adres; rodzaj i dostępność (np. „Całodobowo”, brak danych → „Dostępność: brak danych”); odległość i kierunek świata ze strzałką; status („✓ Potwierdzony” albo „? Niepotwierdzony” z wyjaśnieniem); „Źródło: {source}, {verified_at}”; ostrzeżenie o wieku, gdy dane starsze niż `POINT_STALE_DAYS`. Przyciski **Prowadź** (→ `route`) i **Kompas** (→ `compass`). Odległość aktualizuje się na żywo. |
| Stan `route` | Trasa piesza A* po grafie z paczki województwa ([trasy](../02-funkcje/03-mapa/trasy.md)). Linia trasy na mapie, mapa śledzi pozycję i obraca się zgodnie z kierunkiem ruchu. U góry baner następnego manewru: strzałka, odległość do skrętu, nazwa ulicy. Na dole: pozostała odległość, czas dojścia (`WALK_SPEED_KMH`), **Kroki** (arkusz `steps`: lista wszystkich manewrów), **Kompas**, **Zakończ**. Manewr = zmiana kierunku > 30° na węźle grafu. |
| Zejście z trasy | Odległość od linii > `OFF_ROUTE_M` przez > 10 s → automatyczne przeliczenie trasy od bieżącej pozycji, komunikat „Wyznaczam nową trasę”. |
| Utrata GPS w `route` | Brak fixu (lub dokładność > 50 m) przez > `GPS_LOST_S` → automatycznie `compass` z ostatniej znanej pozycji. Gdy fix wraca, a użytkownik sam nie wybrał kompasu → automatycznie z powrotem `route`. |
| Dotarcie do celu | Odległość do celu < `ARRIVAL_M` → komunikat „Jesteś u celu”, wibracja, prowadzenie kończy się, stan `browse` z otwartą kartą punktu. |
| Stan `compass` | Pełnoekranowy, ciemne tło, bez mapy (mniejsze zużycie energii). „Do: {rodzaj}, {nazwa lub adres}”. Duża strzałka obrócona o `bearingToTarget − heading`. Odległość. Kierunek świata do celu (8 kierunków: północ, północny wschód, wschód, południowy wschód, południe, południowy zachód, zachód, północny zachód). Współrzędne bieżącej pozycji (stopnie dziesiętne, 5 miejsc). Przyciski **Pokaż mapę** (→ `route`, jeśli trasa istnieje, inaczej `browse`) i **Zakończ**. Ekran nie wygasa w czasie prowadzenia (`wakelock_plus`). |
| Podpowiedź kalibracji | Gdy system zgłasza niską dokładność kursu: pasek „Kompas może się mylić. Porusz telefonem ruchem ósemki.” Znika, gdy dokładność wraca. |
| Tryb linii prostej | **Prowadź**, gdy użytkownik lub cel jest poza mapą szczegółową, gdy nie ma drogi w grafie albo cel jest dalej niż zasięg A* → od razu `compass` z komunikatem „Poza mapą szczegółową…” albo „Nie znalazłem drogi…”. |
| Arkusz `region` | Propozycja pobrania paczki województwa ([paczki regionów](../02-funkcje/03-mapa/paczki-regionow.md)). Pokazuje się sam przy wejściu na mapę i po każdym sprawdzeniu regionu (co `settings.regionCheckInterval`), gdy pozycja jest w województwie bez paczki. Rozmiar z manifestu paczek. Przyciski **Pobierz** i **Nie teraz** („Nie teraz” wycisza propozycję dla tego województwa na 24 h, **do potwierdzenia**). Pobieranie trwa w tle, postęp w pastylce wskaźnika i w [Ustawieniach](ekran-3-ustawienia.md). Po zakończeniu kafelki i punkty pojawiają się bez restartu. |
| Podpis OSM | „© OpenStreetMap contributors” stale w dolnym rogu mapy (ODbL, [licencje](../04-dane/licencje.md)). W stanie `compass` niewidoczny (brak mapy). |

### Parametry (wszystkie do potwierdzenia, jedna stała w kodzie)

| Stała | Wartość |
|---|---|
| `WALK_SPEED_KMH` | 4,5 |
| `OFF_ROUTE_M` | 30 |
| `GPS_LOST_S` | 15 |
| `ARRIVAL_M` | 20 |
| `POINT_STALE_DAYS` | 365 |
| `LOW_BATTERY_PCT` | `settings.lowBatteryPct`, domyślnie 20 (ten sam próg co tryb bez AI w Ustawieniach) |
| Zasięg A* | 15 km |

Formaty: odległość < 1000 m w metrach zaokrąglonych do 10 („450 m”), od 1 km z jednym miejscem po przecinku („1,2 km”); czas w pełnych minutach w górę („6 min”), od 60 min „1 h 10 min”; daty „DD.MM.RRRR”.

## Stany

| Stan | Warunek | Co widać |
|---|---|---|
| Ładowanie | Otwieranie plików kafelków i bazy punktów | Tło w kolorze motywu i wskaźnik ładowania, elementy stałe (wstecz, SOS) aktywne od pierwszej klatki |
| Pusto: brak punktów w widoku | Żaden punkt włączonych warstw w widocznym obszarze | Dyskretny pasek „Brak punktów w tym widoku.” |
| Pusto: brak danych o punktach | Brak pobranej paczki z punktami (np. pominięta przy pierwszym uruchomieniu) | Arkusz `nearest` i pasek: „Nie mam danych o punktach w tej okolicy. Pobierz mapę województwa.” + **Pobierz** |
| Offline | Brak internetu | Wszystko działa normalnie, bez osobnego wskaźnika. W arkuszu `region` **Pobierz** zastąpione tekstem „Pobierzesz, gdy będzie internet.” |
| Tylko Wi-Fi, sieć komórkowa | `settings.wifiOnly = true` i brak Wi-Fi | Arkusz `region`: „Czekam na Wi-Fi.” + **Pobierz przez sieć komórkową** |
| Szukam GPS | Brak pierwszego fixu | `Notice` „Szukam pozycji GPS…”. Po 60 s: „Nie mogę ustalić pozycji. Wyjdź pod otwarte niebo.” |
| Brak GPS | Fix utracony | `Notice` „Brak sygnału GPS.” Szara kropka w ostatniej znanej pozycji z wiekiem. `◎` i **Najbliższy schron** nieaktywne; dotknięcie pokazuje „Potrzebuję pozycji GPS, żeby znaleźć najbliższe punkty.” W `route` → `compass` (zob. Elementy). Bez ostatniej znanej pozycji kompas pokazuje tylko „Brak pozycji GPS. Nie wiem, w którą stronę iść.” |
| Brak zgody na lokalizację | Uprawnienie odrzucone lub usługi lokalizacji wyłączone | Mapa bez pozycji. Pasek „Bez dostępu do lokalizacji nie pokażę, gdzie jesteś.” + **Otwórz ustawienia telefonu**. Karta punktu bez odległości. |
| Brak magnetometru | Telefon nie podaje kursu | Brak wachlarza kierunku. `compass`: strzałka obrócona wg kierunku ruchu z GPS, gdy użytkownik idzie; gdy stoi: tylko kierunek świata i komunikat „Twój telefon nie ma kompasu. Idź na {kierunek}.” |
| Tryb bez AI | Nie dotyczy: mapa nie używa modelu. |
| Niska bateria | Bateria < `LOW_BATTERY_PCT` (po MVP także motyw kryzysowy) | `Notice` „Niska bateria ({n}%).” Ciemny styl mapy (w MVP zawsze), aktualizacja pozycji co 5 s zamiast co 1 s, bez animacji przesuwania. W `route` jednorazowy pasek „Niska bateria. Kompas zużywa mniej energii.” + **Przełącz na kompas**. |
| Poza mapą szczegółową | Pozycja poza pobranymi województwami | Wskaźnik „○ Poza mapą szczegółową” + **Pobierz**. Widać tylko mapę uproszczoną. Prowadzenie wyłącznie w linii prostej (`compass`). |
| Błąd: uszkodzona paczka | Suma kontrolna pliku mapy lub punktów się nie zgadza | Pasek „Mapa województwa jest uszkodzona. Pobierz ją ponownie w Ustawieniach.” + **Otwórz Ustawienia**. Uszkodzona paczka nie jest używana; mapa uproszczona i kompas działają. |
| Błąd: punkt nie istnieje | `target_point_id` z czatu nie ma w bazie | Stan `browse`, pasek „Nie znalazłem tego punktu na mapie.” |

## Teksty

| Klucz | Tekst |
|---|---|
| `map.back.a11y` | Wróć |
| `map.sos.a11y` | SOS, kontakt ze służbami. Przytrzymaj, aby zadzwonić pod 112. |
| `map.layers.button` | Warstwy |
| `map.layers.title` | Warstwy |
| `map.layers.shelters` | Schrony i ukrycia |
| `map.layers.mds` | Miejsca doraźnego schronienia |
| `map.layers.hospitals` | Szpitale i SOR |
| `map.layers.fire` | Straż PSP i OSP |
| `map.layers.water` | Punkty poboru wody |
| `map.layers.pharmacies` | Apteki |
| `map.detailed.in` | Mapa szczegółowa |
| `map.detailed.out` | Poza mapą szczegółową |
| `map.nearest.button` | Najbliższy schron |
| `map.nearest.title` | Najbliższe schronienie |
| `map.point.confirmed` | ✓ Potwierdzony |
| `map.point.unconfirmed` | ? Niepotwierdzony. Dane z {source}, niesprawdzone przez PSP. |
| `map.point.source` | Źródło: {source}, {verified_at} |
| `map.point.stale` | Dane sprawdzono ponad rok temu. Mogą być nieaktualne. |
| `map.point.availabilityUnknown` | Dostępność: brak danych |
| `map.point.guide` | Prowadź |
| `map.point.compass` | Kompas |
| `map.route.remaining` | {odległość} · {czas} |
| `map.route.steps` | Kroki |
| `map.route.end` | Zakończ |
| `map.route.rerouting` | Wyznaczam nową trasę |
| `map.route.arrived` | Jesteś u celu |
| `map.route.noPath` | Nie znalazłem drogi. Pokazuję kierunek w linii prostej. |
| `map.route.outside` | Poza mapą szczegółową. Pokazuję kierunek w linii prostej. |
| `map.turn.left` / `right` / `slightLeft` / `slightRight` / `straight` | Za {odległość} w lewo / w prawo / lekko w lewo / lekko w prawo / prosto{ w ul. {ulica}} |
| `map.compass.to` | Do: {rodzaj}, {nazwa} |
| `map.compass.showMap` | Pokaż mapę |
| `map.compass.calibrate` | Kompas może się mylić. Porusz telefonem ruchem ósemki. |
| `map.compass.lastFix` | Brak GPS. Kierunek z ostatniej znanej pozycji ({wiek} temu). |
| `map.compass.noSensor` | Twój telefon nie ma kompasu. Idź na {kierunek}. |
| `map.compass.noPosition` | Brak pozycji GPS. Nie wiem, w którą stronę iść. |
| `map.gps.searching` | Szukam pozycji GPS… |
| `map.gps.searchingLong` | Nie mogę ustalić pozycji. Wyjdź pod otwarte niebo. |
| `map.gps.needed` | Potrzebuję pozycji GPS, żeby znaleźć najbliższe punkty. |
| `map.permission.denied` | Bez dostępu do lokalizacji nie pokażę, gdzie jesteś. |
| `map.permission.openSettings` | Otwórz ustawienia telefonu |
| `map.battery.low` | Niska bateria. Kompas zużywa mniej energii. |
| `map.battery.switch` | Przełącz na kompas |
| `map.empty.view` | Brak punktów w tym widoku. |
| `map.empty.noData` | Nie mam danych o punktach w tej okolicy. Pobierz mapę województwa. |
| `map.region.title` | Jesteś w województwie {nazwa} |
| `map.region.body` | Pobierz mapę szczegółową: ulice, trasy i punkty schronienia. Rozmiar: {rozmiar}. |
| `map.region.download` | Pobierz |
| `map.region.later` | Nie teraz |
| `map.region.offline` | Pobierzesz, gdy będzie internet. |
| `map.region.waitWifi` | Czekam na Wi-Fi. |
| `map.region.cellular` | Pobierz przez sieć komórkową |
| `map.error.corrupt` | Mapa województwa jest uszkodzona. Pobierz ją ponownie w Ustawieniach. |
| `map.error.openSettings` | Otwórz Ustawienia |
| `map.error.pointMissing` | Nie znalazłem tego punktu na mapie. |
| `map.attribution` | © OpenStreetMap contributors |

## Kryteria akceptacji

- [ ] W trybie samolotowym ekran pokazuje mapę uproszczoną Polski, mapę szczegółową pobranego województwa, punkty, trasę i kompas.
- [ ] SOS jest widoczny i aktywny w każdym stanie i przy każdym otwartym arkuszu; dotknięcie otwiera Panel 2, przytrzymanie wybiera 112.
- [ ] Przycisk wstecz wraca do czatu, a ponowne wejście przez ikonę mapy przywraca trwające prowadzenie.
- [ ] Szablon `map` → **Prowadź** otwiera ekran od razu w stanie `route` do wskazanego punktu.
- [ ] Wyłączenie warstwy ukrywa jej punkty w ≤ 300 ms; stan warstw przetrwa restart aplikacji.
- [ ] Punkt z `confirmed = false` ma inny symbol niż potwierdzony i nigdy symbol schronu PSP; karta pokazuje „Niepotwierdzony”.
- [ ] Każda karta punktu pokazuje źródło i datę weryfikacji; punkt starszy niż `POINT_STALE_DAYS` ma ostrzeżenie o wieku.
- [ ] **Najbliższy schron** pokazuje dokładnie 3 punkty (lub mniej, gdy brak danych) posortowane rosnąco po odległości, także przy wyłączonych warstwach.
- [ ] Trasa piesza do punktu w promieniu 2 km wyznacza się w < 200 ms na docelowym telefonie (cel z [mapy offline](../05-technologia/mapa-offline.md)).
- [ ] W `route` widać linię, następny skręt z odległością, pozostałą odległość i czas.
- [ ] Zejście z trasy o > `OFF_ROUTE_M` przez > 10 s przelicza trasę.
- [ ] Zasymulowana utrata GPS przełącza na `compass` po `GPS_LOST_S`; powrót fixu przywraca `route`.
- [ ] Strzałka kompasu wskazuje cel z dokładnością ± 15° przy skalibrowanym magnetometrze (test w terenie na znanym punkcie).
- [ ] Poza mapą szczegółową **Prowadź** otwiera `compass` z komunikatem o linii prostej.
- [ ] Wejście z pozycją w niepobranym województwie pokazuje arkusz `region`; „Nie teraz” wycisza go dla tego województwa na 24 h.
- [ ] Przy `wifiOnly = true` na sieci komórkowej pobieranie nie startuje bez wyraźnej zgody.
- [ ] Po pobraniu paczki szczegóły i punkty pojawiają się bez restartu.
- [ ] Przy baterii < `LOW_BATTERY_PCT` pozycja odświeża się co 5 s (styl mapy w MVP zawsze ciemny).
- [ ] Odrzucenie zgody na lokalizację nie blokuje ekranu: mapa i karty punktów działają, widać przycisk do ustawień telefonu.
- [ ] Podpis „© OpenStreetMap contributors” jest widoczny na mapie.
- [ ] Wszystkie przyciski mają min. 48 dp i opis dla czytnika ekranu.

## Powiązane funkcje

- [Mapa offline](../02-funkcje/03-mapa/mapa.md) · [Punkty schronienia i pomocy](../02-funkcje/03-mapa/punkty-schronienia.md) · [Trasy](../02-funkcje/03-mapa/trasy.md) · [Kompas](../02-funkcje/03-mapa/kompas.md) · [Paczki regionów](../02-funkcje/03-mapa/paczki-regionow.md)
- [Przycisk SOS](../02-funkcje/05-alarm/przycisk-sos.md) · [Panel 2: Kontakt ze służbami](panel-2-kontakt-ze-sluzbami.md) · [Szablony czatu](szablony-czatu.md) · [Ekran 1: Czat](ekran-1-czat.md) · [Ekran 3: Ustawienia](ekran-3-ustawienia.md)
- [Dane mapy](../04-dane/dane-mapy.md) · [Licencje](../04-dane/licencje.md)
- [Mapa offline od strony technicznej](../05-technologia/mapa-offline.md) · [Architektura](../05-technologia/architektura.md) · [Prywatność i bezpieczeństwo](../05-technologia/prywatnosc-i-bezpieczenstwo.md)

Poza zakresem ekranu: trasa samochodowa (P1), przycisk **Ulubione** z karty punktu (nie ma go w decyzji właściciela), warstwa AED (P2), wyszukiwanie adresu na mapie.
