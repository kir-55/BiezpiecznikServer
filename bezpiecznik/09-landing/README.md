# Landing: plan

> **Status (21.11.2026):** zbudowane w `web/` (branch `landing-page`): React 18 + TypeScript, prerender do statycznego HTML, backend Hono. Uruchomienie i zmienne środowiskowe: [`web/README.md`](../../web/README.md). Poniżej plan, według którego powstało.
> Inspiracje i ich ocena: [raport z researchu](https://claude.ai/artifact/KCh4DMNRpSDp5zw9uHFHwT) (źródło w `research/landing/` na branchu `spec/film-research`).

## Cel

Jedna strona, jedna akcja: **pobrać Bezpiecznika na Androida**. W 5 sekund odwiedzający ma wiedzieć, co to jest, dlaczego mu się przyda i że może temu zaufać.

- **Odbiorca:** rodzic, senior, opiekun osoby chorej, świadek wypadku. Nie programista.
- **Język:** korzyści, nie funkcje. Nie „mapa offline z MBTiles”, tylko „najbliższy schron, nawet bez zasięgu”.
- **Wygląd:** nasz [design system](../08-design-system/README.md) bez wyjątków: grafit `bg-000`, jeden jasny przycisk `action` na ekran, ochra `signal` oszczędnie, Atkinson Hyperlegible Next, ruch 200–300 ms. Bez gradientów, neonów i fioletu.
- **Ekrany aplikacji** są głównym obrazem strony. Na landingu pokazujemy je lekko dopracowane (sekcja [Ekrany](#ekrany-aplikacji-na-landingu)). Potem aplikację wyrównujemy do landingu.

## Hasło

**Aplikacja, która ratuje _życie_.** Ostatnie słowo zmienia się:

> życie → zdrowie → bliskich → **życie** (stop)

- Kolejność kończy się na „życie” i tam zostaje. Jeden obieg, bez pętli. Zgodne z zasadą z [Ruchu](../08-design-system/motion.md): ruch nie zabiega o uwagę.
- Każde słowo stoi 2,4 s, przejście to przenikanie 300 ms (`ease-in-out`) z przesunięciem o 4 px. Bez migania i bez efektu maszyny do pisania.
- Słowo w kolorze `ink-100`, a reszta zdania w `ink-200`. Pierwszy plan ma słowo, które się zmienia. Bez koloru `signal` w nagłówku: ochra jest dla logo i focusu.
- Szerokość slotu ustawiona na najdłuższe słowo („bliskich”), żeby nagłówek się nie przesuwał. Kropka należy do słowa, inaczej odjeżdża od krótszego „życie”.
- **Dostępność:** czytnik ekranu dostaje stały tekst „Aplikacja, która ratuje życie”. Zmieniające się słowa mają `aria-hidden`. Przy `prefers-reduced-motion` od razu widać „życie”, bez animacji.
- **Bez JavaScriptu** strona pokazuje pełne zdanie „Aplikacja, która ratuje życie”.
- **Słowa w rezerwie** (do testu z użytkownikami): sąsiadów (scenariusz świadka), sytuację (luźniej, z uśmiechem).

**Uczciwa obudowa hasła.** Zasady mówią: „Na zewnątrz nie używamy określeń typu »AI ratownik«” ([Zasady](../01-wizja/zasady.md)). Hasło zostaje, ale w pierwszym ekranie zawsze stoją obok niego dwie rzeczy:

1. podtytuł, który mówi, **jak** ratuje: kroki z oficjalnych poradników;
2. linia „Nie zastępuje 112” pod przyciskiem.

Wariant łagodniejszy na wypadek uwag prawnych lub jury: „Aplikacja, która **pomaga ratować** życie”. Patrz [Do decyzji](#do-decyzji).

## Struktura strony

Od góry, mobile-first (APK instaluje się na telefonie, więc większość wejść będzie z telefonu). Teksty to pierwsza wersja do dopracowania.

### 1. Pasek górny

Logo `Logo` po lewej, mała pigułka „Pobierz” po prawej (kotwica do sekcji 7). Bez menu. Na telefonie pasek nie jest przyklejony, żeby nie zabierał miejsca.

### 2. Hero

- **H1:** Aplikacja, która ratuje _życie_.
- **Podtytuł:** Mówi, co zrobić teraz: krok po kroku, z oficjalnych poradników. Działa bez internetu.
- **Przycisk `action`:** Pobierz na Androida → na Androidzie od razu pobiera APK, na komputerze przewija do kodu QR (sekcja 7).
- **Link drugorzędny:** Zobacz, jak działa ↓
- **Linia pod spodem:** „Bezpłatnie. Bez konta.” Bez „Nie zastępuje 112” w hero (decyzja 21.11). Zastrzeżenie zostaje w zamknięciu, w pytaniach i w stopce.
- **Obraz:** telefon z ekranem startowym „Co się dzieje?” i czterema kafelkami (ekran A). Na desktopie po prawej, na telefonie pod przyciskiem.
- Inspiracja: Calmaria (dwutonowy nagłówek), Claude Download (jedna pigułka, wyśrodkowanie).

### 3. Demo: zapytaj, jak człowieka

- **H2:** Opisz, co się dzieje. Bezpiecznik powie, co robić.
- Composer jak w aplikacji (`Composer`) z czterema chipami (`QuickActions`), tymi samymi co w aplikacji: Ktoś nie oddycha · Brak prądu · Alarm / schron · Ewakuacja.
- Dotknięcie chipa pokazuje **nagraną, prawdziwą odpowiedź aplikacji**: wiadomość użytkownika, kroki (`StepsPanel`), chipy źródeł (`SourceChip`) z nazwą poradnika i stroną. Zgodnie z [sekwencją odpowiedzi](../08-design-system/motion.md): kroki wchodzą `bz-anim-stream`, źródła na końcu `bz-anim-fade`.
- Pole tekstowe nie wysyła nic na serwer. Wpisanie własnego pytania pokazuje: „Pełne odpowiedzi działają w aplikacji, bez internetu” i przycisk pobierania.
- Bez JS: pierwsza odpowiedź (Brak prądu) jest wyrenderowana w HTML.
- Inspiracja: openai.com (hero jako composer).

### 4. Korzyści, każda z jednym ekranem

Pięć bloków. Na desktopie tekst i telefon na zmianę stron, na telefonie tekst nad ekranem. Każdy blok ma nagłówek-korzyść, jedno zdanie i jeden ekran.

| Korzyść (H3) | Zdanie | Ekran |
|---|---|---|
| Prowadzi przez RKO, gdy trzęsą się ręce. | Odlicza tempo uciśnięć, liczy cykle i przypomina o zmianie ratownika. Przycisk 112 jest zawsze na górze. | C. Karta RKO |
| Odpowiada z poradników, nie z głowy. | Każdy krok ma źródło i numer strony. Gdy poradnik czegoś nie opisuje, Bezpiecznik mówi to wprost. | B. Odpowiedź ze źródłem |
| Działa, gdy znika internet. | Mapa, najbliższy schron i kompas działają w trybie samolotowym. | E. Kompas do schronu |
| Zna twój dom. | Niemowlę, leki w lodówce, 7. piętro: rady są dla was, nie ogólne. | F. Profil domu |
| Jedno dotknięcie do pomocy. | SOS jest w rogu każdego ekranu. Najpierw 112, potem SMS do bliskich z twoją lokalizacją. | D. Panel SOS |

Inspiracja: ChatGPT overview (zakładki obok ekranu), Linear (prawdziwy interfejs jako obraz).

### 5. Prywatność i uczciwość

Dwie kolumny z pionowym separatorem (wzór: Cozy):

- **Nic nie wychodzi z telefonu.** Bez konta i bez serwera. Profil domu, rozmowy i lokalizacja zostają u ciebie. SMS do bliskich wysyłasz sam.
- **Nie zgaduje.** Gdy źródła czegoś nie opisują, odpowiada: „Nie wiem. Moje źródła tego nie opisują.” Nie diagnozuje i nie dobiera leków.

Pod spodem jedna linia (wzór: Calmaria, Signal): **Bez konta. Bez reklam. Bez internetu.**

Ikony przy twierdzeniach w `ink-200`, nie w zieleni `verified`. Zieleń jest zarezerwowana dla „to jest ze źródła oficjalnego”.

### 6. Źródła

- **H2:** Wiedza z oficjalnych poradników
- Lista nazw tekstem: Poradnik bezpieczeństwa (RCB, MON, MSWiA), „Nim nadejdzie dzień” (Akademia Pożarnicza), materiały PSP, wytyczne Polskiej Rady Resuscytacji (ERC 2025), mapa schronów PSP i OpenStreetMap. Lista musi zgadzać się z [Źródłami wiedzy](../04-dane/zrodla-wiedzy.md).
- **Bez logotypów instytucji.** Pod listą: „Bezpiecznik nie jest aplikacją rządową. Cytuje publiczne poradniki i podaje, skąd pochodzi każda rada.”

### 7. Pobierz

Dwie karty obok siebie (na telefonie jedna pod drugą). Wzór: Claude Download, ChatGPT Download.

- **Karta Android:** wersja, data, rozmiar, przycisk `action` „Pobierz APK”, a pod nim zwinięta suma SHA-256 z przyciskiem „Kopiuj”.
- **Karta „Na komputerze?”:** kod QR prowadzący na krótki adres (np. `bezpiecznik.edu.pl/pobierz`) i ten adres tekstem pod kodem, do przepisania ręcznie.
- **Wykrywanie platformy:** na Androidzie karta QR się chowa. Na iPhonie zamiast przycisku jest informacja: „Na razie tylko Android. Wersja na iPhone'a jest w planach.”
- **Dobrze wiedzieć:** tylko praktyczne wskazówki dla odbiorcy: pobieraj przez Wi-Fi, zostaw około 3 GB wolnego miejsca. Bez szczegółów technicznych o modelu (decyzja 21.11).

### 8. Instalacja z pliku APK

Trzy kroki w stylu `StepsPanel`, każdy z prawdziwym zrzutem z Androida (okno przeglądarki, zgoda na nieznane źródła, instalator):

1. Pobierz plik i otwórz go z powiadomienia.
2. Zezwól przeglądarce na instalowanie aplikacji. Zgodę możesz potem cofnąć.
3. Dotknij „Zainstaluj”.

### 9. Pytania

Akordeon, 6 pytań, pierwsze otwarte:

1. Czy instalacja spoza Google Play jest bezpieczna?
2. Czy naprawdę działa bez internetu?
3. Ile miejsca zajmuje?
4. Czy zastępuje telefon pod 112? (Nie. I dlaczego.)
5. Skąd Bezpiecznik bierze odpowiedzi?
6. Czy jest wersja na iPhone'a?

### 10. Zamknięcie i stopka

- Hasło z filmu, żeby landing i film mówiły jednym głosem: **Internet znika pierwszy. Bezpiecznik zostaje.** Pod nim ten sam przycisk co w hero.
- Stopka: „Bezpiecznik podpowiada na podstawie oficjalnych poradników. Nie zastępuje 112 ani porady lekarza.”, prywatność, licencje (OpenStreetMap, fonty OFL), kontakt.

## Ekrany aplikacji na landingu

Sześć ekranów. Podstawa to aplikacja z 21.11 rano (zrzuty z nocnej zmiany, kopie w [`ekrany/`](ekrany/)). Dopracowanie jest **delikatne**: ta sama aplikacja, tylko ciszej i równiej. Te same zmiany trafiają potem do Fluttera.

**Zasady dopracowania (wszystkie ekrany):**

- Mniej linii. Karty i kafelki wypełnione `bg-100` bez ramki albo z ramką `line-100` zamiast `line-150`.
- Ikony jednym kolorem (`ink-200`). Czerwień (`sos`) tylko dla SOS i 112. Dziś serce na kafelku „Ktoś nie oddycha” jest czerwone.
- Liczby (czas, metry, tempo) cyframi tabelarycznymi i większe.
- Wyspa i przycisk SOS bez zmian: mają być rozpoznawalne w tym samym miejscu.
- Makiety DS (`ScreensChat`, `ScreensMap`) wciąż mają pigułkę stanu, usuniętą decyzją z 21.11. Do usunięcia przy budowie ekranów.

| Ekran | Dziś | Dopracowanie |
|---|---|---|
| **A. Start „Co się dzieje?”** ([zrzut](ekrany/a-start.jpg)) | 4 kafelki z ramkami, czerwone serce, mały tekst „Działa bez internetu” | Kafelki bez ramek, ikony `ink-200`, więcej oddechu nad nagłówkiem |
| **B. Odpowiedź ze źródłem** ([zrzut](ekrany/b-odpowiedz.jpg)) | Odpowiedź o pożarze: karta „Wezwij pomoc”, pod nią kroki z chipem „Poradnik RCB 2025, s. 31” | Na landing spokojniejszy temat (blackout): numerowane kroki, chipy źródeł, jeden kadr z podglądem strony PDF (`QuotePanel`) |
| **C. Karta RKO** ([zrzut](ekrany/c-rko.jpg)) | Gęsto: 112, Powiadom bliskich, kontakty, GPS, 999/998/997, instruktor | Instruktor w trakcie (licznik, tempo 110/min). Numery 999/998/997 zostają widoczne (decyzja z `fbe50c2`), ale jako jeden cichy rząd. „Dodaj kontakty” i GPS pod „Więcej” |
| **D. Panel SOS** ([zrzut](ekrany/d-sos.jpg)) | Dobry | Bez zmian poza ramkami. Pokazujemy przełącznik „Dołącz dane z profilu” |
| **E. Kompas do schronu** ([zrzut](ekrany/e-kompas.jpg), tryb bardzo dużego tekstu) | Biała strzałka, „810 m, południowy zachód”, cel „Schron, Punkt bez nazwy”, ucięte „Pokaż …” przy dużym tekście | Igła w kolorze `signal` (zgodnie z DS: igła kompasu to ochra). Większe metry. Zamiast „Punkt bez nazwy” adres lub ulica z OSM. Najmocniejszy kadr na „działa bez internetu” |
| **F. Profil domu** ([zrzut](ekrany/f-profil.jpg)) | Lista liczników | Grupy w kartach, ikony sekcji `ink-300`. W kadrze: niemowlę, insulina, 7. piętro |

**Skąd treść na ekranach:** tylko z prawdziwych odpowiedzi aplikacji (zapis wyjścia z emulatora). Żadnych wymyślonych odpowiedzi. Jeśli karta ratunkowa ma jeszcze znaczek „Do weryfikacji”, na landingu też go ma.

## Technologia

- **Statyczna strona** w `web/` (zastępuje stronę pobierania z nocnej zmiany). Bez serwera aplikacji, bez kont, bez ciasteczek i analityki, więc bez banera cookies. To też korzyść, którą pokazujemy.
- **Ekrany telefonów** budowane z komponentów DS (React, `bundle.js`) i **prerenderowane do HTML** przy budowie strony. Ekrany są ostre w każdej skali, a landing staje się wzorcem dla aplikacji.
- **Treść widoczna bez JavaScriptu.** JS robi tylko trzy rzeczy: zmiana słowa w haśle, demo czatu, wykrywanie platformy. Wzór, którego unikamy: Claude Download na telefonie przed animacją pokazuje pusty ekran.
- **Waga:** pierwszy ekran poniżej 200 KB (HTML, CSS, JS i fonty 53 KB z `08-design-system/fonts/`, lokalnie, nie z Google Fonts). Obrazy WebP, ładowane leniwie poniżej pierwszego ekranu. Bez wideo w tle.
- **Rozmiar nagłówków:** DS kończy się na `step` 20/28. Dodajemy token `display` (na telefonie 34/38, na desktopie 52/56), tylko dla landingu.

## Ruch na landingu

Zgodny z [Ruchem](../08-design-system/motion.md): przenikanie, przesunięcie o 8 px (`space-2`), 300 ms `ease-out`, bez odbić i parallaxy.

- **Wejście przy przewijaniu** (`web/src/reveal.ts`): nagłówki sekcji, karty, telefony, akordeon. Kaskada co 70 ms, najwyżej 5 kroków. Animujemy tylko elementy, które przy załadowaniu są poniżej ekranu. Bez JS i przy ograniczonym ruchu wszystko jest widoczne od razu.
- **Karty-powiadomienia** (`FloatCard`) przychodzą 220 ms po swoim telefonie, z 96 % skali. W hero to samo w czystym CSS po załadowaniu (0,9 s i 1,5 s).
- **Zdania dwutonowe** rozjaśniają się przy przewijaniu (CSS `animation-timeline: view()`, bez JS). Przeglądarki bez wsparcia pokazują kolory docelowe.
- **Hasło:** jeden obieg słów, stop na „życie”.
- **Makiety nigdy nie dzwonią:** ekrany telefonów mają `inert`, a 112 w demie blokuje CSS od pierwszej klatki.

## Kolejność prac (gdy ruszymy)

| # | Etap | Gotowe, gdy |
|---|---|---|
| 1 | Hasło i teksty | Właściciel akceptuje teksty sekcji 2–10 |
| 2 | Ekrany A–F z komponentów DS | 6 ekranów 390 × 844 z prawdziwą treścią, zaakceptowanych przez właściciela |
| 3 | Szkielet strony w `web/` | Wszystkie sekcje, 390 / 768 / 1440 px bez poziomego przewijania |
| 4 | Pobieranie | Wykrywanie platformy, QR, SHA-256, zrzuty instalacji z prawdziwego Androida |
| 5 | Kontrola | Działa bez JS, z `prefers-reduced-motion`, kontrast AA, polskie znaki, czytnik ekranu czyta hasło raz |
| 6 | Aplikacja pod landing | Zmiany z tabeli ekranów we Flutterze, zrzuty aplikacji zgodne z ekranami landingu |

## Blokery przed publikacją

1. **Model AI (2,6 GB) w paczce z aplikacją.** Decyzja 21.11: model będzie pobierany razem z aplikacją (zespół robi poprawkę). Landing nie pisze o modelu. Do publikacji potrzebny jest APK z tą poprawką; rozmiar w karcie pobierania aktualizuje się sam z `npm run release`.
2. **Karty ratunkowe „Do weryfikacji”.** Hasło „ratuje życie” obok niezweryfikowanej karty RKO to ryzyko. Weryfikacja treści przez osobę z uprawnieniami przed publikacją.
3. **Domena i hosting** (otwarte w [Dystrybucji](../05-technologia/dystrybucja.md)).

## Do decyzji

1. **Hasło:** „ratuje życie” (jak chce właściciel) czy „pomaga ratować życie” (bezpieczniej wobec Zasad). Plus kolejność słów.
2. **Ekrany:** makiety HTML z komponentów DS (rekomendacja: ostre, wzorzec dla aplikacji) czy zrzuty z emulatora (prawdziwe, ale bez dopracowania).
3. ~~**Model:** pobieranie w aplikacji czy start bez AI.~~ Rozstrzygnięte 21.11: model pobierany razem z aplikacją.
4. **Etykiety 112:** zostają wielkie litery („ZADZWOŃ 112”) czy zdaniowe („Zadzwoń pod 112”), spokojniej i zgodnie z resztą DS.
5. **Domena:** `bezpiecznik.edu.pl` (jak nazwa repozytorium)?

## Poza zakresem planu

- Wersja angielska strony.
- Blog, aktualności, strona „o nas”.
- iOS (TestFlight / App Store).
- Statystyki odwiedzin. Gdyby były potrzebne, to tylko bez ciasteczek i po stronie serwera (logi), zgodnie z obietnicą „nic nie wychodzi”.
