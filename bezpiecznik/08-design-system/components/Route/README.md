# RouteBanner · RouteBar · CompassView

- `RouteBanner` — u góry w trybie `route`: kwadrat `signal` z dużą strzałką manewru (32 px), „Za 120 m w prawo” 20 px pogrubione, ulica pod spodem. Manewry: `left`, `right`, `slight-left`, `slight-right`, `straight`.
- `RouteBar` — dolny pasek: pozostała odległość i czas (22 px), **Kroki**, **Kompas**, **Zakończ** (`danger`).
- `CompassView` — pełnoekranowy, ciemny, bez mapy (oszczędza baterię). „Do: {rodzaj}, {nazwa}”, tarcza z dużą ochrową strzałką obróconą o `kierunek do celu − kurs`, odległość 48 px, kierunek świata słownie (8 kierunków), współrzędne. **Pokaż mapę** / **Zakończ**. `note` na komunikaty: kalibracja, brak GPS, brak magnetometru.
