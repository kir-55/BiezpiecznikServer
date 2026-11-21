# Panel alarmowy

**Priorytet:** P0 · **SMS do bliskich:** P1 · **Gdzie:** Panel Kontakt ze służbami ([opis](../../03-ekrany/panel-2-kontakt-ze-sluzbami.md), otwiera go przycisk SOS), czat (template `call`) · **Offline:** tak

## Co robi

Zbiera w jednym miejscu wszystko, czego potrzeba przy wzywaniu pomocy.

## Zawartość

Na wierzchu tylko dwa duże przyciski (komponent `CallPanel`, po 80 px):

- **Zadzwoń 112**, pierwszy przycisk.
- **Powiadom bliskich** (SMS z lokalizacją, patrz niżej), z przełącznikiem „Dołącz dane z profilu”.

Pod nimi linia stanu GPS i wiersz **„Więcej”** (domyślnie zwinięty). Po rozwinięciu:

- Przyciski: **999** Pogotowie Ratunkowe, **998** Straż Pożarna, **997** Policja.
- **Twoja pozycja:** współrzędne w stopniach dziesiętnych i w stopniach, minutach, sekundach.
- **Najbliższy adres** z offline'owej bazy adresów województwa (po MVP).
- **Informacja o AML:** „Przy połączeniu z 112 telefon sam przekazuje lokalizację, jeśli ma zasięg sieci komórkowej.”
- „Co powiedzieć dyspozytorowi”: co się stało, gdzie, ile osób, czy są przytomne.

## Powiadom bliskich: SMS do bliskich (P1)

- Gotowy SMS do kontaktów ICE z profilu: współrzędne, adres i kluczowe dane z profilu.
- Aplikacja otwiera systemowy edytor SMS, wiadomość wysyła użytkownik. Aplikacja nigdy nie wysyła niczego sama.
- SMS często dochodzi, gdy nie działa internet mobilny.

## Ograniczenia

W Polsce nie ma publicznego API do 112 ani do powiadomienia o RKO (jest tylko oficjalna aplikacja Alarm112 MSWiA), więc Bezpiecznik nie zgłasza zdarzeń sam.

Aplikacja nie może przekazać lokalizacji do służb bez sieci komórkowej. Bez zasięgu pokazuje współrzędne do przekazania później i [sygnał ratunkowy](sygnal-ratunkowy.md).
