# Ruch

Styl ChatGPT: ruch jest **krótki, cichy i informacyjny**. Mówi „coś się pojawiło” albo „model pracuje”, nigdy nie zabiega o uwagę. W aplikacji kryzysowej to podwójnie ważne: nic nie miga, nic nie odbija, nic nie trzęsie się, nawet karta 112.

## Zasady

1. **Wejścia hamują** (`ease-out`), wyjścia przyspieszają (`ease-in`) i trwają krócej niż wejścia.
2. **Mały dystans.** Wiadomości wjeżdżają o 4 px, menu rośnie od 96%. Bez przelotów przez pół ekranu.
3. **Maksymalnie 300 ms** dla każdego przejścia. Dłużej trwają tylko pętle statusu (kropka, połysk).
4. **Bez sprężyn i odbić.** Żadnych `bounce`, `overshoot` ani parallaxy.
5. **Bez migania.** Nic nie miga szybciej niż 3 razy na sekundę (ryzyko napadu u osób z padaczką światłoczułą). Karta 112 pojawia się zwykłym `bz-anim-enter`.
6. **Ograniczony ruch.** Gdy system ma włączone `prefers-reduced-motion`, zostaje samo przenikanie, a pętle stają.

## Tokeny

| Token | Wartość | Do czego |
| --- | --- | --- |
| `duration-fast` | 150 ms | hover, wciśnięcie, focus, menu |
| `duration-base` | 200 ms | wiadomość, karta, zanikanie |
| `duration-slow` | 300 ms | panel od dołu, zmiana ekranu |
| `duration-stream` | 300 ms | przenikanie każdego fragmentu strumienia |
| `duration-pulse` | 1200 ms | pętla kropki „myślę” |
| `duration-shimmer` | 2000 ms | pętla połysku tekstu statusu |
| `ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | wszystko, co się pojawia |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | zmiany w miejscu, pulsowanie |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | zamykanie |
| `ease-sheet` | `cubic-bezier(0.32, 0.72, 0, 1)` | panel od dołu |

## Gotowe klasy (`bundle.css`)

| Klasa | Efekt | Gdzie |
| --- | --- | --- |
| `bz-anim-enter` | przenikanie + 4 px w górę, 200 ms | nowa wiadomość (Message robi to sam), karta, NoSource, 112 |
| `bz-anim-stream` | przenikanie 300 ms | **każdy nowy fragment** odpowiedzi podczas strumieniowania |
| `bz-anim-fade` / `bz-anim-fade-out` | przenikanie | chipy źródeł po zakończeniu strumienia, znikające elementy |
| `bz-anim-pop` | skala 96% → 100% + przenikanie, 150 ms | menu, podpowiedzi; punkt zaczepienia przez `--bz-origin` |
| `bz-anim-sheet-in` / `-out` | wjazd od dołu 300 ms / zjazd 200 ms | panel mapy, podgląd źródła |
| `bz-anim-scrim` | przyciemnienie tła 300 ms | pod panelem |
| `bz-shimmer` | przesuwający się połysk tekstu | status „Szukam w…” (komponent `Thinking`) |

## Sekwencja odpowiedzi (jak w ChatGPT)

1. Wiadomość użytkownika: `bz-anim-enter`.
2. `Thinking`: pulsująca kropka + „Szukam w Poradniku bezpieczeństwa…”.
3. Pierwszy fragment odpowiedzi: `Thinking` znika, a każdy kolejny fragment tekstu wchodzi w `<span class="bz-anim-stream">`.
4. Koniec strumienia: chipy źródeł pojawiają się przez `bz-anim-fade`. **Źródła na końcu, nie w trakcie**, bo dopiero wtedy wiadomo, z których stron model skorzystał.
5. Przewijanie do nowej treści: `scroll-behavior: smooth` tylko wtedy, gdy użytkownik jest już na dole czatu. Nie przewijaj, jeśli przewinął wyżej i czyta.
