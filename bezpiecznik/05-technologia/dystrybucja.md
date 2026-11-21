# Dystrybucja

## MVP

- Zwykły statyczny serwer WWW, który serwuje plik instalacyjny aplikacji (Android APK) do pobrania przez link lub kod QR.
- Bez logiki po stronie serwera, bez danych użytkowników, bez kont.
- HTTPS.
- **Do potwierdzenia:** ten sam serwer może hostować paczki danych pobierane przez aplikację: model AI, bazę wiedzy, paczki map oraz manifest z wersjami i sumami kontrolnymi.
- Integralność: paczki są podpisane lub mają sumy kontrolne, aplikacja weryfikuje je przed użyciem ([prywatność i bezpieczeństwo](prywatnosc-i-bezpieczenstwo.md)).
- iOS nie jest dystrybuowany jako APK. App Store lub TestFlight: później.

## Później

Strona WWW w React: landing page, pobranie aplikacji, informacje o źródłach.

## Do decyzji

- Hosting (serwera plików i strony).
- Domena.
- Framework i bundler dla strony w React.
- Instrukcja instalacji z nieznanych źródeł na Androidzie (sideloading) dla użytkowników.
