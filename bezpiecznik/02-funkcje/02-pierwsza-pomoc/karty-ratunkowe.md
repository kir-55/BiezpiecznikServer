# Karty ratunkowe

**Priorytet:** P0 · **Gdzie:** czat (szablony, bez AI) · **Offline:** tak

## Co robi

Daje natychmiastową instrukcję w zagrożeniu życia, jako wiadomość w czacie (nie osobny ekran). Karty są przygotowane zawczasu jako dosłowne wyciągi z oficjalnych źródeł, sprawdzone przez człowieka. Nie generuje ich model AI.

## Karty

| Karta | Warianty | Źródło |
|---|---|---|
| Resuscytacja (RKO) | Dorosły, dziecko, niemowlę | Wytyczne PRC/ERC 2025 |
| Zadławienie | Dorosły, dziecko, niemowlę; przytomny i nieprzytomny | Wytyczne PRC/ERC 2025 |
| Krwotok i tamowanie | Ucisk, opatrunek uciskowy, opaska uciskowa | Wytyczne pierwszej pomocy ERC 2025 |
| Oparzenie | Termiczne, chemiczne | Wytyczne pierwszej pomocy ERC 2025 |
| Utrata przytomności | Najpierw sprawdzenie oddechu, potem pozycja bezpieczna | Wytyczne PRC/ERC 2025 |
| Wstrząs | Rozpoznanie i postępowanie | Wytyczne pierwszej pomocy ERC 2025 |

## Jak się otwiera

Dwie niezależne drogi, żeby karta zawsze była osiągalna:

1. **Przycisk:** „Ktoś nie oddycha” na pustym nowym czacie.
2. **Rozpoznanie frazy w czacie:** lista fraz z dopasowaniem przybliżonym („nie oddycha”, „dławi się”, „krwawi”, „nieprzytomny”), odporna na literówki.

Karta wstawia się do czatu w mniej niż sekundę i nie zależy od lokalnego AI. Działa, nawet gdy model się nie załadował.

### Pierwszeństwo fraz i wariant

- „nieprzytomny i nie oddycha” i samo „nie oddycha” zawsze otwierają kartę RKO, nawet gdy wiadomość zawiera też „nieprzytomny”. Karta „Utrata przytomności” otwiera się tylko na „nieprzytomny” bez „nie oddycha”.
- Wariant ustawiają słowa z frazy: dziecko, dziecka, syn, córka → `child`; niemowlę, niemowlak, bobas, noworodek → `infant`. Bez takiego słowa: pierwszy wariant (dorosły). Reguła: [warianty](../../03-ekrany/szablony-czatu.md#warianty). Lista słów i fraz leży w pliku karty ([kontrakt karty](../../04-dane/kontrakty-tresci.md#karta-ratunkowa)).

### Utrata przytomności → RKO

Karta „Utrata przytomności” zaczyna się od kroku „Sprawdź oddech: patrz, słuchaj, czuj do 10 s” i przycisku „Nie oddycha → RKO”. Przycisk wstawia kartę RKO jako nową wiadomość z tym samym wariantem. Pozycja bezpieczna jest dopiero w kolejnych krokach.

## Budowa karty

Karta to jedna wiadomość złożona z szablonów czatu ([szablony czatu](../../03-ekrany/szablony-czatu.md)): `call` + `steps` z wariantami + `animation` + `cpr`.

- `call` na górze: przycisk **112**.
- `steps`: przełącznik wariantu (dorosły, dziecko, niemowlę), który przełącza całą wiadomość, i kroki z przyciskiem „zrobione”.
- `animation`: animacja GIF kroku.
- Kroki czyta głos (synteza mowy offline) tylko po dotknięciu „Czytaj na głos”. Komendy głosowe `cpr` są mówione zawsze, bez przycisku (chyba że głos wyłączono w Ustawieniach).
- Na dole: chip źródła z datą wytycznych.
- Przy RKO: `cpr`, czyli [instruktor RKO](instruktor-rko.md) przypięty nad polem wiadomości.

## Zasady treści

- Tekst karty to wyciąg ze źródła, nie parafraza modelu.
- Każdą kartę przed publikacją sprawdza ratownik medyczny lub instruktor PRC.
- Komunikat na każdej karcie: „Ta instrukcja nie zastępuje połączenia z 112.”
