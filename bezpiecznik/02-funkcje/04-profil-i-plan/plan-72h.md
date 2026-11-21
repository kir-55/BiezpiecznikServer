# Plan 72 h

**Priorytet:** P0 · **Gdzie:** czat · **Offline:** tak

## Co robi

Tworzy osobisty plan na pierwsze 72 godziny kryzysu, dopasowany do [profilu domu](profil-domu.md). Plan to odpowiedź w czacie (`steps` i `bullets` ze źródłami), zbudowana z reguł i profilu. Każdy punkt ma źródło.

## Jak powstaje

Plan powstaje z **reguł i źródeł**, a nie z wolnego tekstu modelu. Każda reguła łączy cechę profilu z fragmentem oficjalnego źródła.

| Cecha profilu | Przykładowy punkt planu |
|---|---|
| Niemowlę + blackout | Woda i mleko modyfikowane, utrzymanie ciepła dziecka |
| Insulina + blackout | Przechowywanie leku bez lodówki |
| 7. piętro bez windy | Wcześniejsza ewakuacja, zapas wody na miejscu |
| Koncentrator tlenu | Zasilanie awaryjne, wcześniejszy kontakt ze służbami |
| Zwierzę | Zapas karmy, transporter, smycz |

Treść każdego punktu i jego źródło pochodzą z [bazy wiedzy](../../04-dane/zrodla-wiedzy.md). Format reguł (po MVP): [`plan_rules.json`](../../04-dane/kontrakty-tresci.md#reguły-planu-72-h).

## Układ planu

- **Pierwsza godzina:** najpilniejsze czynności.
- **Pierwsza doba:** woda, ciepło, leki, łączność.
- **Doby 2–3:** zapasy, kontakt z bliskimi, ewentualna ewakuacja.
- **Lista braków:** czego brakuje w zapasach i w [plecaku](plecak-ewakuacyjny.md). Czytana z profilu (`supplies`, w tym `supplies.kit[]` z `checked = false`), nie z innych wiadomości czatu.

## Warianty

Plan ma wersje dla głównych scenariuszy: blackout, alarm i schronienie, ewakuacja, powódź. Czat wybiera właściwy wariant, gdy użytkownik opisze sytuację.

## Wydruk (P2, później)

Eksport do PDF i do druku. Plan na papierze, np. na lodówce, działa nawet przy rozładowanym telefonie.
