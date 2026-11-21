# Message

Wiadomość w czacie, jak w ChatGPT: **użytkownik** w dymku po prawej (`bg-200`, `radius-lg` 18 px, max 70% szerokości), **asystent** bez dymka, tekst na całą szerokość (`chat` 17/26).

- `sources` — chipy `SourceChip` pod odpowiedzią. **Każda odpowiedź asystenta z poradą ma co najmniej jedno źródło**; bez źródła odpowiedzią jest `Fallback112`.
- `actions` — przyciski `ghost` `sm` (kopiuj, udostępnij, czytaj na głos).
- Odstęp między wiadomościami: `space-5` (24 px).
