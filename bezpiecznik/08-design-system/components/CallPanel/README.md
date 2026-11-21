# CallPanel

Wezwanie pomocy (`EmergencyContactPanel` ze specyfikacji): w czacie (szablon `call`, `inline`) i po dotknięciu SOS (Panel 2, `sheet`). **Dwa przyciski, nic więcej** — w zagrożeniu człowiek nie czyta, tylko szuka, gdzie kliknąć.

1. **Zadzwoń 112** — `sos`, 80 px, pełna szerokość, podpis „Pogotowie, straż, policja” (112 łączy ze wszystkimi; osobne 999 / 998 / 997 tylko mnożyły wybory). Telefon sam przekazuje lokalizację dyspozytorowi (AML), więc współrzędne na ekranie są zbędne.
2. **Powiadom bliskich** — obrysowany, 80 px, podpis z odbiorcami: „SMS z lokalizacją do: Mama, Tomek”. Otwiera systemowe okno SMS z gotową treścią (pozycja i link do mapy są w SMS-ie, nie na ekranie). Bez kontaktów: „Najpierw dodaj kontakty” → profil. Telefon bez SMS → przycisku nie ma.

Usunięte 21.11 (za dużo informacji): współrzędne, adres, dokładność GPS, numery 999 / 998 / 997, notki, sygnał ratunkowy (zostaje jako osobny szablon `signal` w czacie).

W czacie `CallPanel` dodaje aplikacja jako pierwszy szablon, gdy sytuacja może zagrażać życiu. Nie przy zwykłym „nie wiem” — wtedy `NoSource`.
