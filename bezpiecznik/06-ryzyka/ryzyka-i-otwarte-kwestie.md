# Ryzyka i otwarte kwestie

| Ryzyko | Skutek | Jak ograniczamy |
|---|---|---|
| AI poda instrukcję spoza źródeł | Zagrożenie dla zdrowia, utrata zaufania | Cztery warstwy ochrony, zestaw testowy, karty ratunkowe bez AI |
| Brak dostępu do danych schronów PSP | Niepełna mapa | Wniosek do KG PSP; do tego czasu punkty przepisane ręcznie ze źródłem; OSM jako niepotwierdzone |
| Punkt na mapie nie istnieje lub jest zamknięty | Użytkownik idzie w złe miejsce | Status potwierdzony / niepotwierdzony, data weryfikacji, dostępność całodobowa |
| Licencje treści | Brak prawa do publikacji | Zgody wydawców przed publikacją ([licencje](../04-dane/licencje.md)) |
| Nieaktualne źródła | Instrukcje według starych wytycznych | Data przy każdym źródle, aktualizacje bazy |
| Zużycie baterii przez AI | Telefon rozładowany w blackoucie | Tryb kryzysowy, tryb bez AI poniżej progu baterii |
| Wolny model na słabszym telefonie | Długie czekanie na odpowiedź | Mniejszy model, tryb bez AI, karty ratunkowe bez modelu |
| Duże paczki do pobrania | Użytkownik nie pobierze danych przed kryzysem | Mapa uproszczona i karty w instalacji, reszta w tle przez Wi-Fi |
| Wymagania sklepów | Odrzucenie aplikacji | Sprawdzenie zasad Google Play i App Store przed publikacją |
| Utożsamienie z aplikacją rządową | Zarzut dublowania „Gdzie się ukryć” | Jasne pozycjonowanie: „oni mówią gdzie, my co zrobić teraz” |

## Otwarte kwestie

- Wybór konkretnego modelu AI po pomiarach na telefonie.
- Próg pewności wyszukiwania i reguły sprawdzania odpowiedzi.
- Źródło danych o punktach poboru wody w gminach.
- Źródło wiarygodnych danych o AED.
- Format i harmonogram aktualizacji paczek.
- Hosting paczek danych (model, baza wiedzy, mapy, manifest) na tym samym statycznym serwerze co APK: do potwierdzenia ([dystrybucja](../05-technologia/dystrybucja.md)).
- Instalacja APK z nieznanych źródeł jest uciążliwa dla użytkowników: instrukcja i ewentualna późniejsza dystrybucja przez sklepy.
