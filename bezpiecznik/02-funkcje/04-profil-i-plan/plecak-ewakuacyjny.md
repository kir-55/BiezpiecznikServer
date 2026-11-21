# Plecak ewakuacyjny

**Priorytet:** P1 · **Gdzie:** czat · **Offline:** tak

## Co robi

Lista rzeczy (szablon `bullets` z haczykami) do plecaka ewakuacyjnego według oficjalnych materiałów (Poradnik bezpieczeństwa, PSP), uzupełniona o pozycje z profilu domu.

## Funkcje

- Lista podstawowa ze źródłem przy każdej pozycji.
- Pozycje dodane z profilu: leki domowników, rzeczy dla niemowlęcia, rzeczy dla zwierząt.
- Odhaczanie i data ostatniego sprawdzenia, zapisane w profilu, nie w wiadomości.
- Przypomnienia o terminach ważności (woda, żywność, baterie, leki): później.
- Braki (rzeczy z `checked = false`) czyta z profilu lista braków w [planie 72 h](plan-72h.md).

## Gdzie jest stan

Stan plecaka leży w [profilu](../../03-ekrany/ekran-4-profil.md) jako `supplies.kit[]`: `{ id, checked, checkedAt }` (`id` = identyfikator rzeczy z listy podstawowej albo z profilu). Wiadomość czatu (`bullets` `checkable`, elementy z `kit_id`) tylko go pokazuje i zmienia w profilu. Dzięki temu kilka wiadomości z plecakiem pokazuje ten sam stan, a usunięcie czatu go nie kasuje.
