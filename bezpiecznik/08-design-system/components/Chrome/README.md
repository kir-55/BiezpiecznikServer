# Chrome

Elementy globalne, renderowane w `RootOverlay` nad nawigatorem, nie w każdym ekranie. Bez pigułki stanu (offline · GPS · bateria) — usunięta 21.11: za dużo informacji na górze ekranu.

- `NavIsland` — lewy górny róg czatu: menu (panel boczny) i mapa. Pigułka 48 px, dwa przyciski po 44 px, tło `bg-200`, ramka `line-150`, `shadow-float`.
- `FloatingButton` — Wstecz (←), Zamknij (✕, podgląd PDF), wyśrodkuj (◎, mapa). Koło 48 px, ta sama wysokość co wyspa.
- `SosButton` — prawy górny róg **na każdym ekranie**, 56 px, `sos`. Dotknięcie → panel Kontakt ze służbami. Przytrzymanie 800 ms → wibracja i `tel:112`; w trakcie wypełnia się biała obwódka (jedyna animacja elementów globalnych, także w motywie kryzysowym). Zawsze najwyższa warstwa aplikacji.
- `CprIndicator` — na środku u góry innych ekranów, gdy działa instruktor RKO: kropka bije w tempie metronomu, czas, „wróć”.

Odstępy: 16 px od krawędzi, 48 px od góry (pod paskiem statusu). Pod elementami pływającymi gradient tła, żeby przewijana treść ich nie gryzła.
