# ChatDrawer

Panel 1, wysuwany z lewej (85% szerokości, maks. 360 px) nad przyciemnionym czatem (`scrim`). SOS zostaje widoczny nad panelem.

- Na górze sam **znak** B+ (`Logo`, 36 px, bez nazwy), pod nim **Nowy czat** — wiersz z ikoną kartki z ołówkiem, jak w ChatGPT.
- Jak panel boczny ChatGPT: **bez ramek i cieni**, wiersze 44 px, tekst 15 px o zwykłej grubości, zaokrąglenie 10 px, hover `overlay-hover`, bieżący czat tylko tłem `overlay-press`. Sekcje Dziś / Wczoraj / data drobnym szarym tekstem. **Bez godzin** — tytuł w jednej linii z „…”.
- Przytrzymanie wiersza → `Dialog` „Usunąć czat?”.
- Na dole **Ustawienia** — wiersz 52 px, nad notką o prywatności i nad bezpieczną strefą paska gestów, żeby łatwo w nie trafić.
