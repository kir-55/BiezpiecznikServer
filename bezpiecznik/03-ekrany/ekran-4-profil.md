# Ekran 4: Profil domu

**Priorytet:** P0 · **Offline:** tak · **Komponent:** `ProfileScreen`, parametry `{ mode: 'wizard' | 'edit'; section?: ProfileSectionId }`

## Cel

Zebrać zawczasu, w około 2 minuty, informacje o domownikach i mieszkaniu. Profil jest **wyłącznie lokalny**: bez konta, logowania i serwera. Służy jako:

- kontekst dla AI w czacie (odpowiedzi, plan 72 h i plecak dotyczą tej rodziny),
- źródło kontaktów alarmowych (ICE) dla funkcji „Powiadom bliskich” (SMS) w [Panelu 2](panel-2-kontakt-ze-sluzbami.md).

Każde pole i każdą sekcję można pominąć.

## Wejście / wyjście

| Tryb | Wejście | Wyjście |
|---|---|---|
| `wizard` | [Ekran 0](ekran-0-pierwsze-uruchomienie.md), krok „Profil” → **Uzupełnij** | Ostatni krok → **Dalej** albo **Pomiń** → powrót do Ekranu 0 (krok „Gotowe”). Wstecz na kroku 1 → poprzedni krok Ekranu 0. |
| `edit` | [Ekran 3: Ustawienia](ekran-3-ustawienia.md) → **Profil domu** | Wstecz: z formularza sekcji → lista sekcji → Ustawienia |
| `edit`, `section: 'iceContacts'` | [Panel 2](panel-2-kontakt-ze-sluzbami.md) → „Dodaj kontakty” albo „Zmień” (Panel 2 się zamyka) | Od razu formularz sekcji 8. Wstecz → ekran, z którego otwarto Panel 2 |

Na każdym kroku: przycisk wstecz w lewym górnym rogu (w `wizard` poprzedni krok), SOS w prawym górnym rogu (dotknięcie → Panel 2, przytrzymanie → 112).

## Układ

