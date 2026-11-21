# Panele w czacie

**Priorytet:** P0 · **Gdzie:** odpowiedzi w czacie · **Offline:** tak

## Co robi

Odpowiedź Bezpiecznika nie jest ścianą tekstu, tylko zestawem gotowych paneli. Model wybiera panele z zamkniętej listy i wypełnia je treścią ze źródeł.

## Typy paneli

| Panel | Zawartość | Przykład |
|---|---|---|
| `steps` | Numerowane kroki po kolei, każdy z przyciskiem „zrobione” | Co zrobić w pierwszej godzinie blackoutu |
| `bullets` | Lista punktowana bez kolejności | Co zabrać do schronu |
| `map` | Miniatura mapy z najbliższym punktem, odległością i przyciskiem „Prowadź” | Najbliższy schron 450 m |
| `animation` | Krótka animacja (GIF) | Ułożenie dłoni przy RKO |
| `call` | Dwa przyciski: „Zadzwoń 112” i „Powiadom bliskich”; zwinięte „Więcej”: 999, 998, 997, współrzędne | Po opisie wypadku |
| `signal` | Dźwięk SOS, latarka, stroboskop | Zagubienie w terenie |
| `quote` | Cytat, dokument, strona, data wydania; okno PDF z podświetlonym fragmentem, do rozwinięcia na pełny ekran | Osobny szablon pod odpowiedzią; pod każdym krokiem jest tylko chip źródła |
| `cpr` | Instruktor RKO przypięty nad polem wiadomości na czas działania | „Ktoś nie oddycha” |

Wygląd i pola: [../../03-ekrany/szablony-czatu.md](../../03-ekrany/szablony-czatu.md)

## Zasady

- Każdy panel z treścią ma co najmniej jedno źródło.
- Panel `call` pojawia się zawsze, gdy sytuacja może zagrażać życiu.
- Kroki są krótkie: jeden czasownik, jedna czynność.
- Panele działają też w [trybie bez AI](czat.md#tryb-bez-ai), wypełnione bezpośrednio fragmentami źródeł.
