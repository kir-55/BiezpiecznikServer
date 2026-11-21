# CprCard · CprPinned

Szablon `cpr`, tylko w karcie RKO (bez modelu AI).

- `CprCard` — w wiadomości: wariant · tempo · proporcje, **Zacznij uciskanie** (44 px, `primary`). Po starcie skrót „Instruktor RKO działa ↓”, po zakończeniu podsumowanie i „Zacznij od nowa”.
- `CprPinned` — przypięty nad polem wiadomości, widoczny przy przewijaniu. Spokojnie, jak karta w ChatGPT: tło `bg-200`, bez czerwonej ramki. Faza zwykłym zdaniem („Uciskaj”, „Dwa oddechy”) 28 px, licznik „17 z 30” obok, pod spodem jedna szara linia: wariant · czas · zmiana za. Przypomnienie o AED, **Pauza** i **Zakończ** po 44 px.
- Kropka obok fazy bije w tempie metronomu (`--bz-beat` = 60 / tempo). To funkcja, nie ozdoba — działa także przy ograniczonym ruchu i w motywie kryzysowym.
- `compact` — jedna linia przy otwartej klawiaturze.
- `changeAlert` — co 2 min: baner „Zmiana ratownika” i czerwona obwódka (jedyny moment, gdy karta jest czerwona).

Wartości proporcji i tempa przychodzą z karty sprawdzonej przez ratownika (PRC/ERC 2025). W podglądach są tylko przykładem formatu.
