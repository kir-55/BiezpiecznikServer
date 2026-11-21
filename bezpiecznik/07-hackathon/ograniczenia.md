# Ograniczenia hackathonu

## Ramy

- Czas: 20 h do prezentacji przed jury, w tym ok. 6 h developmentu MVP z agentami ([zakres MVP](zakres-mvp.md)).
- Większość kodu pisze Claude, więc zakres może być szeroki, ale demo ma priorytet nad kompletnością.
- Platforma: Flutter (Dart), zob. [architektura](../05-technologia/architektura.md). Docelowo Android i iOS z jednego kodu, demo na Androidzie.
- Wszystko działa na urządzeniu. Sieć jest potrzebna tylko do pobrania paczek (model, baza wiedzy, mapy).
- Region demo: województwo zachodniopomorskie (mapa szczegółowa, punkty, trasy). Reszta Polski: mapa uproszczona (po MVP).
- Hackathon odbywa się w Szczecinie: demo korzysta z prawdziwego GPS. Symulowana pozycja tylko jako zapas (GPS w budynku i w trybie samolotowym bywa wolny).
- Telefon demo: co najmniej 6–8 GB RAM, żeby lokalny model działał płynnie.

## Dane na demo

- Nie ma potwierdzenia, że baza PSP („Gdzie się ukryć”) jest dostępna jako otwarte dane (zob. [dane map](../04-dane/dane-mapy.md)).
- Na demo: punkty z OpenStreetMap, oznaczone jako „niepotwierdzone”, oraz ręcznie sprawdzone punkty ze Szczecina, każdy z datą weryfikacji.
- W produkcie: współpraca z PSP lub Ministerstwem Cyfryzacji.
- Na demo wystarczy lokalizacja przy otwartej aplikacji. Lokalizacja w tle wymaga uzasadnienia w sklepach.

## Co zostaje dla budującego

- Dokładny próg pewności wyszukiwania i reguły walidatora (dobrać na zestawie testowym).
- Wybór konkretnego modelu po teście po polsku.
- Projekt wizualny: spokojny, czytelny, „służbowy”, bez estetyki gry i bez wojskowego kiczu.
- Format grafu tras i sposób jego budowy z OSM.
