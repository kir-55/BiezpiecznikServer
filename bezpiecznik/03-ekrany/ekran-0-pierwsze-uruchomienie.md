# Ekran 0: Pierwsze uruchomienie

**Priorytet:** P0 · **Offline:** częściowo (pobieranie paczek wymaga internetu; reszta działa bez sieci) · **Komponent:** `OnboardingScreen`

## Cel

W kilka minut przygotować telefon do pracy bez internetu: uprzedzić, że aplikacja nie zastępuje 112, pobrać paczki, uzyskać zgodę na lokalizację i (opcjonalnie) utworzyć lokalny profil domu. Każdy krok poza pierwszym można pominąć.

## Wejście / wyjście

| Wejście / wyjście | Działanie |
|---|---|
| Wejście | Start aplikacji, gdy `onboarding.completed = false`: pierwsze uruchomienie albo po „Usuń wszystkie dane” w [Ustawieniach](ekran-3-ustawienia.md). |
| Wznowienie | `onboarding.step` zapisany po każdym kroku. Zamknięcie aplikacji w połowie → kolejny start wraca do tego kroku; przerwane pobieranie wznawia się samo. |
| Przycisk wstecz (lewy górny, od kroku 2) | Poprzedni krok. Na kroku 1 brak przycisku; systemowe „wstecz” (Android) zamyka aplikację. |
| SOS (prawy górny, każdy krok) | Dotknięcie → [Panel 2](panel-2-kontakt-ze-sluzbami.md); przytrzymanie → 112. Działa przed pobraniem jakichkolwiek paczek (Panel 2 bez paczki województwa pokazuje tylko współrzędne, bez adresu). |
| Wyjście | Ekran „Gotowe” → **Zacznij** → `onboarding.completed = true` → nowy, pusty czat ([Ekran 1](ekran-1-czat.md)). |

## Kroki

| # | Krok (`onboarding.step`) | Co robi |
|---|---|---|
| 1 | `intro` | Wyjaśnia, czym jest Bezpiecznik, i że nie zastępuje 112. Jedyny krok bez pominięcia. |
| 2 | `location` | Prosi o zgodę na lokalizację **tylko w czasie używania aplikacji**. Pozycja służy do wykrycia województwa w kroku 3. |
| 3 | `packages` | Pobiera paczki: baza wiedzy, model AI, mapa uproszczona Polski, mapa szczegółowa własnego województwa. |
| 4 | `profile` | Proponuje utworzenie profilu domu: [Ekran 4](ekran-4-profil.md) w trybie `wizard`. |
| — | `done` | Podsumowanie i **Zacznij**. |

Zgoda na lokalizację jest przed pobieraniem, żeby od razu wykryć województwo i nie pytać o nie ręcznie.

## Układ

**Krok 1 `intro`**

```
┌──────────────────────────────┐
│                        (SOS) │
│          Bezpiecznik         │
│                              │
│Podpowiada, co zrobić w       │
│sytuacji kryzysowej, według   │
│oficjalnych poradników.       │
│Działa bez internetu.         │
│                              │
│┌────────────────────────────┐│
││ Nie zastępuje 112.         ││
││ W zagrożeniu życia dzwoń   ││
││ pod 112.                   ││
│└────────────────────────────┘│
│[           Dalej            ]│
└──────────────────────────────┘
```

**Krok 2 `location`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│Krok 2 z 4                    │
│                              │
│Pozwól na lokalizację         │
│                              │
│Pokażę najbliższy schron      │
│i wykryję twoje województwo.  │
│Tylko gdy używasz aplikacji.  │
│Lokalizacja zostaje w         │
│telefonie. Wysyłasz ją sam.   │
│                              │
│[          Zezwól            ]│
│          Nie teraz           │
└──────────────────────────────┘
```

**Krok 3 `packages`** (w trakcie pobierania)

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│Krok 3 z 4 · Paczki           │
│[✓] Baza wiedzy      ✓ gotowe │
│[✓] Model AI   ▓▓▓▓░░░░ 48%   │
│[✓] Mapa Polski      ✓ gotowe │
│[✓] Mazowieckie     czeka     │
│    Zmień województwo         │
│Razem {rozmiar} · wolne {y}   │
│Tylko przez Wi-Fi      [●━]   │
│                              │
│[           Dalej            ]│
│Pobieranie trwa w tle.        │
└──────────────────────────────┘
```

**Krok 4 `profile`**: ekran z tytułem „Profil domu”, tekstem `onb.profile.body`, przyciskami **Uzupełnij** i **Później**. Po **Uzupełnij** formularz z [Ekranu 4](ekran-4-profil.md).

