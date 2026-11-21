# Button

Przyciski w stylu ChatGPT: tekstowe zawsze jako pigułka (`radius-full`), przycisk z samą ikoną zawsze jako koło.

## Warianty

| Wariant | Wygląd | Kiedy |
| --- | --- | --- |
| `primary` | jasne tło `action`, ciemny tekst `on-action` | **Jedna** główna akcja na ekran: wyślij, „Prowadź do schronu”, „Pokaż plan”. |
| `secondary` (domyślny) | przezroczysty, ramka `line-150`, hover `overlay-hover` | Akcje równorzędne: „Udostępnij”, „Zapisz offline”, sugestie pytań. |
| `ghost` | bez tła i ramki, tekst `ink-200` → `ink-100` na hover | Ikony w composerze i pasku (dodaj, mikrofon, więcej), akcje pod odpowiedzią. |
| `sos` | tło `sos`, biały tekst | **Wyłącznie** „Zadzwoń 112”. Nigdy „Usuń” ani błędy. |

## Rozmiary

- `sm` 32 px — gęste miejsca: akcje pod wiadomością, chipy.
- `md` 36 px — domyślny, jak w ChatGPT (composer, nagłówek).
- `lg` 44 px — akcje kryzysowe na telefonie, przyciski w panelu dolnym mapy.

Na ekranach dotykowych każdy przycisk ma niewidoczne pole trafienia powiększone o 4 px z każdej strony.

## Ikony

Podajesz je przez `icon` / `iconRight` (np. Lucide, obrys 1.75–2, 20 px; w `sm` 16 px). Bez etykiety przycisk staje się kołem i **musi** mieć `aria-label` (komponent ostrzega w konsoli).

## Stany

- **Hover:** primary → `action-press`; secondary/ghost → półprzezroczysta nakładka `overlay-hover` (działa na każdym tle); sos → nakładka na kolorze.
- **Focus (klawiatura):** obrys 2 px `signal` z odstępem 2 px.
- **Disabled:** krycie 38% — np. strzałka „wyślij”, gdy pole jest puste (jak w ChatGPT).
- **Loading:** spinner w miejscu ikony, przycisk zablokowany, `aria-busy`.

## Konsument dostarcza

React 18, `tokens.css`, `bundle.css`, ikony (komponent ich nie zawiera).

```jsx
<Button variant="primary" icon={<ArrowUp />} aria-label="Wyślij" />
<Button icon={<Share />}>Udostępnij</Button>
<Button variant="sos" size="lg" icon={<Phone />} fullWidth>Zadzwoń 112</Button>
```
