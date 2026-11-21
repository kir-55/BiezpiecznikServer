# Onboarding · Profil

Elementy E0 (pierwsze uruchomienie), E3 (ustawienia) i E4 (profil).

- `StepHeader` — tytuł 24 px, „{n} z {m}”, `ProgressBar`.
- `PackageRow` — pole wyboru, nazwa, rozmiar, opis, stan: czeka · czeka na Wi-Fi · pasek z % i **Wstrzymaj** · ✓ gotowe (`verified`) · błąd + **Ponów** (`danger`) · Niedostępne na tym telefonie (przygaszony). `selectable: false` dla mapy dołączonej do instalacji.
- `QuestionStep` — pytanie otwierające sekcję profilu: 24 px, **Tak** / **Nie** po 56 px, **Pomiń** jako przycisk tekstowy.
- Formularze: `TextField`, `Segmented` (`allowEmpty` = trójstanowe Tak / Nie), `ChoiceChips`, „+ Dodaj …” jako `ghost`, **Dalej** `primary` na dole.
