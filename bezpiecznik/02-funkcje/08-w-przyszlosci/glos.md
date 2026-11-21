# Rozmowa głosowa

**Priorytet:** P2 · **Gdzie:** czat · **Offline:** tak

## Co robi

Pozwala rozmawiać z Bezpiecznikiem głosem, bez patrzenia na ekran i bez użycia rąk.

## Funkcje

- Przycisk mikrofonu w czacie: nagranie głosówki, transkrypcja na telefonie, tekst trafia do czatu jak wpisana wiadomość (użytkownik widzi transkrypcję).
- Komenda „Bezpiecznik, pomocy”.
- Rozpoznawanie mowy po polsku na telefonie, bez sieci.
- Odpowiedzi czytane na głos.
- Te same zasady co w czacie: [odpowiedzi tylko ze źródeł](../01-czat/odpowiedzi-tylko-ze-zrodel.md) i natychmiastowe [karty ratunkowe](../02-pierwsza-pomoc/karty-ratunkowe.md).

## Uwagi

Czytanie instrukcji na głos (synteza mowy) jest częścią P0 w instruktorze RKO i kartach ratunkowych. Do P2 należy tylko rozpoznawanie mowy użytkownika, bo mocno obciąża telefon i baterię.

## Model do transkrypcji (wybrany 2026-11-21)

| Rola | Model | Dlaczego | Ograniczenia |
|---|---|---|---|
| **Główny** | Gemma 4 E2B z wejściem audio, przez `flutter_edge_ai` | Ten sam model co czat: nie trzeba pobierać ani trzymać w pamięci drugiego modelu | Klip do 30 s (dłuższe głosówki ciąć na kawałki). Jakość polskiego niezweryfikowana. Gdy AI jest wyłączone (bateria, słaby telefon), transkrypcja też nie działa |
| **Zapasowy** | Whisper `small` (na słabszych telefonach `base`) przez `whisper_ggml` (whisper.cpp, MIT, Android i iOS) | Znana jakość wielojęzyczna, kod języka `pl`, działa niezależnie od modelu czatu | Osobny plik modelu do pobrania i dodatkowa pamięć |

Odrzucone: `whisper_flutter_new` (licencja GPL-3.0, pakiet nieaktualizowany), Vosk (`vosk_flutter` bez iOS), sherpa-onnx (nie znaleziono polskiego modelu), systemowe `speech_to_text` (tylko krótkie komendy, bez transkrypcji nagranych plików na Androidzie).

**Przed wyborem ostatecznym:** zmierzyć WER na 20–30 własnych polskich nagraniach (także w stresie, z hałasem) dla obu modeli oraz czas transkrypcji i zużycie baterii na telefonie docelowym.
