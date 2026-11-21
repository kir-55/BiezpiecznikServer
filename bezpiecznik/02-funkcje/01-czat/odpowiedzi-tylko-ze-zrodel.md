# Odpowiedzi tylko ze źródeł

**Priorytet:** P0 (najważniejsza funkcja) · **Gdzie:** czat · **Offline:** tak

## Co robi

Gwarantuje, że Bezpiecznik nie zmyśla. Każda instrukcja pochodzi z oficjalnego źródła z [bazy wiedzy](../../04-dane/zrodla-wiedzy.md), a gdy źródła milczą, aplikacja odmawia odpowiedzi.

## Cztery warstwy ochrony

1. **Próg wyszukiwania.** Pytanie, do którego nie pasuje żaden fragment źródeł, w ogóle nie trafia do modelu. Odpowiedź: jedna z dwóch [odmów](#odmowa).
2. **Zamknięty format.** Model może zwrócić tylko panele z listy i musi przy każdym kroku podać identyfikator fragmentu źródła.
3. **Sprawdzenie po odpowiedzi.** Kod porównuje każdy krok z cytowanym fragmentem (słowa kluczowe, liczby, dawki, czasy). Krok bez pokrycia jest usuwany. **Zaprzeczenia:** gdy krok i fragment różnią się obecnością „nie” (lub „nigdy”, „zakaz”) przy tym samym czasowniku, krok jest usuwany (pokrycie słów nie odróżnia „nie wchodź do windy” od „wchodź do windy”). Model pisze, walidator sprawdza: decyzja z 2026-11-21. Uzasadnienie personalizacji (np. „bo: 7. piętro”) dokleja aplikacja z profilu, nie model, żeby walidator go nie wycinał. Gdy nie zostanie żaden krok, aplikacja pokazuje same fragmenty źródłowe.
4. **Widoczne źródło.** Każdy krok ma chip z dokumentem i stroną. Tryb „pokaż źródła” podświetla w PDF zdanie, z którego pochodzi krok.

## Czego model nie robi nigdy

- Nie podaje dawek leków, których nie ma dosłownie w źródle.
- Nie diagnozuje.
- Nie odpowiada na pytania spoza tematu bezpieczeństwa.
- Nie uczestniczy w ścieżce zagrożenia życia (ją obsługują [karty ratunkowe](../02-pierwsza-pomoc/karty-ratunkowe.md)).

## Zestaw testowy

Aplikacja ma stały zestaw co najmniej 50 pytań: część z oczekiwaną odpowiedzią i źródłem, co najmniej 15 z oczekiwaną odmową. Część pytań piszą osoby spoza zespołu, żeby test nie był dopasowany do autorów. Wynik testu (np. „15 z 15 odmów, 47 z 50 poprawnych cytatów”) jest publiczny i stanowi dowód, że aplikacja nie zmyśla.

## Odmowa

Są dokładnie dwa teksty odmowy (`origin: refusal`, pole `text`). Innych wersji nie ma.

| Odmowa | Tekst | Kiedy |
|---|---|---|
| `not_in_sources` „brak w źródłach” | Nie wiem. Moje źródła tego nie opisują. Zapytaj lekarza, farmaceutę albo właściwą instytucję. | Domyślna. Wyszukiwanie poniżej progu, a wiadomość zawiera choć jedno słowo z dziedziny: frazy kart, [frazy ryzyka, intencje, synonimy](../../04-dane/kontrakty-tresci.md). Spokojna, bez 112 (komponent `NoSource`, z podpowiedzią, gdzie szukać). Gdy wiadomość zawiera frazę ryzyka, aplikacja dodaje szablon `call` (reguła bez zmian) |
| `off_topic` „poza tematem” | Pomagam tylko w sytuacjach kryzysowych i bezpieczeństwie. Tego nie opisują moje źródła. | Wyszukiwanie poniżej progu i żadnego słowa z dziedziny. Też bez 112, żeby nie odsyłać na numer alarmowy z pytaniem niezwiązanym z bezpieczeństwem |

Przy wątpliwości wygrywa „brak w źródłach”. Przycisk SOS jest widoczny przy obu odmowach.

### Przykłady

| Pytanie | Odmowa |
|---|---|
| „Jaką dawkę ibuprofenu dać psu?” | brak w źródłach |
| „Jak naprawić agregat?” | poza tematem |