**`wizard`, pytanie otwierające sekcję**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│Profil domu            3 z 8  │
│▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░  │
│                              │
│Czy ktoś w domu bierze        │
│leki na stałe?                │
│                              │
│[            Tak            ] │
│[            Nie            ] │
│                              │
│            Pomiń             │
└──────────────────────────────┘
```

**`wizard`, formularz sekcji (ten sam komponent w `edit`)**

```
┌──────────────────────────────┐
│(←)                     (SOS) │
│Leki                   3 z 8  │
│                              │
│Nazwa leku                    │
│[ Insulina                  ] │
│Dla kogo                      │
│[ Mama                    ▾ ] │
│Wymaga lodówki     [Tak][Nie] │
│Zapas (dni)        [ 14 ]     │
│+ Dodaj lek                   │
│                              │
│[           Dalej           ] │
│            Pomiń             │
└──────────────────────────────┘
```

**`edit`, lista sekcji**

```
┌──────────────────────────────┐
│(←)  Profil domu        (SOS) │
│Zostaje w telefonie.          │
│Wysyłasz go tylko ty.         │
│▸ Domownicy         2 osoby   │
│▸ Leki              1 lek     │
│▸ Urządzenia        brak      │
│▸ Zwierzęta         —         │
│▸ Mieszkanie        7. piętro │
│▸ Transport         rower     │
│▸ Zapasy            12.11.2026│
│▸ Kontakty (ICE)    2 kontakty│
└──────────────────────────────┘
```

Podsumowanie w wierszu: liczba wpisów albo kluczowa wartość; „brak” = użytkownik odpowiedział „Nie”; „—” = sekcja pominięta.

## Elementy

### Sekcje i pola

Pole puste = brak danych (`null`), nigdy „nie”. Przełączniki **Tak / Nie** są trójstanowe: nic nie zaznaczone = brak danych.

| # | Sekcja (`id`) | Pytanie otwierające w `wizard` | Pole | Kontrolka | Wartości / walidacja |
|---|---|---|---|---|---|
| 1 | Domownicy (`members[]`) | — (od razu formularz, pierwszy wpis „Ja”) | Etykieta `label` | Tekst | Opcjonalna, ≤ 30 znaków, np. „Mama”. Pusta → „Osoba {n}” |
| | | | Grupa wiekowa `ageGroup` | Wybór jednokrotny (chipy) | `infant` Niemowlę (0–1), `child` Dziecko (2–12), `teen` Nastolatek (13–17), `adult` Dorosły (18–64), `senior` Senior (65+) |
| | | | Ciąża `pregnant` | Tak / Nie | Widoczne tylko dla `teen` i `adult` |
| | | | Niepełnosprawność `disabilities` | Wybór wielokrotny (chipy) | `motor` ruchowa, `vision` wzroku, `hearing` słuchu, `intellectual` intelektualna, `other` inna |
| | | | Ograniczona mobilność `limitedMobility` | Tak / Nie | Podpowiedź: „Np. nie zejdzie sam po schodach.” |
| | | | **+ Dodaj osobę** / **Usuń** | Przyciski | Maks. 15 osób |
| 2 | Leki (`medications[]`) | Czy ktoś w domu bierze leki na stałe? | Nazwa `name` | Tekst | Wymagana w wpisie, ≤ 40 znaków |
| | | | Dla kogo `memberId` | Lista domowników | Opcjonalne; ukryte, gdy sekcja 1 pusta |
| | | | Wymaga lodówki `needsFridge` | Tak / Nie | Podpowiedź: „Np. insulina.” |
| | | | Zapas w dniach `supplyDays` | Liczba (klawiatura numeryczna) | 0–365, całkowita |
| | | | **+ Dodaj lek** / **Usuń** | Przyciski | Maks. 20 |
| 3 | Urządzenia zależne od prądu (`powerDevices`) | Czy ktoś korzysta z urządzenia na prąd, bez którego jest zagrożony? | Urządzenia `types` | Wybór wielokrotny (chipy) | `oxygen_concentrator` Koncentrator tlenu, `suction` Ssak, `electric_wheelchair` Wózek elektryczny, `pump` Pompa (np. insulinowa), `other` Inne |
| | | | Inne `otherText` | Tekst | Widoczne przy „Inne”, ≤ 40 znaków |
| 4 | Zwierzęta (`pets[]`) | Czy masz zwierzęta? | Gatunek `species` | Wybór jednokrotny | `dog` Pies, `cat` Kot, `bird` Ptak, `small` Małe zwierzę, `other` Inne |
| | | | Liczba `count` | Liczba | 1–50, domyślnie 1 |
| | | | Transporter `hasCarrier` | Tak / Nie | |
| | | | **+ Dodaj zwierzę** / **Usuń** | Przyciski | Maks. 10 wpisów |
| 5 | Mieszkanie (`home`) | — | Piętro `floor` | Liczba | −2–100, całkowita; podpowiedź „0 to parter” |
| | | | Winda `elevator` | Tak / Nie | |
| | | | Ogrzewanie `heating` | Wybór jednokrotny | `district` Miejskie, `gas` Gazowe, `electric` Elektryczne, `solid` Węgiel lub drewno, `heat_pump` Pompa ciepła, `other` Inne |
| | | | Kuchenka `stove` | Wybór jednokrotny | `gas` Gazowa, `electric` Elektryczna lub indukcyjna, `none` Brak |
| | | | Piwnica `basement` | Tak / Nie | |
| 6 | Transport (`transport`) | — | Środki `modes` | Wybór wielokrotny (chipy) | `car` Samochód, `bike` Rower, `none` Brak. „Brak” odznacza pozostałe i odwrotnie |
| 7 | Zapasy (`supplies`) | — | Woda `waterLiters` | Liczba | 0–1000 litrów |
| | | | Żywność `foodDays` | Liczba | 0–365 dni |
| | | | Latarka `flashlight` / Radio `radio` / Powerbank `powerbank` | Tak / Nie (każde osobno) | |
| | | | Data sprawdzenia `checkedAt` | Wybór daty + przycisk **Sprawdzone dziś** | Nie później niż dziś. Ustawiana automatycznie na dziś przy każdej zmianie w sekcji |
| | | | Plecak ewakuacyjny `kit[]` | Lista do odhaczania: `{ id, checked, checkedAt }` | `id` z listy plecaka ([plecak](../02-funkcje/04-profil-i-plan/plecak-ewakuacyjny.md#gdzie-jest-stan)). Jedyne miejsce stanu plecaka: odhacza się tu albo w wiadomości `bullets` w czacie (ten sam stan). Braki (`checked = false`) czyta lista braków planu 72 h |
| 8 | Kontakty alarmowe ICE (`iceContacts[]`) | — | Imię `name` | Tekst | Wymagane w wpisie, ≤ 40 znaków |
| | | | Numer `phone` | Telefon (klawiatura telefoniczna) | Usuwane spacje i myślniki. 9 cyfr → zapis `+48XXXXXXXXX`; albo `+` i 8–15 cyfr. Odrzucane: 112, 999, 998, 997 |
| | | | **+ Dodaj kontakt** / **Usuń** / przeciąganie kolejności | Przyciski | Maks. 5. Kolejność = kolejność w Panelu 2 |

Stan sekcji `sectionState`: `filled` (są dane), `none` (odpowiedź „Nie” na pytanie otwierające albo „Brak”), `skipped` (pominięta lub nieruszona). AI odróżnia „nie ma zwierząt” od „nie wiadomo”.

### Zachowanie

| Element | Zachowanie |
|---|---|
| Pasek postępu `wizard` | „{n} z 8”, jedna sekcja na krok. |
| Pytanie otwierające | **Tak** → formularz sekcji. **Nie** → `none`, następny krok. **Pomiń** → `skipped`, następny krok. |
| **Dalej** | Zapisuje sekcję, następny krok. Nieaktywne, gdy któreś pole ma błąd walidacji. Puste pola nigdy nie blokują. |
| **Pomiń** | Porzuca niezapisane zmiany sekcji, oznacza `skipped` (o ile sekcja nie była wcześniej `filled`), następny krok. |
| Zapis w `wizard` | Po każdym kroku. Zamknięcie aplikacji w połowie nie traci zapisanych kroków; Ekran 0 wznawia od pierwszej niezapisanej sekcji. |
| Lista sekcji `edit` | Wiersz z nazwą i podsumowaniem. Dotknięcie → formularz sekcji (bez pytania otwierającego; zamiast niego przełącznik na górze, np. „Nikt nie bierze leków na stałe”, który ustawia `none` i ukrywa pola). |
| Zapis w `edit` | Automatyczny, 500 ms po ostatniej zmianie poprawnego pola; krótki komunikat „Zapisano”. Brak przycisku „Zapisz”. |
| Walidacja | Przy opuszczeniu pola. Komunikat pod polem, pole na czerwono, opis dla czytnika ekranu. Niepoprawna wartość nie jest zapisywana. |
| Wpis z brakującym polem wymaganym | Np. lek bez nazwy przy wypełnionych innych polach → błąd „Wpisz nazwę albo usuń wpis.” Wpis całkowicie pusty jest pomijany bez błędu. |
| **Usuń** wpis | Bez potwierdzenia; komunikat „Usunięto” z **Cofnij** przez 5 s. |
| Notka prywatności | Stale na górze listy `edit` i na pierwszym kroku `wizard`. |
| Przechowywanie | Baza użytkownika SQLite (profil i historia czatów, osobna od bazy wiedzy). **MVP: bez szyfrowania. Po MVP: szyfrowanie**; klucz w bezpiecznym magazynie systemu ([architektura](../05-technologia/architektura.md), [prywatność](../05-technologia/prywatnosc-i-bezpieczenstwo.md)). Nic nie jest wysyłane bez twojej akcji (SMS do bliskich, eksport profilu). Eksport i usunięcie profilu: Ekran 3 → Prywatność. |
| Kontekst dla AI | `buildProfileSummary(profile): string` składa krótki polski opis tylko z pól z danymi i sekcji `none` (np. „Brak zwierząt.”); sekcje `skipped` pomija. Limit 600 znaków (**do potwierdzenia**). Zmiana profilu działa od następnego pytania w czacie ([lokalne AI](../05-technologia/lokalne-ai.md)). |
| Kontakty ICE w Panelu 2 | Panel 2 czyta `iceContacts[]` przy każdym otwarciu. Pusta lista → Panel 2 pokazuje drogę do tej sekcji (zachowanie opisuje [Panel 2](panel-2-kontakt-ze-sluzbami.md)). |

## Stany

| Stan | Co widać |
|---|---|
| Pusto (`edit`, nic nie wypełniono) | Wszystkie sekcje z „—” i nad listą: „Profil jest pusty. Uzupełnij go, żeby odpowiedzi dotyczyły twojej rodziny.” |
| Ładowanie | (Po MVP, z szyfrowaniem) odszyfrowanie bazy < 300 ms; do tego czasu wskaźnik ładowania zamiast listy. |
| Offline | Nie dotyczy: ekran nie używa sieci. |
| Brak GPS, niska bateria, poza mapą szczegółową, tryb bez AI | Nie dotyczy. |
| Błąd walidacji | Komunikat pod polem (zob. Teksty), **Dalej** nieaktywne. |
| Błąd zapisu | Pasek „Nie udało się zapisać. Spróbuj ponownie.” + **Ponów**; wprowadzone wartości zostają w formularzu. |
| (Po MVP) Błąd odszyfrowania (np. utracony klucz po przywróceniu kopii telefonu) | „Nie mogę odczytać profilu. Możesz utworzyć go od nowa.” + **Utwórz nowy profil** (usuwa nieczytelną bazę). |

## Teksty

| Klucz | Tekst |
|---|---|
| `profile.title` | Profil domu |
| `profile.progress` | {n} z 8 |
| `profile.privacy` | Zostaje w telefonie. Wysyłasz go tylko ty, np. SMS-em do bliskich. Nie ma konta ani serwera. |
| `profile.purpose` | Dzięki profilowi odpowiedzi dotyczą twojej rodziny. Każde pole możesz pominąć. |
| `profile.empty` | Profil jest pusty. Uzupełnij go, żeby odpowiedzi dotyczyły twojej rodziny. |
| `profile.yes` / `profile.no` | Tak / Nie |
| `profile.next` / `profile.skip` | Dalej / Pomiń |
| `profile.saved` | Zapisano |
| `profile.deleted` / `profile.undo` | Usunięto / Cofnij |
| `profile.members.title` | Kto mieszka w domu? |
| `profile.members.add` | + Dodaj osobę |
| `profile.members.mobilityHint` | Np. nie zejdzie sam po schodach. |
| `profile.meds.question` | Czy ktoś w domu bierze leki na stałe? |
| `profile.meds.none` | Nikt nie bierze leków na stałe |
| `profile.meds.add` | + Dodaj lek |
| `profile.meds.fridgeHint` | Np. insulina. |
| `profile.devices.question` | Czy ktoś korzysta z urządzenia na prąd, bez którego jest zagrożony? |
| `profile.devices.none` | Nikt nie korzysta z takich urządzeń |
| `profile.pets.question` | Czy masz zwierzęta? |
| `profile.pets.none` | Nie mam zwierząt |
| `profile.pets.add` | + Dodaj zwierzę |
| `profile.home.title` | Twoje mieszkanie |
| `profile.home.floorHint` | 0 to parter |
| `profile.transport.title` | Czym możesz się przemieszczać? |
| `profile.supplies.title` | Co masz w zapasie? |
| `profile.supplies.checkedToday` | Sprawdzone dziś |
| `profile.ice.title` | Kogo powiadomić w razie zagrożenia? |
| `profile.ice.hint` | Do tych osób przygotujemy SMS z twoją pozycją. Wyślesz go sam. |
| `profile.ice.add` | + Dodaj kontakt |
| `profile.error.required` | Wpisz nazwę albo usuń wpis. |
| `profile.error.range` | Wpisz liczbę od {min} do {max}. |
| `profile.error.phone` | Wpisz numer w formacie 600 100 200 albo +48 600 100 200. |
| `profile.error.emergencyNumber` | To numer alarmowy. Wpisz numer bliskiej osoby. |
| `profile.error.save` | Nie udało się zapisać. Spróbuj ponownie. |
| `profile.error.retry` | Ponów |
| `profile.error.decrypt` | Nie mogę odczytać profilu. Możesz utworzyć go od nowa. |
| `profile.error.recreate` | Utwórz nowy profil |

Etykiety wartości (chipy, listy) jak w tabeli pól.

## Kryteria akceptacji

- [ ] Profil da się przejść w `wizard` od początku do końca, naciskając wyłącznie **Pomiń**; aplikacja działa dalej bez profilu.
- [ ] Odpowiedź „Nie” na pytanie otwierające zapisuje `none`, „Pomiń” zapisuje `skipped`; `buildProfileSummary` zawiera zdanie dla `none` i nic dla `skipped`.
- [ ] Puste pole zapisuje się jako `null`; nieruszony przełącznik Tak / Nie to `null`, nie `false`.
- [ ] Pole „Ciąża” jest widoczne tylko dla grup `teen` i `adult`.
- [ ] Numer „600 100 200” zapisuje się jako `+48600100200`; „112” i „997” są odrzucane z komunikatem.
- [ ] Wartości spoza zakresu (np. piętro 101, zapas 400 dni) są odrzucane, **Dalej** jest wtedy nieaktywne.
- [ ] Zabicie aplikacji po kroku 4 i ponowne uruchomienie wznawia `wizard` od kroku 5 z zachowanymi danymi.
- [ ] W `edit` zmiana pola zapisuje się bez przycisku i jest widoczna po restarcie.
- [ ] (Po MVP) Plik bazy profilu na dysku jest zaszyfrowany (nie da się go odczytać zwykłym SQLite bez klucza).
- [ ] W trybie samolotowym wszystkie funkcje ekranu działają; ekran nie wykonuje żadnych żądań sieciowych.
- [ ] Zmiana profilu jest uwzględniona w następnej odpowiedzi czatu.
- [ ] Kontakty ICE pojawiają się w Panelu 2 w ustalonej kolejności.
- [ ] SOS jest widoczny na każdym kroku i w każdej sekcji.
- [ ] Wszystkie pola mają etykiety dla czytnika ekranu, cele dotyku min. 48 dp.

## Powiązane funkcje

- [Profil domu](../02-funkcje/04-profil-i-plan/profil-domu.md) (źródło listy pól) · [Plan 72 h](../02-funkcje/04-profil-i-plan/plan-72h.md) · [Plecak ewakuacyjny](../02-funkcje/04-profil-i-plan/plecak-ewakuacyjny.md) (odpowiedzi w czacie korzystające z profilu)
- [Czat](../02-funkcje/01-czat/czat.md) · [Panel alarmowy](../02-funkcje/05-alarm/panel-alarmowy.md) · [Panel 2: Kontakt ze służbami](panel-2-kontakt-ze-sluzbami.md)
- [Ekran 0: Pierwsze uruchomienie](ekran-0-pierwsze-uruchomienie.md) · [Ekran 3: Ustawienia](ekran-3-ustawienia.md) (eksport i usunięcie profilu; dawny plik `02-funkcje/07-ustawienia/ustawienia.md` nie istnieje)
- [Architektura](../05-technologia/architektura.md) · [Lokalne AI](../05-technologia/lokalne-ai.md) · [Prywatność i bezpieczeństwo](../05-technologia/prywatnosc-i-bezpieczenstwo.md)

Poza zakresem: import kontaktów z książki telefonu (wymaga dodatkowego uprawnienia), dokładny wiek zamiast grupy wiekowej, import profilu z pliku.