**`done`**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│Gotowe                        │
│                              │
│✓ SOS i karty ratunkowe       │
│✓ Baza wiedzy                 │
│✓ Mapa Polski                 │
│… Model AI: pobieranie 48%    │
│✓ Profil domu                 │
│                              │
│Postęp: Ustawienia → Paczki   │
│                              │
│[          Zacznij           ]│
└──────────────────────────────┘
```

## Elementy

| Element | Zachowanie |
|---|---|
| **Dalej** (krok 1) | Przechodzi do kroku 2. |
| **Zezwól** (krok 2) | Systemowe okno zgody na lokalizację w czasie używania. Po zgodzie: próba ustalenia pozycji (do 20 s, w tle) i wykrycie województwa (punkt w wielokącie granic województw z paczki bazowej). Od razu krok 3, nie czeka na fix. |
| **Nie teraz** (krok 2) | Krok 3 z ręcznym wyborem województwa. Zgodę można dać później w ustawieniach telefonu (Ekran 2 pokazuje przycisk). |
| Lista paczek (krok 3) | Wiersz: pole wyboru, nazwa, rozmiar z manifestu, stan (`czeka`, `czeka na Wi-Fi`, pasek z %, `✓ gotowe`, `błąd` + **Ponów**). Domyślnie zaznaczone wszystkie dostępne. |
| Baza wiedzy | Zalecana. Opis pod nazwą: „Bez niej czat pokaże tylko karty ratunkowe.” |
| Model AI | Opcjonalny, największy. Opis: „Bez modelu czat działa w trybie bez AI: pokazuje fragmenty poradników.” Gdy telefon nie spełnia wymagań modelu z manifestu (pamięć RAM, do zmierzenia wg [lokalnego AI](../05-technologia/lokalne-ai.md)): wiersz nieaktywny, „Niedostępne na tym telefonie”. |
| Mapa uproszczona Polski | Jeśli jest dołączona do instalacji ([architektura](../05-technologia/architektura.md)), wiersz od razu `✓ gotowe`, bez pola wyboru. |
| Województwo | Nazwa wykrytego województwa. **Zmień województwo** → lista 16 województw. Bez wykrycia (brak zgody, brak fixu, pozycja poza Polską): wiersz „Wybierz województwo” i lista otwiera się sama. Można wybrać tylko jedno; kolejne później w Ustawieniach. |
| Suma i wolne miejsce | „Razem {rozmiar} · wolne {y}” dla zaznaczonych paczek. |
| **Tylko przez Wi-Fi** | To samo ustawienie co `settings.wifiOnly` w [Ustawieniach](ekran-3-ustawienia.md), domyślnie włączone. Na sieci komórkowej przy włączonym: paczki `czeka na Wi-Fi`. Wyłączenie przy sieci komórkowej pokazuje rozmiar i pyta o zgodę. |
| Start pobierania | Automatycznie po wejściu na krok 3, gdy są sieć, miejsce i dozwolony rodzaj sieci. Kolejność: baza wiedzy → województwo → mapa Polski → model AI (najpierw to, co najmniejsze i najważniejsze). Pobieranie w tle, wznawiane od miejsca przerwania, także po restarcie. Po pobraniu sprawdzenie podpisu i sumy kontrolnej ([integralność paczek](../05-technologia/prywatnosc-i-bezpieczenstwo.md)). |
| **Dalej** (krok 3) | Zawsze aktywne. Pobieranie trwa dalej w tle. Zmiana pól wyboru po starcie: odznaczenie anuluje pobieranie tej paczki i usuwa częściowy plik. |
| **Pomiń** (krok 3) | Widoczne tylko przed startem pobierania (offline, brak miejsca, czeka na Wi-Fi). Przechodzi do kroku 4 bez pobierania. |
| **Uzupełnij** / **Później** (krok 4) | Uzupełnij → [Ekran 4](ekran-4-profil.md) `wizard`, po nim `done`. Później → `done`. Profil uzupełnisz w Ustawieniach → Profil. |
| Podsumowanie `done` | Lista: SOS i karty ratunkowe (zawsze ✓), baza wiedzy, mapa Polski, województwo, model AI, profil domu. Stan: ✓, „… pobieranie {n}%”, „czeka na Wi-Fi”, „pominięto”. |
| **Zacznij** | Zapisuje `onboarding.completed = true`, otwiera nowy czat. Trwające pobierania nie są przerywane; postęp w [Ustawieniach](ekran-3-ustawienia.md) → Paczki danych. |

## Stany

| Stan | Co widać |
|---|---|
| Ładowanie manifestu | Krok 3: lista paczek z „…” zamiast rozmiarów; manifest pobierany z sieci (podpisany). |
| Brak sieci | Krok 3: „Brak internetu. Paczki pobierzesz później w Ustawieniach.” Lista tego, co działa teraz: SOS, karty ratunkowe, mapa Polski (jeśli dołączona). Przyciski **Sprawdź ponownie** i **Pomiń**. Gdy sieć wraca na kroku 3, manifest pobiera się sam. |
| Tylko Wi-Fi, sieć komórkowa | Wiersze `czeka na Wi-Fi`, pod listą „Czekam na Wi-Fi.” + **Pobierz przez sieć komórkową**. |
| Błąd pobierania | Do 3 automatycznych prób z rosnącą przerwą (2 s, 10 s, 30 s, dp), każda od miejsca przerwania. Potem wiersz `błąd` + **Ponów**. Pozostałe paczki pobierają się dalej. |
| Plik uszkodzony | Suma kontrolna się nie zgadza → plik usunięty, jedno automatyczne pobranie od nowa. Drugi błąd → „Plik uszkodzony.” + **Ponów**. Paczka nie jest używana. |
| Przerwanie (zamknięcie aplikacji, utrata sieci) | Pobieranie wznawia się od miejsca przerwania przy następnym starcie lub powrocie sieci. Na kroku 3 stan „Wstrzymane, brak internetu”. |
| Brak zgody na lokalizację | Krok 3: „Bez lokalizacji nie pokażę najbliższego schronu. Możesz to zmienić w ustawieniach telefonu.” i ręczny wybór województwa. Reszta działa. |
| Brak GPS | Zgoda jest, ale brak fixu w 20 s: „Nie mogę ustalić pozycji. Wybierz województwo.” i lista województw. |
| Poza Polską | Pozycja poza granicami województw: „Jesteś poza Polską. Wybierz województwo, które chcesz mieć w telefonie.” |
| Za mało miejsca | Przed startem: suma zaznaczonych paczek × 1,1 (rozpakowanie, dp) > wolne miejsce → „Za mało miejsca: potrzeba {x}, wolne {y}. Odznacz model AI albo zwolnij miejsce.” Pobieranie nie startuje, dopóki zaznaczone paczki się nie mieszczą. |
| Niska bateria | Bateria ≤ `settings.lowBatteryPct` i brak ładowania: pasek „Niska bateria. Podłącz ładowarkę, pobieranie może potrwać.” Pobieranie trwa. |
| Poza mapą szczegółową | Nie dotyczy (województwo wybierane w kroku 3). |
| Tryb bez AI | Nie dotyczy. Bez pobranego modelu czat po **Zacznij** działa w trybie bez AI. |
| Pusto | Nie dotyczy. |

## Teksty

| Klucz | Tekst |
|---|---|
| `onb.intro.title` | Bezpiecznik |
| `onb.intro.body` | Podpowiada, co zrobić w sytuacji kryzysowej, według oficjalnych poradników. Działa bez internetu. Prowadzi do najbliższego schronu. |
| `onb.intro.warning` | Nie zastępuje 112. W zagrożeniu życia dzwoń pod 112. |
| `onb.next` | Dalej |
| `onb.skip` | Pomiń |
| `onb.progress` | Krok {n} z 4 |
| `onb.location.title` | Pozwól na lokalizację |
| `onb.location.body` | Pokażę najbliższy schron i wykryję twoje województwo. Tylko gdy używasz aplikacji. Lokalizacja zostaje w telefonie. Wysyłasz ją tylko ty, np. SMS-em do bliskich. |
| `onb.location.allow` | Zezwól |
| `onb.location.later` | Nie teraz |
| `onb.packages.title` | Paczki |
| `onb.packages.intro` | Pobierz teraz, póki masz internet. Potem wszystko działa bez sieci. |
| `onb.pkg.knowledge` | Baza wiedzy |
| `onb.pkg.knowledge.hint` | Bez niej czat pokaże tylko karty ratunkowe. |
| `onb.pkg.model` | Model AI |
| `onb.pkg.model.hint` | Bez modelu czat działa w trybie bez AI: pokazuje fragmenty poradników. |
| `onb.pkg.model.unsupported` | Niedostępne na tym telefonie |
| `onb.pkg.basemap` | Mapa Polski |
| `onb.pkg.region.choose` | Wybierz województwo |
| `onb.pkg.region.change` | Zmień województwo |
| `onb.pkg.total` | Razem {rozmiar} · wolne {y} |
| `onb.pkg.wifiOnly` | Tylko przez Wi-Fi |
| `onb.pkg.cellularConfirm` | Pobrać {rozmiar} przez sieć komórkową? |
| `onb.pkg.state.waiting` / `waitingWifi` / `done` / `error` / `paused` | czeka / czeka na Wi-Fi / ✓ gotowe / błąd / Wstrzymane, brak internetu |
| `onb.pkg.retry` | Ponów |
| `onb.pkg.background` | Pobieranie trwa w tle. |
| `onb.pkg.noNetwork` | Brak internetu. Paczki pobierzesz później w Ustawieniach. |
| `onb.pkg.worksNow` | Już teraz działają: przycisk SOS i karty ratunkowe. |
| `onb.pkg.checkAgain` | Sprawdź ponownie |
| `onb.pkg.waitWifi` | Czekam na Wi-Fi. |
| `onb.pkg.useCellular` | Pobierz przez sieć komórkową |
| `onb.pkg.corrupt` | Plik uszkodzony. |
| `onb.pkg.noSpace` | Za mało miejsca: potrzeba {x}, wolne {y}. Odznacz model AI albo zwolnij miejsce. |
| `onb.pkg.lowBattery` | Niska bateria. Podłącz ładowarkę, pobieranie może potrwać. |
| `onb.loc.denied` | Bez lokalizacji nie pokażę najbliższego schronu. Możesz to zmienić w ustawieniach telefonu. |
| `onb.loc.noFix` | Nie mogę ustalić pozycji. Wybierz województwo. |
| `onb.loc.abroad` | Jesteś poza Polską. Wybierz województwo, które chcesz mieć w telefonie. |
| `onb.profile.title` | Profil domu |
| `onb.profile.body` | Odpowiedz na kilka pytań o domowników i mieszkanie (ok. 2 min). Dzięki temu porady dotyczą twojej rodziny. Profil zostaje tylko w telefonie. |
| `onb.profile.fill` | Uzupełnij |
| `onb.profile.later` | Później |
| `onb.done.title` | Gotowe |
| `onb.done.sos` | SOS i karty ratunkowe |
| `onb.done.downloading` | pobieranie {n}% |
| `onb.done.skipped` | pominięto |
| `onb.done.progressHint` | Postęp: Ustawienia → Paczki danych |
| `onb.done.start` | Zacznij |

## Kryteria akceptacji

- [ ] Pierwsze uruchomienie zawsze zaczyna się od kroku 1 z komunikatem „Nie zastępuje 112”.
- [ ] SOS jest widoczny na każdym kroku i działa bez pobranych paczek.
- [ ] Zgoda na lokalizację jest typu „tylko w czasie używania”; aplikacja nigdy nie prosi tu o lokalizację w tle.
- [ ] Po zgodzie i fixie województwo wykrywa się samo; po odmowie da się je wybrać ręcznie.
- [ ] Każda paczka pokazuje rozmiar przed pobraniem i postęp w % w trakcie.
- [ ] Przy „Tylko przez Wi-Fi” na sieci komórkowej nic się nie pobiera bez potwierdzenia.
- [ ] Wyłączenie sieci w połowie pobierania i jej powrót wznawia pobieranie od miejsca przerwania (nie od zera).
- [ ] Zabicie aplikacji na kroku 3 i ponowny start wraca do kroku 3 i kontynuuje pobieranie.
- [ ] Paczka z błędną sumą kontrolną nie jest używana.
- [ ] Przy za małej ilości miejsca pobieranie nie startuje, a komunikat podaje potrzebne i wolne miejsce.
- [ ] Bez internetu da się przejść cały proces (**Pomiń**) i dotrzeć do czatu; karty ratunkowe działają.
- [ ] Na telefonie niespełniającym wymagań modelu AI wiersz modelu jest nieaktywny, a reszta paczek się pobiera.
- [ ] **Później** w kroku 4 prowadzi do `done` bez tworzenia profilu.
- [ ] **Zacznij** otwiera nowy czat; kolejne uruchomienie aplikacji pomija Ekran 0.
- [ ] Cały proces z pominięciem profilu i bez czekania na pobieranie zajmuje < 1 min.

## Powiązane funkcje

- [Zasady](../01-wizja/zasady.md) · [Przycisk SOS](../02-funkcje/05-alarm/przycisk-sos.md) · [Panel 2: Kontakt ze służbami](panel-2-kontakt-ze-sluzbami.md)
- [Karty ratunkowe](../02-funkcje/02-pierwsza-pomoc/karty-ratunkowe.md) · [Czat: tryb bez AI](../02-funkcje/01-czat/czat.md#tryb-bez-ai)
- [Mapa offline](../02-funkcje/03-mapa/mapa.md) · [Paczki regionów](../02-funkcje/03-mapa/paczki-regionow.md)
- [Profil domu](../02-funkcje/04-profil-i-plan/profil-domu.md) · [Ekran 4: Profil](ekran-4-profil.md) · [Ekran 3: Ustawienia](ekran-3-ustawienia.md) (dawny `02-funkcje/07-ustawienia/ustawienia.md` nie istnieje) · [Ekran 1: Czat](ekran-1-czat.md)
- [Architektura: paczki do pobrania](../05-technologia/architektura.md#paczki-do-pobrania) · [Lokalne AI](../05-technologia/lokalne-ai.md) · [Prywatność i bezpieczeństwo](../05-technologia/prywatnosc-i-bezpieczenstwo.md)
