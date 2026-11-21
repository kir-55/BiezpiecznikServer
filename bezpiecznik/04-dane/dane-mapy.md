# Dane mapy

## Ulice i podkład mapy

| Źródło | Co daje | Uwagi |
|---|---|---|
| OpenStreetMap | Ulice, drogi, budynki, nazwy, kierunki ruchu | Darmowa mapa tworzona przez społeczność (jak Wikipedia dla map). Licencja ODbL wymaga podpisu „© OpenStreetMap contributors”. Gotowe narzędzia do kafelków offline i grafu tras |
| GUGiK: BDOT10k i PRG | Oficjalne drogi, budynki, punkty adresowe | Darmowe do pobrania z geoportal.gov.pl. Adresy PRG mogą zasilić bazę adresów do panelu alarmowego |

## Punkty schronienia

| Źródło | Status w aplikacji | Uwagi |
|---|---|---|
| Komenda Główna PSP (mapa „Gdzie się ukryć”, gdziesieukryc.pl) | **Potwierdzony** | Oficjalna baza, na stronie ok. 88,8 tys. punktów (stan z 20.11.2026). Brak potwierdzonego pliku z danymi do pobrania i brak licencji w publicznym repozytorium PSP. Wykorzystanie po uzyskaniu zgody KG PSP lub z ręcznie przepisanych punktów z podaniem źródła |
| Centralna ewidencja obiektów zbiorowej ochrony (Ministerstwo Cyfryzacji, PSP) | **Potwierdzony** | Budowana; dostępność danych do sprawdzenia |
| OpenStreetMap (np. `building=bunker`, `amenity=shelter`) | **Niepotwierdzony** | Wpisy wolontariuszy, niepełne i niesprawdzone przez PSP |

## Inne punkty

| Rodzaj | Źródło |
|---|---|
| Szpitale i SOR | Rejestr podmiotów wykonujących działalność leczniczą, OpenStreetMap |
| PSP i OSP | Dane PSP, OpenStreetMap |
| Studnie awaryjne i punkty poboru wody | Gminy, wodociągi (dane rozproszone, zbierane ręcznie) |
| Apteki | OpenStreetMap, rejestr aptek |
| AED | OpenStreetMap (`emergency=defibrillator`), lokalne rejestry |

## Zasady

- Każdy punkt ma pola `kind`, `source`, `verified_at` i `confirmed` (bool: potwierdzony / niepotwierdzony). Schemat tabeli: [baza punktów](kontrakty-tresci.md#baza-punktów).
- Status „potwierdzony” mają tylko punkty z danych instytucji publicznych.
- Gdy punkt jest starszy niż ustalony próg, aplikacja pokazuje ostrzeżenie o wieku danych.
