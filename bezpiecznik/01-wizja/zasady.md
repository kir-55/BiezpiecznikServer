# Zasady

## Cele

- Działa w pełni w trybie samolotowym: czat, mapa, trasy, kompas, pierwsza pomoc, plan 72 h.
- Każda instrukcja ma źródło (dokument i stronę), które można otworzyć jednym dotknięciem.
- Gdy źródła nie zawierają odpowiedzi, aplikacja nie zgaduje: odmawia spokojnie tekstem „brak w źródłach” („Nie wiem. Moje źródła tego nie opisują. Zapytaj lekarza, farmaceutę albo właściwą instytucję.”, [odmowa](../02-funkcje/01-czat/odpowiedzi-tylko-ze-zrodel.md#odmowa)). 112 tylko przy możliwym zagrożeniu życia.
- Z każdego ekranu jedno dotknięcie SOS otwiera panel, w którym 112 to pierwszy i największy przycisk. Połączenie potwierdza systemowe okno telefonu. Przytrzymanie SOS od razu otwiera wybieranie 112.
- Nic nie opuszcza telefonu bez twojej wyraźnej akcji (wysłanie SMS-a, eksport profilu).
- Instrukcje ratujące życie działają nawet wtedy, gdy lokalne AI nie działa.

## Nie-cele

- Nie diagnozujemy chorób i nie dobieramy dawek leków.
- Nie budujemy własnego systemu ostrzegania (to robi Alert RCB).
- Nie zastępujemy mapy PSP „Gdzie się ukryć” ani numeru 112.
- Nie tworzymy kont użytkowników ani usług w chmurze.

## Anty-cele (porażka, nawet jeśli technicznie działa)

- AI podaje instrukcję medyczną, której nie ma w źródłach.
- W zagrożeniu życia użytkownik czeka na odpowiedź modelu zamiast od razu dostać kartę ratunkową.
- Aplikacja rozładowuje telefon w czasie blackoutu.
- Aplikacja prowadzi do punktu, który nie istnieje, i pokazuje go jako pewny.
- Lokalizacja lub dane o domownikach opuszczają telefon bez wyraźnej akcji użytkownika.

## Projektowanie pod stres

- Jedna decyzja na ekran, krótkie zdania, czasowniki w trybie rozkazującym.
- Duże cele dotyku, obsługa jedną ręką.
- Ważne akcje zawsze w tym samym miejscu (przycisk SOS w prawym górnym rogu każdego ekranu).
- Ciemny motyw w MVP. Tryb kryzysowy (czarne tło, wysoki kontrast, bez animacji) po MVP.
- Stan GPS i baterii widoczny tam, gdzie ma znaczenie (mapa, karta mapy, panel SOS).
- Uczciwość: każdy punkt na mapie i każde źródło ma datę i pochodzenie. Dane niepotwierdzone są wyraźnie oznaczone.
- Na zewnątrz nie używamy określeń typu „AI ratownik”. Bezpiecznik to asystent, który cytuje oficjalne źródła.
