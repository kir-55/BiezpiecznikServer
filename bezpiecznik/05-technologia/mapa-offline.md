# Mapa offline od strony technicznej

## Kafelki

- Kafelki wektorowe z OpenStreetMap, w plikach MBTiles (PMTiles z lokalnego pliku nie jest potwierdzone na iOS), wyświetlane przez `maplibre_gl` (zapasowo `flutter_map` + `vector_map_tiles`). Pliki generuje Planetiler z wycinków OSM z Geofabrik.
- **Polska uproszczona:** niskie poziomy przybliżenia, główne drogi i ulice, miejscowości.
- **Województwo szczegółowe:** wszystkie poziomy przybliżenia, ulice, budynki, adresy.
- MVP: jeden styl ciemny. Po MVP drugi (jasny) i ciemny kryzysowy.

## Graf tras

- Budowany z danych OSM przed wydaniem paczki, osobno dla pieszych i samochodów.
- Zapisany w płaskich tablicach (węzły, krawędzie, wagi), podzielony na kafelki, żeby wczytywać tylko okolicę.
- Algorytm A* w Dart, liczony w promieniu kilku do kilkunastu kilometrów.
- Cel wydajności: wyznaczenie trasy piechotą do schronu poniżej 200 ms na docelowym telefonie (do zmierzenia).

## Punkty

- Jedna tabela SQLite `points`: `lat`, `lon`, `kind`, `name`, `address`, `availability`, `open_24h`, `source`, `verified_at`, `confirmed`. Schemat: [baza punktów](../04-dane/kontrakty-tresci.md#baza-punktów).
- Indeks przestrzenny R*Tree do szybkiego wyszukiwania najbliższych punktów.

## Adresy

- Lista adresów województwa z OSM lub PRG.
- Wyszukiwanie najbliższego adresu do współrzędnych na potrzeby panelu alarmowego.

## Lokalizacja

- GPS bez sieci; pierwszy odczyt może trwać dłużej niż przy włączonym internecie.
- Lokalizacja tylko w czasie używania aplikacji. Wykrywanie dużej zmiany położenia w tle wymaga osobnej zgody (P2).
